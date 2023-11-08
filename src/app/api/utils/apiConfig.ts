export const BASE_URL = process.env["NEXT_PUBLIC_API_BASE_URL"] || "localhost:8050";

export const ENDPOINTS = {
  // AUTH ENDPOINTS...
  LOGIN: `${BASE_URL}/auth/login`,
  USER_DATA: `${BASE_URL}/auth/user_data`,
  ENABLED_SERVICES: `${BASE_URL}/auth/enabled_services`,
  REFRESH: `${BASE_URL}/auth/refresh`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  // MASTER DATA ENDPOINTS...
  ITEM_MASTER_FILTERS: `${BASE_URL}/master_data/item_master_filters`,
  ITEM_MASTER_HIERARCHICAL_FILTERS: `${BASE_URL}/master_data/item_master_h_filters`,
  // ... add other endpoints as needed
};
