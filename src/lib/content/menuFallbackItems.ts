import type { MenuListItem } from './types';

/**
 * Offline fallback for the dish lists. The real dishes are Menu items in Sanity (Menu → Items) placed in a
 * category; these are only used when Sanity is unreachable or a category has no items.
 */

/** Items per category slug. */
export const MENU_FALLBACK_ITEMS: Record<string, MenuListItem[]> = {
  salads: [
    {
      title: 'Aloha Passion',
      description:
        'Mixed greens, mango, apples, red grapes, cranberries, blue cheese, candied walnuts, and passion orange vinaigrette.',
    },
    {
      title: 'Ono Island Ahi',
      description:
        'Mixed greens, never-frozen local ahi, mango, avocado, coconut, strawberries, green onions, bean sprouts, and passion orange vinaigrette.',
    },
    {
      title: 'Kamuela Cobb',
      description: 'Mixed greens, avocado, grape tomatoes, egg, bacon, blue cheese, chicken, and herb ranch.',
    },
    {
      title: 'Big Island Beet',
      description:
        'Mixed greens, roasted beets, mangoes, craisins, candied walnuts, goat cheese, balsamic glaze, and passion orange vinaigrette.',
      note: 'Not available at Kaneohe',
    },
    {
      title: 'Aloha Caesar',
      description: 'Romaine, parmesan, croutons, Caesar dressing, and your choice of protein.',
    },
    {
      title: 'Mandarin Ginger',
      description:
        'Mixed greens, mandarin oranges, carrots, cilantro, green onions, wontons, almonds, chicken, and Asian ginger dressing.',
    },
    {
      title: 'Aloha Mediterranean',
      description:
        'Romaine, grape tomatoes, kalamata olives, feta, bell peppers, red onion, cucumbers, garbanzo beans, dill, and Mediterranean dressing.',
    },
    {
      title: 'The Paniolo',
      description:
        'Romaine, grape tomatoes, avocado, jicama, corn, black beans, green onions, cheddar cheese, cilantro, and BBQ ranch.',
    },
    {
      title: 'Maui Mozzarella',
      description:
        'Mixed greens, tomatoes, fresh mozzarella, red onions, basil, balsamic vinaigrette, and balsamic glaze.',
    },
    {
      title: 'Design Your Own Salad',
      description:
        'Includes your choice of lettuce, four regular toppings, one cheese, and one dressing (additional charge for extra items).',
    },
    {
      title: 'Poke Bowl',
      badge: 'Coming soon',
    },
    {
      title: 'Poke Salad',
      description:
        'Romaine, carrots, cucumbers, avocado, wonton strips, green onion, crispy onion, spicy ahi, and unagi sauce.',
      badge: 'Coming soon',
    },
  ],
  'wraps-subs': [
    {
      title: 'Grilled Steak Wrap',
      description:
        'Grilled steak, mushrooms, red onion, provolone, romaine, sundried tomatoes, and goddess dressing, served on warmed pita.',
    },
    {
      title: 'Aloha Gyro Wrap',
      description:
        'Thinly sliced Mediterranean seasoned lamb and beef with grilled onions, feta cheese, dill, mixed greens, and our famous goddess dressing, served on warmed pita.',
    },
    {
      title: 'Curried Chicken Wrap',
      description:
        'Curried chicken, mango chutney, carrots, cranberries, grapes, coconut, and romaine, served on warmed pita.',
    },
    {
      title: 'Tutus Chicken Salad Wrap',
      description:
        'Chicken breast, romaine, red onions, red grapes, envy apples, celery, and mayo, served on a spinach tortilla wrap.',
    },
    {
      title: 'Fresh Island Ahi Wrap',
      description:
        'Never-frozen local ahi, grape tomatoes, red onion, mixed greens, capers, and champagne dressing, served on warmed pita.',
    },
    {
      title: 'Hummus Pita Wrap',
      description:
        'Hummus, feta, kalamata olives, cucumbers, sundried tomatoes, red and green bell peppers, red onions, dill, grape tomatoes, romaine, and Mediterranean dressing, served on warmed pita.',
    },
    {
      title: 'Poke Wrap',
      description: 'Bean sprouts, avocado, cucumber, crispy onion, spicy ahi, and unagi sauce, served on warmed pita.',
      badge: 'Coming soon',
    },
    {
      title: 'Club Sub',
      description: 'Turkey, bacon, avocado, lettuce, tomato, and mayo on your choice of bread.',
    },
    {
      title: 'Chicken Pesto Sandwich',
      description: 'Grilled chicken, pesto, basil, mixed greens, tomatoes, and mayo on your choice of bread.',
    },
    {
      title: 'Caprese Sub',
      description: 'Fresh mozzarella, tomatoes, basil, red onion, mixed greens, and balsamic vinaigrette.',
    },
    {
      title: 'Grilled Cheese Soup Combo',
      description: 'Havarti, cheddar, and fresh mozzarella on sourdough bread, served with a 6oz tomato bisque.',
    },
    {
      title: 'Pastrami Melt',
      description: 'Grilled pastrami, provolone cheese, and spicy slaw on grilled sourdough.',
    },
  ],
  soups: [
    {
      title: 'Tomato Bisque',
      description: 'Our signature thick and creamy soup.',
    },
    {
      title: 'Extra Pita',
      description: 'A warm side option perfect for dipping.',
    },
  ],
  drinks: [
    {
      title: 'Big Island Mamaki Mint Tea',
      description:
        'We serve chilled mamaki mint tea brewed fresh in-store. We source our mamaki from a company in Hilo on the Big Island to provide this traditional Hawaiian herbal beverage.',
    },
    {
      title: 'Kona Cold Brew Coffee',
      description: 'Kona coffee and condensed milk.',
    },
    {
      title: 'Guava Lemonade',
      description: 'A sweet and tart island favorite.',
    },
    {
      title: 'Fountain Drink',
      description: 'A selection of carbonated beverages.',
    },
    {
      title: 'Bottle Water',
      description: 'Chilled still water.',
    },
  ],
  vegetarian: [
    {
      title: 'Aloha Passion',
      description:
        'Mixed greens, mango, apples, red grapes, cranberries, blue cheese, candied walnuts, and passion orange vinaigrette.',
    },
    {
      title: 'Aloha Mediterranean',
      description:
        'Romaine, grape tomatoes, kalamata olives, feta, bell peppers, red onion, cucumbers, garbanzo beans, dill, and Mediterranean dressing.',
    },
    {
      title: 'The Paniolo',
      description:
        'Romaine, grape tomatoes, avocado, jicama, corn, black beans, green onions, cheddar cheese, cilantro, and BBQ ranch.',
    },
    {
      title: 'Maui Mozzarella',
      description:
        'Mixed greens, tomatoes, fresh mozzarella, red onions, basil, balsamic vinaigrette, and balsamic glaze.',
    },
    {
      title: 'Hummus Pita Wrap',
      description:
        'Hummus, feta, kalamata olives, cucumbers, sundried tomatoes, red and green bell peppers, red onions, dill, grape tomatoes, romaine, and Mediterranean dressing, served on warmed pita.',
    },
    {
      title: 'Caprese Sub',
      description: 'Fresh mozzarella, tomatoes, basil, red onion, mixed greens, and balsamic vinaigrette.',
    },
    {
      title: 'Vegan Aloha Mediterranean',
      description:
        'Grape tomatoes, cucumbers, red and green bell peppers, red onions, kalamata olives, dill, garbanzo beans, romaine, and champagne dressing.',
    },
    {
      title: 'Vegan Mandarin Ginger',
      description:
        'Mandarin oranges, carrots, green onions, cilantro, wonton strips, roasted almonds, mixed greens, grilled tofu, and Asian ginger dressing.',
    },
    {
      title: 'Vegan Hummus Pita Wrap',
      description:
        'Hummus, kalamata olives, cucumbers, sundried tomatoes, red and green bell peppers, red onions, dill, grape tomatoes, and romaine, served on warmed pita.',
    },
    {
      title: 'Sides',
      description: 'A warm pita, dessert and chips as sides.',
    },
    {
      title: 'Design Your Own Salad',
      description: 'Build a custom vegetarian bowl with your choice of greens, cheeses, and meatless toppings.',
    },
  ],
  vegan: [
    {
      title: 'Vegan Aloha Mediterranean',
      description:
        'Grape tomatoes, cucumbers, red & green bell peppers, red onions, olives, dill, garbanzo beans, romaine, and champagne dressing.',
    },
    {
      title: 'Vegan Mandarin Ginger',
      description:
        'Mandarin oranges, carrots, green onions, cilantro, wonton strips, roasted almonds, mixed greens, grilled tofu, and Asian ginger dressing.',
    },
    {
      title: 'Vegan Hummus Pita Wrap',
      description:
        'Hummus, kalamata olives, cucumbers, sundried tomatoes, red and green bell peppers, red onions, dill, grape tomatoes, and romaine, served on warmed pita.',
    },
    {
      title: 'Design Your Own Salad',
      description: 'Build a custom vegan bowl with your choice of greens and plant-based toppings.',
    },
  ],
  kids: [
    {
      title: 'Keiki Combo',
      description: 'Pita sandwich, fruit, keiki drink, and an organic lollipop.',
    },
  ],
  misc: [
    {
      title: 'Avocado Toast',
      description: 'Toasted sourdough, avocado, tomatoes, basil, balsamic glaze, sea salt, and black pepper.',
    },
    {
      title: 'Dessert Toast',
      description:
        'Toasted sourdough, your choice of Nutella or peanut butter, strawberry, banana, blueberry, and honey.',
    },
    {
      title: 'Acai Bowl',
      description: 'Acai, granola, strawberry, banana, blueberry, and honey.',
    },
    {
      title: 'Cookies',
      description: 'Our cookies, a sweet treat to pair with any meal.',
    },
  ],
};

/** Full-menu categories for the Menu page. */
export const MENU_FALLBACK_CATEGORIES: Array<{
  title: string;
  href: string;
  description: string;
  items: MenuListItem[];
}> = [
  {
    title: 'Signature Salads',
    href: '/menu/salads',
    description: 'Fresh bowls built with crisp greens, local ahi, and house-made dressings.',
    items: [
      {
        title: 'Aloha Passion',
        description:
          'Mixed greens, mango, apples, red grapes, cranberries, blue cheese, candied walnuts, and passion orange vinaigrette.',
      },
      {
        title: 'Ono Island Ahi',
        description:
          'Mixed greens, never-frozen local ahi, mango, avocado, coconut, strawberries, green onions, bean sprouts, and passion orange vinaigrette.',
      },
      {
        title: 'Kamuela Cobb',
        description: 'Mixed greens, avocado, grape tomatoes, egg, bacon, blue cheese, chicken, and herb ranch.',
      },
      {
        title: 'Big Island Beet',
        description:
          'Mixed greens, roasted beets, mangoes, craisins, candied walnuts, goat cheese, balsamic glaze, and passion orange vinaigrette.',
        note: 'Not available at Kaneohe',
      },
      {
        title: 'Aloha Caesar',
        description: 'Romaine, parmesan, croutons, Caesar dressing, and your choice of protein.',
      },
      {
        title: 'Mandarin Ginger',
        description:
          'Mixed greens, mandarin oranges, carrots, cilantro, green onions, wontons, almonds, chicken, and Asian ginger dressing.',
      },
      {
        title: 'Aloha Mediterranean',
        description:
          'Romaine, grape tomatoes, kalamata olives, feta, bell peppers, red onion, cucumbers, garbanzo beans, dill, and Mediterranean dressing.',
      },
      {
        title: 'The Paniolo',
        description:
          'Romaine, grape tomatoes, avocado, jicama, corn, black beans, green onions, cheddar cheese, cilantro, and BBQ ranch.',
      },
      {
        title: 'Maui Mozzarella',
        description:
          'Mixed greens, tomatoes, fresh mozzarella, red onions, basil, balsamic vinaigrette, and balsamic glaze.',
      },
      {
        title: 'Design Your Own Salad',
        description:
          'Includes your choice of lettuce, four regular toppings, one cheese, and one dressing. Extra items may carry an additional charge.',
      },
      {
        title: 'Poke Bowl',
        badge: 'Coming soon',
      },
      {
        title: 'Poke Salad',
        description:
          'Romaine, carrots, cucumbers, avocado, wonton strips, green onion, crispy onion, spicy ahi, and unagi sauce.',
        badge: 'Coming soon',
      },
    ],
  },
  {
    title: 'Wraps & Subs',
    href: '/menu/wraps-subs',
    description: 'Hearty wraps and sandwiches made with the same fresh components as our bowls.',
    items: [
      {
        title: 'Grilled Steak Wrap',
        description:
          'Grilled steak, mushrooms, red onion, provolone, romaine, sundried tomatoes, and goddess dressing, served on warmed pita.',
      },
      {
        title: 'Aloha Gyro Wrap',
        description:
          'Thinly sliced Mediterranean seasoned lamb and beef with grilled onions, feta cheese, dill, mixed greens, and our famous goddess dressing, served on warmed pita.',
      },
      {
        title: 'Curried Chicken Wrap',
        description:
          'Curried chicken, mango chutney, carrots, cranberries, grapes, coconut, and romaine, served on warmed pita.',
      },
      {
        title: 'Tutus Chicken Salad Wrap',
        description:
          'Chicken breast, romaine, red onions, red grapes, envy apples, celery, and mayo, served on a spinach tortilla wrap.',
      },
      {
        title: 'Fresh Island Ahi Wrap',
        description:
          'Never-frozen local ahi, grape tomatoes, red onion, mixed greens, capers, and champagne dressing, served on warmed pita.',
      },
      {
        title: 'Hummus Pita Wrap',
        description:
          'Hummus, feta, kalamata olives, cucumbers, sundried tomatoes, red and green bell peppers, red onions, dill, grape tomatoes, romaine, and Mediterranean dressing, served on warmed pita.',
      },
      {
        title: 'Poke Wrap',
        description:
          'Bean sprouts, avocado, cucumber, crispy onion, spicy ahi, and unagi sauce, served on warmed pita.',
        badge: 'Coming soon',
      },
      {
        title: 'Club Sub',
        description: 'Turkey, bacon, avocado, lettuce, tomato, and mayo on your choice of bread.',
      },
      {
        title: 'Chicken Pesto Sandwich',
        description: 'Grilled chicken, pesto, basil, mixed greens, tomatoes, and mayo on your choice of bread.',
      },
      {
        title: 'Caprese Sub',
        description: 'Fresh mozzarella, tomatoes, basil, red onion, mixed greens, and balsamic vinaigrette.',
      },
      {
        title: 'Grilled Cheese Soup Combo',
        description: 'Havarti, cheddar, and fresh mozzarella on sourdough bread, served with a 6oz tomato bisque.',
      },
      {
        title: 'Pastrami Melt',
        description: 'Grilled pastrami, provolone cheese, and spicy slaw on grilled sourdough.',
      },
    ],
  },
  {
    title: 'Misc',
    href: '/menu/misc',
    description: 'Additional favorites and cafe-style selections.',
    items: [
      {
        title: 'Avocado Toast',
        description: 'Toasted sourdough, avocado, tomatoes, basil, balsamic glaze, sea salt, and black pepper.',
      },
      {
        title: 'Dessert Toast',
        description:
          'Toasted sourdough, your choice of Nutella or peanut butter, strawberry, banana, blueberry, and honey.',
      },
      {
        title: 'Acai Bowl',
        description: 'Acai, granola, strawberry, banana, blueberry, and honey.',
      },
      {
        title: 'Cookies',
        description: 'Our cookies, a sweet treat to pair with any meal.',
      },
    ],
  },
  {
    title: 'Soups',
    href: '/menu/soups',
    description: 'Warm sides and pairings for salads, wraps, and subs.',
    items: [
      {
        title: 'Tomato Bisque',
        description: 'Our signature thick and creamy soup.',
      },
      {
        title: 'Extra Pita',
        description: 'A warm side option perfect for dipping.',
      },
    ],
  },
  {
    title: 'Keiki / Kids',
    href: '/menu/kids',
    description: 'A smaller meal option for keiki, built with the same quality standards.',
    items: [
      {
        title: 'Keiki Combo',
        description: 'Pita sandwich, fruit, keiki drink, and an organic lollipop.',
      },
    ],
  },
  {
    title: 'Vegan Options',
    href: '/menu/vegan',
    description: 'Dedicated plant-based bowls, wraps, and custom salad options.',
    items: [
      {
        title: 'Vegan Aloha Mediterranean',
        description:
          'Grape tomatoes, cucumbers, red and green bell peppers, red onions, olives, dill, garbanzo beans, romaine, and champagne dressing.',
      },
      {
        title: 'Vegan Mandarin Ginger',
        description:
          'Mandarin oranges, carrots, green onions, cilantro, wonton strips, roasted almonds, mixed greens, grilled tofu, and Asian ginger dressing.',
      },
      {
        title: 'Vegan Hummus Pita Wrap',
        description:
          'Hummus, kalamata olives, cucumbers, sundried tomatoes, red and green bell peppers, red onions, dill, grape tomatoes, and romaine, served on warmed pita.',
      },
      {
        title: 'Design Your Own Salad',
        description: 'Build a custom vegan bowl with your choice of greens and plant-based toppings.',
      },
    ],
  },
  {
    title: 'Vegetarian Options',
    href: '/menu/vegetarian',
    description: 'Meatless salads, wraps, subs, and custom bowl choices.',
    items: [
      {
        title: 'Aloha Passion',
        description:
          'Mixed greens, mango, apples, red grapes, cranberries, blue cheese, candied walnuts, and passion orange vinaigrette.',
      },
      {
        title: 'Aloha Mediterranean',
        description:
          'Romaine, grape tomatoes, kalamata olives, feta, bell peppers, red onion, cucumbers, garbanzo beans, dill, and Mediterranean dressing.',
      },
      {
        title: 'The Paniolo',
        description:
          'Romaine, grape tomatoes, avocado, jicama, corn, black beans, green onions, cheddar cheese, cilantro, and BBQ ranch.',
      },
      {
        title: 'Maui Mozzarella',
        description:
          'Mixed greens, tomatoes, fresh mozzarella, red onions, basil, balsamic vinaigrette, and balsamic glaze.',
      },
      {
        title: 'Hummus Pita Wrap',
        description:
          'Hummus, feta, kalamata olives, cucumbers, sundried tomatoes, red and green bell peppers, red onions, dill, grape tomatoes, romaine, and Mediterranean dressing, served on warmed pita.',
      },
      {
        title: 'Caprese Sub',
        description: 'Fresh mozzarella, tomatoes, basil, red onion, mixed greens, and balsamic vinaigrette.',
      },
      {
        title: 'Vegan Aloha Mediterranean',
        description:
          'Grape tomatoes, cucumbers, red and green bell peppers, red onions, kalamata olives, dill, garbanzo beans, romaine, and champagne dressing.',
      },
      {
        title: 'Vegan Mandarin Ginger',
        description:
          'Mandarin oranges, carrots, green onions, cilantro, wonton strips, roasted almonds, mixed greens, grilled tofu, and Asian ginger dressing.',
      },
      {
        title: 'Vegan Hummus Pita Wrap',
        description:
          'Hummus, kalamata olives, cucumbers, sundried tomatoes, red and green bell peppers, red onions, dill, grape tomatoes, and romaine, served on warmed pita.',
      },
      {
        title: 'Sides',
        description: 'A warm pita, dessert and chips as sides.',
      },
      {
        title: 'Design Your Own Salad',
        description: 'Build a custom vegetarian bowl with your choice of greens, cheeses, and meatless toppings.',
      },
    ],
  },
  {
    title: 'Drinks',
    href: '/menu/drinks',
    description: 'Chilled beverages, including our Big Island mamaki mint tea.',
    items: [
      {
        title: 'Big Island Mamaki Mint Tea',
        description: 'Chilled mamaki mint tea brewed fresh in-store using mamaki sourced from Hilo on the Big Island.',
      },
      {
        title: 'Kona Cold Brew Coffee',
        description: 'Kona coffee and condensed milk.',
      },
      {
        title: 'Guava Lemonade',
        description: 'A sweet and tart island favorite.',
      },
      {
        title: 'Fountain Drink',
        description: 'A selection of carbonated beverages.',
      },
      {
        title: 'Bottle Water',
        description: 'Chilled still water.',
      },
    ],
  },
];
