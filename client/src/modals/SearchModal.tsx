import { Dispatch, SetStateAction, forwardRef, useState } from 'react'
import { Close, MagnifySearch } from '../icons'
import { useLazySearchProductsQuery } from '../services'
import { SpinnerDiamond } from 'spinners-react'
import { ProductCardContainer } from '../components'

type Props = {
  isSearchModal: [boolean, Dispatch<SetStateAction<boolean>>]
}

const formatSuggest = (searchInput: string, suggest: string) => {
  const formattedResponse = suggest.replace(
    new RegExp(searchInput, 'gi'),
    (matchedText) => `<span class="text-primary-black">${matchedText}</span>`
  )
  return formattedResponse
}

const SearchModal = forwardRef<HTMLDialogElement, Props>(
  ({ isSearchModal }, ref) => {
    const [searchModal, setSearchModal] = isSearchModal
    const [searchInputValue, setSearchInputValue] = useState<string>('')
    const [search, { isFetching, data, isSuccess }] =
      useLazySearchProductsQuery()

    const handleSearch = () => {
      search(searchInputValue)
    }

    return (
      <dialog
        open={true}
        ref={ref}
        className={`z-[800] w-full absolute bg-white transition-all ease-in-out duration-300 ${
          searchModal ? 'top-0 duration-300' : '-top-[200%] duration-500'
        }`}
      >
        <nav className='container mx-auto'>
          <div className='grid items-center justify-between w-full grid-cols-2 py-5 md:grid-cols-3'>
            <img
              className='order-1'
              src={'/images/jerskits-black.jpg'}
              alt='Jerskits.'
            />
            <div className='relative flex items-center order-3 col-span-2 md:order-2 mt-7 md:mt-0 md:col-span-1'>
              <input
                className='w-full h-12 px-5 py-4 border focus:border-primary-black border-neutral-soft-grey focus:ring-0'
                placeholder='Search name product, or etc'
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
              <button
                type='button'
                className='absolute right-5'
                aria-label='search'
                disabled={searchInputValue.length === 0}
                onClick={() => handleSearch()}
              >
                <MagnifySearch width={24} height={24} />
              </button>
            </div>
            <div className='flex justify-end order-2 md:order-3'>
              <button
                onClick={() => setSearchModal(false)}
                aria-label='close search modal'
              >
                <Close width={20} height={20} />
              </button>
            </div>
          </div>
        </nav>
        <div className='py-8 '>
          {isFetching ? (
            <div className='flex justify-center'>
              <SpinnerDiamond
                size={50}
                thickness={100}
                speed={100}
                color='#262D33'
                secondaryColor='rgba(0, 0, 0, 0.44)'
              />
            </div>
          ) : !isSuccess || data?.products.length === 0 ? (
            <div className='container mx-auto'>
              <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='md:col-start-2 space-y-7'>
                  <h5 className='text-primary-black text-2xl leading-[36px] font-bold'>
                    Popular Search
                  </h5>
                  {['Liverpool', 'Nike', 'Adidas'].map((item, idx) => (
                    <button
                      key={idx}
                      className='block text-lg font-bold leading-7 text-primary-black'
                      onClick={() => setSearchInputValue(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className='container mx-auto overflow-y-auto'>
              <div className='grid grid-cols-1 xl:grid-cols-4 gap-x-5'>
                <div className='mb-7 xl:mb-0'>
                  <h1 className='text-primary-black text-2xl leading-[36px] font-bold mb-6'>
                    Best Suggestion
                  </h1>
                  <div className='flex flex-col items-start justify-start space-y-6'>
                    {data?.suggestions.map((item, idx) => (
                      <button
                        key={idx}
                        className='text-lg font-bold leading-7 text-start text-neutral-soft-grey'
                        onClick={() => setSearchInputValue(item)}
                        dangerouslySetInnerHTML={{
                          __html: formatSuggest(searchInputValue, item)
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className='relative col-span-3'>
                  <div className='flex w-full overflow-x-auto gap-x-11'>
                    <ProductCardContainer products={data?.products} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </dialog>
    )
  }
)

export default SearchModal
