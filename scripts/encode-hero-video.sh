#!/usr/bin/env bash
#
# Encode the homepage hero loop from the client's source video.
#
#   SRC="/path/to/Aloha Salads rev 6 1080p.mp4" scripts/encode-hero-video.sh
#
# Output (default ./site-videos/hero — kept OUT of git, upload with `npm run import:homepage-video`):
#   hero.mp4         1440x760  ~0.9 MB   desktop / tablet
#   hero-mobile.mp4  480x600   ~0.3 MB   phones (centre crop)
#   hero-poster.webp 1440x760  ~20 KB    first frame of the loop (this is the LCP element)
#
# Requires ffmpeg (>= 6) with libx264 + libwebp.  Override the binary with FFMPEG=/path/to/ffmpeg.
#
# What it does
#   1. Takes START..START+LEN of the source (default 12.14s -> 20.10s: food close-ups, no text
#      cards, no hard cuts) and stretches it slightly so that, after a 0.5s end->start crossfade,
#      the loop is exactly 8.00s and seamless.
#   2. Desktop: the footage has the "aloha SALADS" logo burnt into the middle of the frame. To keep
#      it off the left-aligned hero copy and keep it small, the sharp picture is shown at SCALE of its
#      1080p size, bottom-anchored and pushed right so the logo centre lands at LOGO_CX (px, in a
#      1440px canvas). The strip that opens up on the left/top is a lightly blurred copy of the same
#      footage (BG_SIGMA), feathered into the sharp picture. The blurred copy is the frame at ~0.86x,
#      left-aligned, so ITS logo sits behind the opaque sharp picture and never ghosts through.
#      Don't push BG_SIGMA below ~20: the fill then reads as a duplicated dish.
#   3. Mobile: plain centre crop (4:5) at 480px wide.
#
# Tuning knobs (env vars): SCALE (0.52 -> logo ~200px wide), LOGO_CX (1008 = 70% of 1440),
# BG_SIGMA (26), CRF (28 desktop / 30 mobile), START, LEN.
set -euo pipefail

FFMPEG="${FFMPEG:-ffmpeg}"
SRC="${SRC:?Set SRC to the source video path}"
OUT="${OUT:-$(cd "$(dirname "$0")/.." && pwd)/site-videos/hero}"
START="${START:-12.14}"
LEN="${LEN:-7.96}"
SCALE="${SCALE:-0.52}"
LOGO_CX="${LOGO_CX:-1008}"
BG_SIGMA="${BG_SIGMA:-26}"
CRF="${CRF:-28}"
MOBILE_CRF="${MOBILE_CRF:-30}"
FEATHER_X="${FEATHER_X:-170}"
FEATHER_Y="${FEATHER_Y:-110}"

# LEN * FACTOR = 8.5s  ->  minus the 0.5s crossfade = 8.00s loop
FACTOR="$(python3 -c "print(8.5/$LEN)")"
FGW="$(python3 -c "print(int(round(1920*$SCALE/2))*2)")"
FGH="$(python3 -c "print(int(round(1080*$SCALE/2))*2)")"
SHIFT="$(python3 -c "print(int(round($LOGO_CX - 960*$FGW/1920)))")"
TOP=$((760 - FGH))
BG_W=1652
BG_H=930

mkdir -p "$OUT"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT
FF=("$FFMPEG" -hide_banner -loglevel error -y)

echo "desktop: sharp picture ${FGW}x${FGH}, shift x=${SHIFT}, top y=${TOP}, stretch x${FACTOR}"

# --- loopify: 8.5s composed clip -> exactly 8.00s seamless loop (0.5s tail->head crossfade) ---
loopify() { # $1 in  $2 out
  "${FF[@]}" -i "$1" -an -filter_complex "
    [0:v]split=3[a][b][c];
    [a]trim=start=0.5:end=8.0,setpts=PTS-STARTPTS[main];
    [b]trim=start=8.0:end=8.5,setpts=PTS-STARTPTS[tail];
    [c]trim=start=0:end=0.5,setpts=PTS-STARTPTS[head];
    [tail][head]xfade=transition=fade:duration=0.5:offset=0[blend];
    [main][blend]concat=n=2:v=1:a=0,format=yuv420p[v]
  " -map "[v]" -c:v libx264 -crf 10 -preset fast -r 24 "$2"
}

# --- desktop ---
"${FF[@]}" -ss "$START" -t "$LEN" -i "$SRC" -an -filter_complex "
  [0:v]setpts=${FACTOR}*(PTS-STARTPTS),fps=24,split=2[fgsrc][bgsrc];
  [bgsrc]scale=${BG_W}:${BG_H},crop=1440:760:0:$((BG_H - 760)),gblur=sigma=${BG_SIGMA},eq=brightness=-0.02[bg];
  [fgsrc]scale=${FGW}:${FGH}:flags=lanczos,format=yuva420p,geq=lum='lum(X,Y)':cb='cb(X,Y)':cr='cr(X,Y)':a='255*pow(clip(X/${FEATHER_X},0,1),2)*(3-2*clip(X/${FEATHER_X},0,1))*pow(clip(Y/${FEATHER_Y},0,1),2)*(3-2*clip(Y/${FEATHER_Y},0,1))'[fg];
  [bg][fg]overlay=x=${SHIFT}:y=${TOP}:format=auto,format=yuv420p[v]
" -map "[v]" -c:v libx264 -crf 10 -preset fast -r 24 "$WORK/desktop_compose.mp4"
loopify "$WORK/desktop_compose.mp4" "$WORK/desktop_master.mp4"

"${FF[@]}" -i "$WORK/desktop_master.mp4" -an -c:v libx264 -profile:v main -level 4.0 -pix_fmt yuv420p \
  -crf "$CRF" -preset veryslow -maxrate 1800k -bufsize 3600k -g 48 -movflags +faststart "$OUT/hero.mp4"

"${FF[@]}" -i "$OUT/hero.mp4" -frames:v 1 -c:v libwebp -quality 82 "$OUT/hero-poster.webp"

# --- mobile ---
"${FF[@]}" -ss "$START" -t "$LEN" -i "$SRC" -an -vf \
  "setpts=${FACTOR}*(PTS-STARTPTS),fps=24,crop=ih*0.8:ih,scale=480:-2:flags=lanczos" \
  -c:v libx264 -crf 10 -preset fast -r 24 "$WORK/mobile_compose.mp4"
loopify "$WORK/mobile_compose.mp4" "$WORK/mobile_master.mp4"

"${FF[@]}" -i "$WORK/mobile_master.mp4" -an -c:v libx264 -profile:v main -level 3.1 -pix_fmt yuv420p \
  -crf "$MOBILE_CRF" -preset veryslow -maxrate 700k -bufsize 1400k -g 48 -movflags +faststart "$OUT/hero-mobile.mp4"

echo "Done -> $OUT"
ls -la "$OUT"
