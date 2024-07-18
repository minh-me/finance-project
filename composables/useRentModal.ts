import countries from "world-countries";
export const useRentModal = () => {
  const isOpen = useState("rentModal", () => false);
  const formattedCountries = useState("countries", () => {
    return countries.map(country => ({
      value: country.cca2,
      label: country.name.common,
      flag: country.flag,
      latlng: country.latlng,
      region: country.region,
    }));
  });

  const onOpen = () => {
    isOpen.value = true;
  };

  const onClose = () => {
    isOpen.value = false;
  };

  const getCountryByValue = (value: string) => {
    const res = formattedCountries.value.find(item => item.value === value);

    return res;
  };

  return {
    isOpen,
    onOpen,
    onClose,
    countries: formattedCountries,
    getCountryByValue,
  };
};
