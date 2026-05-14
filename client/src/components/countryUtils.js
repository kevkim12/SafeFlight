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

export const getCountryFlagUrl = (countryCode = "") => {
  const code = countryCode.toLowerCase().replace(/[^a-z]/g, "");
  return code.length === 2 ? `https://flagcdn.com/w40/${code}.png` : "";
};
