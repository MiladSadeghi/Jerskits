import { useEffect } from 'react'
import { Control } from 'react-hook-form'
import LocationDropdown from './LocationDropdown.tsx'
import { useLazyGetLocationQuery } from '../../services/locationApi.ts'
import { TEditProfileSchema } from '../../shared/types/Profile.types.ts'

type Props = {
  handleLocation: setState<Option>
  selectedValue?: Option
  dropdownDisable: boolean
  control: Control<TEditProfileSchema>
  selectedCountry?: Option
  selectedState?: Option
  selectedCity?: Option
  name: 'country' | 'state' | 'city'
  optionLocation: string
}

const LocationProvider = ({
  handleLocation,
  dropdownDisable,
  control,
  selectedValue,
  selectedCountry,
  selectedState,
  name,
  optionLocation
}: Props) => {
  const [trigger, result] = useLazyGetLocationQuery()

  useEffect(() => {
    if (name === 'country') trigger('/location')
    if (name === 'state' && selectedCountry) {
      trigger(`/location/${selectedCountry.value}`)
    }
    if (name === 'city' && selectedCountry && selectedState) {
      trigger(`/location/${selectedCountry.value}/${selectedState.value}`)
    }
  }, [selectedCountry, selectedCountry, selectedState])

  return (
    <LocationDropdown
      name={name}
      isDisabled={dropdownDisable}
      options={result.data ? result.data[name] : undefined}
      control={control}
      selectedLocation={selectedValue}
      optionLocation={optionLocation}
      handleLocation={handleLocation}
    />
  )
}
export default LocationProvider
