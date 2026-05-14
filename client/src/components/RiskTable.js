import React from "react";
import { getCountryFlagUrl, getRiskClass } from "./countryUtils";

const CountryFlag = ({ code, countryName }) => {
  const [failed, setFailed] = React.useState(false);
  const flagUrl = getCountryFlagUrl(code);

  if (!flagUrl || failed) {
    return <span className="flag-fallback">{code || "NA"}</span>;
  }

  return (
    <img
      alt={`${countryName} flag`}
      className="country-flag"
      loading="lazy"
      onError={() => setFailed(true)}
      src={flagUrl}
    />
  );
};

const RiskTable = ({ countries, actionLabel, onAction, showOverride = false, emptyMessage }) => {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>{actionLabel}</th>
            <th>Flag</th>
            <th>Country</th>
            <th>Risk level</th>
            {showOverride && <th>Manual status</th>}
          </tr>
        </thead>
        <tbody>
          {countries.length > 0 ? (
            countries.map((item) => (
              <tr key={item._id}>
                <td className="action-cell">
                  <input
                    aria-label={`${actionLabel} ${item.country_name}`}
                    className="table-checkbox"
                    type="checkbox"
                    value={JSON.stringify(item)}
                    onChange={(event) => onAction(event, item)}
                  />
                </td>
                <td className="flag-cell" title={item._id}>
                  <CountryFlag code={item._id} countryName={item.country_name} />
                </td>
                <td>{item.country_name}</td>
                <td>
                  <span className={`risk-badge risk-${getRiskClass(item.country_status)}`}>
                    {item.country_status}
                  </span>
                </td>
                {showOverride && <td>{item.isStatusOveridden ? "Yes" : "No"}</td>}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={showOverride ? "5" : "4"}>{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiskTable;
