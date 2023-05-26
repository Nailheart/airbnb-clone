import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
  flag: country.flag,
  label: country.name.common,
  value: country.cca2,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  return { getAll, getByValue };
};

export { useCountries };
