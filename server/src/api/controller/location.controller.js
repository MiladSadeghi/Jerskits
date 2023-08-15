import { Country, State, City } from "country-state-city";

const getCountries = (req, res) => {
  const allCountries = Country.getAllCountries().map((country) => {
    return { label: country.name, value: country.isoCode };
  });

  return res.status(200).json({ country: allCountries });
};

const getStates = (req, res, next) => {
  let states = State.getStatesOfCountry(req.params.countryCode);

  if (states.length === 0 || !states) {
    return res.status(200).json({ states: null });
  }

	states = states.map((state) => {return { label: state.name, value: state.isoCode }})

  return res.status(200).json({ error: false, state: states });
};

const getCity = (req, res) => {
	let cities = City.getCitiesOfState(req.params.countryCode, req.params.stateCode);

	if (cities.length === 0 || !cities) {
    return res.status(200).json({ cities: null });
  }

	cities = cities.map((state) => {return { label: state.name, value: state.name }})

  return res.status(200).json({ error: false, city: cities });
};

export { getCountries, getStates, getCity };
