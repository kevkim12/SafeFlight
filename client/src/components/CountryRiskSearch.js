import React from "react";
import axios from "axios";
import RiskTable from "./RiskTable";
import { isSignedIn } from "./auth";
import { RISK_STATUSES, filterCountries } from "./countryUtils";
import SAMPLE_COUNTRIES from "./sampleCountries";
import { saveToWatchlist } from "./watchlist";

const CountryRiskSearch = () => {
  const [countries, setCountries] = React.useState([]);
  const [country, setCountry] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [notice, setNotice] = React.useState("");

  const loadCountries = React.useCallback(async (refresh = false) => {
    setLoading(true);
    setError("");
    setNotice("");

    try {
      const response = refresh
        ? await axios.post("/countriesDB", { data: true })
        : await axios.get("/countriesDB");
      const apiCountries = response.data?.data || [];
      if (apiCountries.length > 0) {
        setCountries(apiCountries);
        setNotice(refresh ? "Destination risk data has been refreshed." : "");
      } else {
        setCountries(SAMPLE_COUNTRIES);
        setNotice("Live data is unavailable, so a working sample destination set is shown.");
      }
    } catch (requestError) {
      setCountries(SAMPLE_COUNTRIES);
      setNotice("Live data is unavailable, so a working sample destination set is shown.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  const filteredCountries = React.useMemo(
    () => filterCountries(countries, country, status),
    [countries, country, status]
  );

  const riskSummary = React.useMemo(() => {
    return RISK_STATUSES.map((riskStatus) => ({
      label: riskStatus,
      count: countries.filter((item) => item.country_status === riskStatus).length,
    }));
  }, [countries]);

  const handleFavouritePlace = async (event, item) => {
    if (!isSignedIn()) {
      event.target.checked = false;
      setError("Create an account or sign in to save destinations to your watchlist.");
      return;
    }

    if (event.target.checked) {
      saveToWatchlist(item);
      setNotice(`${item.country_name} added to your watchlist.`);
    }

    try {
      await axios.post("/addFavourites", {
        request_data: {
          data: JSON.stringify(item),
          isChecked: event.target.checked,
        },
      });
    } catch (requestError) {
      if (!event.target.checked) {
        setError("Could not sync that change with the server, but local search still works.");
      }
    }
  };

  return (
    <main className="content-page risk-search-page">
      <section className="page-hero data-hero">
        <p className="eyebrow">Risk Search</p>
        <h1>Find a destination risk profile.</h1>
        <p>Search countries, filter by advisory level, and add places to your travel watchlist.</p>
      </section>

      <section className="risk-summary-grid" aria-label="Risk level summary">
        {riskSummary.map((item) => (
          <button
            className={status === item.label ? "risk-summary-card active" : "risk-summary-card"}
            key={item.label}
            type="button"
            onClick={() => setStatus(status === item.label ? "" : item.label)}
          >
            <span>{item.label}</span>
            <strong>{item.count}</strong>
          </button>
        ))}
      </section>

      <section className="toolbar-panel search-panel">
        <div className="filter-bar">
          <label>
            <span>Country</span>
            <input
              type="search"
              placeholder="Search by country"
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
          <button type="button" className="button-secondary" onClick={() => loadCountries(true)}>
            Refresh data
          </button>
        </div>
        <div className="result-count">
          <strong>{filteredCountries.length}</strong>
          <span>{filteredCountries.length === 1 ? "destination" : "destinations"}</span>
        </div>
      </section>

      {error && <p className="status-message error-message">{error}</p>}
      {notice && <p className="status-message success-message">{notice}</p>}
      {loading ? (
        <section className="notice-panel">
          <p>Loading destination risk data...</p>
        </section>
      ) : (
        <RiskTable
          countries={filteredCountries}
          actionLabel="Watch"
          onAction={handleFavouritePlace}
          emptyMessage="No countries match the current filters."
        />
      )}
    </main>
  );
};

export default CountryRiskSearch;
