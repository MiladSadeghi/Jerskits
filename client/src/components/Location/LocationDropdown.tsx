import { useEffect } from 'react'
import { SingleValue } from 'react-select'
import { Control, Controller } from 'react-hook-form'
import ReactSelect from 'react-select'
import { Option, TeditProfileSchema } from '../../shared/types/Profile.types'

interface Props {
  options: Option[] | undefined
  name: 'country' | 'state' | 'city'
  isDisabled: boolean
  control: Control<TeditProfileSchema>
  state: [Option | null, (value: Option | null) => void]
}

const LocationDropdown = ({
  options,
  isDisabled,
  name,
  control,
  state
}: Props) => {
  const [stateValue, setStateValue] = state

  useEffect(() => {
    if (options) {
      const validValue = options.find(
        ({ value }) => value === stateValue?.value
      )
      if (!validValue) {
        setStateValue(null)
      }
    }
  }, [options])

  return (
    <Controller
      name={`shippingAddress.${name}`}
      control={control}
      render={({ field }) => {
        const updateValue = (selectedOption: SingleValue<Option>) => {
          if (selectedOption) {
            setStateValue(selectedOption)
            field.onChange(selectedOption.value)
          }
        }
        return (
          <ReactSelect
            {...field}
            name={`shippingAddress.${name}`}
            options={options}
            isSearchable={true}
            onChange={updateValue}
            value={stateValue}
            isDisabled={isDisabled}
            inputId={`${name}-input`}
            styles={{
              input: (base) => {
                return {
                  ...base,
                  '& input:focus': {
                    boxShadow: 'none !important',
                    outline: 'none !important',
                    border: 'none !important'
                  }
                }
              }
            }}
            classNames={{
              control: (state) =>
                `!rounded-none h-full !border-neutral-soft-grey  ${
                  state.isFocused
                    ? '!shadow-[0_0_0_1px] !shadow-primary-black'
                    : '!shadow-none'
                }`,
              container: () => 'h-12',
              indicatorSeparator: () => 'hidden',
              option: (state) =>
                `${state.isSelected && '!bg-black !text-white'} ${
                  state.isFocused &&
                  !state.isSelected &&
                  '!bg-neutral-grey !text-white'
                }`
            }}
          />
        )
      }}
    />
  )
}
export default LocationDropdown
