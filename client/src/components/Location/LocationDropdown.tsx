import { useEffect } from 'react'
import { Control, Controller } from 'react-hook-form'
import { TEditProfileSchema } from '../../shared/types/Profile.types'
import { SearchDropdown } from '..'

interface Props {
  options?: Option[]
  name: 'country' | 'state' | 'city'
  isDisabled: boolean
  control: Control<TEditProfileSchema>
  selectedLocation?: Option
  optionLocation: string
  handleLocation: setState<Option>
}

const LocationDropdown = ({
  options,
  isDisabled,
  name,
  control,
  optionLocation,
  selectedLocation,
  handleLocation
}: Props) => {
  useEffect(() => {
    if (options) {
      const validValue = options.find(
        ({ value }) => value === selectedLocation?.value
      )
      if (!validValue) {
        handleLocation()
      }
    }
  }, [options])

  return (
    <Controller
      name={`shippingAddress.${name}`}
      control={control}
      render={({ field }) => {
        const updateValue = (selectedOption: Option) => {
          if (selectedOption) {
            handleLocation(selectedOption)
            field.onChange(selectedOption.value)
          }
        }
        return (
          <SearchDropdown
            optionsLocation={optionLocation}
            searchable={true}
            options={options}
            disabled={isDisabled}
            selectedLocation={selectedLocation}
            handleLocation={updateValue}
          />
        )
      }}
    />
  )
}
export default LocationDropdown
