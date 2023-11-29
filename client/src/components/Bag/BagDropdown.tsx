import ReactSelect, { SingleValue } from 'react-select'

type Props = {
  optionValues: string[]
  label: string
  value: Option
  handleChange: (newValue: SingleValue<Option>, productId: string) => void
  disabled: boolean
  productId: string
  updatingProductId: string | undefined
}

const transformOptions = (values: string[], label: string): Option[] => {
  const option = values.map((value) => ({
    label: `${label} : ${value}`,
    value
  }))
  return option
}

const BagDropdown = ({
  optionValues,
  label,
  value,
  handleChange,
  disabled,
  productId,
  updatingProductId
}: Props) => {
  const option = transformOptions(optionValues, label)

  return (
    <ReactSelect
      name={label}
      options={option}
      isSearchable={false}
      onChange={(e) => handleChange(e, productId)}
      defaultValue={value}
      isDisabled={disabled && updatingProductId === productId}
      className='w-full'
      menuPlacement='auto'
      menuPosition='fixed'
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
          `!rounded-none h-full !border-neutral-soft-grey ${
            state.isFocused
              ? '!shadow-[0_0_0_1px] !shadow-primary-black'
              : '!shadow-none'
          }`,
        container: () => 'h-12',
        indicatorSeparator: () => 'hidden',
        option: (state) =>
          ` ${state.isSelected && '!bg-black !text-white'} ${
            state.isFocused &&
            !state.isSelected &&
            '!bg-neutral-grey !text-white'
          }`,
        menu: () => 'bg-white z-[999]'
      }}
    />
  )
}

export default BagDropdown
