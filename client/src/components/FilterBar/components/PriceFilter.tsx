import { Range, getTrackBackground } from 'react-range'
import { Price } from '../../../shared/types/Product.types'

type Props = {
  price?: Price
  setPrice?: setState<Price>
  highestPrice?: number
}

const PriceFilter = ({ price, setPrice, highestPrice }: Props) => {
  return highestPrice ? (
    <div>
      <div className='w-full mb-[70px]'>
        <Range
          step={0.01}
          min={0}
          max={highestPrice}
          values={[price?.minPrice ?? 0, price?.maxPrice ?? highestPrice]}
          onChange={(values) =>
            setPrice({ minPrice: values[0], maxPrice: values[1] })
          }
          renderTrack={({ props: innerProps, children }) => (
            <div
              onMouseDown={innerProps.onMouseDown}
              onTouchStart={innerProps.onTouchStart}
              className='relative z-10 flex w-full'
            >
              <div
                ref={innerProps.ref}
                className={`h-1 w-full rounded-sm bg-center z-10`}
                style={{
                  background: getTrackBackground({
                    values: [
                      price?.minPrice ?? 0,
                      price?.maxPrice ?? highestPrice
                    ],
                    colors: ['#F3F3F3', '#262D33', '#F3F3F3'],
                    min: 0,
                    max: highestPrice
                  })
                }}
              >
                {children}
                {(price?.minPrice ?? 0) >= 16 ? (
                  <h5 className='left-0 absolute font-bold text-base leading-[18px] text-neutral-grey -bottom-[31.9px]'>
                    $0
                  </h5>
                ) : (
                  <h5 className='left-0 text-primary-black absolute font-bold text-base leading-[18px]  -bottom-[31.9px]'>
                    {`$${price?.minPrice ?? 0}`}
                  </h5>
                )}
                {price?.maxPrice && price.maxPrice <= highestPrice - 30 ? (
                  <h5 className='right-0 absolute font-bold text-base leading-[18px] text-neutral-grey -bottom-[31.9px]'>{`$${
                    highestPrice ?? 0
                  }`}</h5>
                ) : (
                  <h5 className='right-0 text-primary-black absolute font-bold text-base leading-[18px] -bottom-[31.9px]'>
                    {`$${price?.maxPrice ?? highestPrice}`}
                  </h5>
                )}
              </div>
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              className='relative z-10 flex justify-center rounded-sm outline-none'
              {...props}
            >
              <div className='relative'>
                <div className='w-6 h-6 rounded-full bg-primary-black' />
                <div className='absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2' />
              </div>
              {((index === 0 && price?.minPrice && price?.minPrice >= 16) ||
                (index === 1 &&
                  price?.maxPrice &&
                  price?.maxPrice <= highestPrice - 30)) && (
                <h5 className='absolute self-center text-base font-bold top-6 text-primary-black'>
                  {`$${
                    [
                      price?.minPrice ?? 0,
                      price?.maxPrice ?? highestPrice ?? 0
                    ][index]
                  }`}
                </h5>
              )}
            </div>
          )}
        />
      </div>
      <div className='flex gap-x-5'>
        <div>
          <label
            className='text-sm font-medium leading-5 text-primary-black'
            htmlFor='lowest_price_input'
          >
            Lowest
          </label>
          <input
            className='w-full px-5 py-4 border outline-none border-neutral-soft-grey focus:border-primary-black focus:ring-0'
            step={0.01}
            min={0}
            type='number'
            id='lowest_price_input'
            placeholder='Lowest price'
            value={price?.minPrice ?? 0}
            onChange={(e) =>
              setPrice((prevPrices: Price) => {
                return { ...prevPrices, minPrice: e.target.value }
              })
            }
          />
        </div>
        <div>
          <label
            className='text-sm font-medium leading-5 text-primary-black'
            htmlFor='highest_price_input'
          >
            Highest
          </label>
          <input
            className='w-full px-5 py-4 border outline-none border-neutral-soft-grey focus:border-primary-black focus:ring-0'
            type='number'
            step={0.01}
            max={highestPrice}
            id='highest_price_input'
            placeholder='Highest'
            value={price?.maxPrice ?? highestPrice}
            onChange={(e) =>
              setPrice((prevPrices: Price) => {
                return { ...prevPrices, maxPrice: e.target.value }
              })
            }
          />
        </div>
      </div>
    </div>
  ) : null
}

export default PriceFilter
