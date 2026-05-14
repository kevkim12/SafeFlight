export const RISK_STATUSES = ["Low Risk", "Medium Risk", "High Risk", "Extreme Warning", "Unknown"];

export const filterCountries = (countries, country, status) => {
  const countryQuery = country.trim().toLowerCase();

  return countries.filter((item) => {
    const nameMatches = !countryQuery || item.country_name?.toLowerCase().includes(countryQuery);
    const statusMatches = !status || item.country_status === status;
    return nameMatches && statusMatches;
  });
};

export const getRiskClass = (status = "Unknown") => {
  return status.toLowerCase().replace(/\s+/g, "-");
};

export const getCountryFlag = (countryCode = "") => {
  const code = countryCode.toUpperCase().replace(/[^A-Z]/g, "");
  if (code.length !== 2) {
    return countryCode;
  }

  return String.fromCodePoint(
    ...code.split("").map((letter) => 127397 + letter.charCodeAt(0))
  );
};
