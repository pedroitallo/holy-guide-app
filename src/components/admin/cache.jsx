// Simple in-memory cache to avoid re-fetching data on admin tab switching.
// The data will be kept until the next full page reload.
export const adminCache = {
  analytics: {
    data: null,
    loaded: false,
  },
  users: {
    data: [],
    loaded: false,
  }
};