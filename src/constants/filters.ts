export const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export type FilterType = keyof typeof FILTERS;
