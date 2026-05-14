const WATCHLIST_KEY = "safeFlightWatchlist";

export const getWatchlist = () => {
  try {
    return JSON.parse(localStorage.getItem(WATCHLIST_KEY)) || [];
  } catch (error) {
    return [];
  }
};

export const saveToWatchlist = (country) => {
  const watchlist = getWatchlist();
  const exists = watchlist.some((item) => item._id === country._id);
  if (!exists) {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...watchlist, country]));
  }
};

export const removeFromWatchlist = (countryCode) => {
  const nextWatchlist = getWatchlist().filter((item) => item._id !== countryCode);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(nextWatchlist));
  return nextWatchlist;
};

export const clearWatchlist = () => {
  localStorage.removeItem(WATCHLIST_KEY);
};
