import React from "react";
import axios from "axios";
import AuthNotice from "./AuthNotice";
import RiskTable from "./RiskTable";
import { isSignedIn } from "./auth";
import { RISK_STATUSES, filterCountries } from "./countryUtils";
import { clearWatchlist, getWatchlist, removeFromWatchlist } from "./watchlist";

const SavedPlaces = () => {
  const [savedCountries, setSavedCountries] = React.useState([]);
  const [country, setCountry] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [notice, setNotice] = React.useState("");

  const loadSavedCountries = React.useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("/favouritesDB");
      const apiSavedCountries = response.data?.data || [];
      setSavedCountries(apiSavedCountries.length > 0 ? apiSavedCountries : getWatchlist());
    } catch (requestError) {
      setSavedCountries(getWatchlist());
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (isSignedIn()) {
      loadSavedCountries();
    } else {
      setLoading(false);
    }
  }, [loadSavedCountries]);

  const filteredCountries = React.useMemo(
    () => filterCountries(savedCountries, country, status),
    [savedCountries, country, status]
  );

  const handleReset = async () => {
    try {
      await axios.post("/resetFavourites");
    } catch (requestError) {
      setError("Could not sync with the server, but your local watchlist was cleared.");
    }
    clearWatchlist();
    setSavedCountries([]);
    setNotice("Your watchlist has been cleared.");
  };

  const handleRemovePlace = async (event, item) => {
    const nextWatchlist = removeFromWatchlist(item._id);
    setSavedCountries(nextWatchlist);
    setNotice(`${item.country_name} was removed from your watchlist.`);

    try {
      await axios.post("/addFavourites", {
        request_data: {
          data: JSON.stringify(item),
          isChecked: false,
        },
      });
    } catch (requestError) {
      setError("Could not sync that change with the server, but your local watchlist was updated.");
    }
  };

  if (!isSignedIn()) {
    return (
      <AuthNotice
        title="Sign in to open your watchlist."
        message="Saved destinations are linked to your account so you can return to them later."
      />
    );
  }

  return (
    <main className="content-page">
      <section className="page-hero data-hero">
        <p className="eyebrow">Saved watchlist</p>
        <h1>Keep important destinations close while plans are changing.</h1>
        <p>Filter your saved countries and remove destinations that no longer need attention.</p>
      </section>

      <section className="toolbar-panel">
        <div className="filter-bar">
          <label>
            <span>Country</span>
            <input
              type="search"
              placeholder="Search watchlist"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
          </label>
          <label>
            <span>Risk level</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">All levels</option>
              {RISK_STATUSES.map((riskStatus) => (
                <option key={riskStatus} value={riskStatus}>{riskStatus}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="button-secondary"
            disabled={savedCountries.length === 0}
            onClick={handleReset}
          >
            Clear watchlist
          </button>
        </div>
        <div className="result-count">
          <strong>{filteredCountries.length}</strong>
          <span>{filteredCountries.length === 1 ? "saved destination" : "saved destinations"}</span>
        </div>
      </section>

      {error && <p className="status-message error-message">{error}</p>}
      {notice && <p className="status-message success-message">{notice}</p>}
      {loading ? (
        <section className="notice-panel">
          <p>Loading your watchlist...</p>
        </section>
      ) : (
        <RiskTable
          countries={filteredCountries}
          actionLabel="Remove"
          onAction={handleRemovePlace}
          showOverride
          emptyMessage="No saved countries match the current filters."
        />
      )}
    </main>
  );
};

export default SavedPlaces;
