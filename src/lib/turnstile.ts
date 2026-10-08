/** Minimal Cloudflare Turnstile loader shared by form widgets. */
export type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  getResponse: (id: string) => string;
};

type TurnstileWindow = Window & { turnstile?: TurnstileApi };

export function loadTurnstile(): Promise<TurnstileApi> {
  const existing = (window as TurnstileWindow).turnstile;
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve, reject) => {
    const ready = () => {
      const api = (window as TurnstileWindow).turnstile;
      if (api) resolve(api);
      else reject(new Error('Turnstile failed to load'));
    };
    const fail = () => reject(new Error('Turnstile failed to load'));

    const script = document.querySelector<HTMLScriptElement>('script[data-turnstile-api]');
    if (script) {
      script.addEventListener('load', ready, { once: true });
      script.addEventListener('error', fail, { once: true });
      return;
    }

    const next = document.createElement('script');
    next.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    next.async = true;
    next.dataset.turnstileApi = 'true';
    next.addEventListener('load', ready, { once: true });
    next.addEventListener('error', fail, { once: true });
    document.head.appendChild(next);
  });
}
