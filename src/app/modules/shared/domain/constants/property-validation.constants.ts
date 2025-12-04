export const PROPERTY_RULES = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  ADDRESS: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 200,
  },
  CITY: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  STATE: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  COUNTRY: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  BEDROOMS: {
    MAX: 100,
  },
  BATHROOMS: {
    MAX: 100,
  },
  BUILD_YEAR: {
    MIN: 1800,
    MAX: new Date().getFullYear(),
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
  },
  HIGHLIGHTED_FEATURES: {
    MAX_ITEMS: 15,
    MAX_LENGTH: 200,
  },
  IMAGES: {
    MAX_ITEMS: 20,
  },
  VIEWS_380_URL: {
    MAX_ITEMS: 10,
  },
} as const;
