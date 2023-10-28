import Select from 'react-select'
import { TSort } from '../../../shared/types/Product.types'

type Props = {
  onSortChange: (sortValue?: TSort) => void
}

type TOption = {
  label: string
  value: TSort
}

const sortOptions: TOption[] = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'New Arrivals', value: 'new arrivals' },
  { label: 'Price Low to High', value: 'price:low' },
  { label: 'Price High to Low', value: 'price:high' }
]

const SortDropdown = ({ onSortChange }: Props) => {
  return (
    <Select
      options={sortOptions}
      defaultValue={sortOptions[0]}
      onChange={(selectedOption) => onSortChange(selectedOption?.value)}
      isSearchable={false}
      classNames={{
        control: () =>
          `!rounded-none h-full !border-none !shadow-none font-italic w-48 !justify-end`,
        indicatorSeparator: () => 'hidden',
        option: (state) =>
          `${state.isSelected && '!bg-black !text-white'} ${
            state.isFocused &&
            !state.isSelected &&
            '!bg-neutral-grey !text-white'
          }`,
        valueContainer: () => `!flex-none`,
        singleValue: () => `italic font-bold !text-neutral-dark-grey`
      }}
    />
  )
}

export default SortDropdown