import { Option } from "../../pages/Profile/components/Edit/Edit.types.ts";
import { useLazyGetLocationQuery } from "../../App/feature/location/locationSliceApi.ts";
import { useEffect } from "react";
import { Control } from "react-hook-form";
import LocationDropdown from "./LocationDropdown.tsx";
import { TeditProfileSchema } from "../../pages/Profile/components/Edit/Edit.schema.ts";

type Props = {
	onSelect: (value: Option | null) => void;
	selectedValue: Option | null;
	dropdownDisable: boolean;
	control: Control<TeditProfileSchema>;
	selectedCountry?: Option | null;
	selectedState?: Option | null;
	selectedCity?: Option | null;
	name: "country" | "state" | "city";
};

const LocationProvider = ({
	onSelect,
	dropdownDisable,
	control,
	selectedValue,
	selectedCountry,
	selectedState,
	name,
}: Props) => {
	const [trigger, result] = useLazyGetLocationQuery();

	useEffect(() => {
		if (name === "country") trigger("/location");
		if (name === "state" && selectedCountry) {
			trigger(`/location/${selectedCountry.value}`);
		}
		if (name === "city" && selectedCountry && selectedState) {
			trigger(`/location/${selectedCountry.value}/${selectedState.value}`);
		}
	}, [selectedCountry, selectedCountry, selectedState]);

	return (
		<LocationDropdown
			name={name}
			isDisabled={dropdownDisable}
			options={result.data ? result.data[name] : undefined}
			control={control}
			state={[selectedValue, onSelect]}
		/>
	);
};
export default LocationProvider;
