import {
  favoritesIcon,
  tagsIcon,
  cookbookIcon,
  cuisineIcon,
  totalTimeIcon,
  difficultyIcon,
  ratingIcon,
} from './icons';

export const filterConfig = [
  {
    label: 'Diet',
    icon: favoritesIcon,
    category: 'diet',
    options: [
      'Vegetarian',
      'Vegan',
      'Gluten-Free',
      'Keto',
      'Paleo',
      'Low-Carb',
      'Lacto-Vegetarian',
      'Ovo-Vegetarian',
      'Primal',
      'Whole30',
      'Pescatarian',
      'Low-FODMAP',
    ],
  },
  {
    label: 'Intolerance',
    icon: tagsIcon,
    category: 'intolerance',
    options: [
      'Dairy-Free',
      'Egg-Free',
      'Gluten-Free',
      'Grain-Free',
      'Peanut-Free',
      'Seafood-Free',
      'Sesame-Free',
      'Shellfish-Free',
      'Soy-Free',
      'Sulfite-Free',
      'Tree Nut-Free',
      'Wheat-Free',
    ],
  },
  {
    label: 'Dish Type',
    icon: cookbookIcon,
    category: 'dishType',
    options: [
      'Main Course',
      'Side Dish',
      'Dessert',
      'Salad',
      'Appetizer',
      'Soup',
      'Breakfast',
    ],
  },
  {
    label: 'Cuisine',
    icon: cuisineIcon,
    category: 'cuisine',
    options: [
      'Italian',
      'Mexican',
      'Indian',
      'Chinese',
      'Japanese',
      'French',
      'Mediterranean',
      'American',
      'Spanish',
      'Greek',
      'Thai',
      'Middle Eastern',
    ],
  },
  {
    label: 'Time',
    icon: totalTimeIcon,
    category: 'time',
    options: [
      'Under 15 Minutes',
      'Under 30 Minutes',
      'Under 45 Minutes',
      '1 Hour',
      '1-2 Hours',
      '2+ Hours',
    ],
  },
  {
    label: 'Difficulty',
    icon: difficultyIcon,
    category: 'difficulty',
    options: ['Easy', 'Medium', 'Hard'],
  },
  {
    label: 'Rating',
    icon: ratingIcon,
    category: 'rating',
    options: ['4 Stars & Up', '3 Stars & Up', '2 Stars & Up', '1 Star & Up'],
  },
];
