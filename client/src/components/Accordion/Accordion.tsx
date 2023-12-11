import { TDetailProduct } from '../../shared/types/Product.types'
import { useRef } from 'react'
import { ArrowDown } from '../../icons'

type Props = {
  detailProduct?: TDetailProduct
  active: boolean
  handleActive: () => void
  content?: JSX.Element
  title?: string
  key?: string | number
}

const Accordion = ({
  detailProduct,
  active,
  handleActive,
  content,
  title
}: Props) => {
  const contentEl = useRef<HTMLDivElement>(null)
  const accordionTitle = title ?? detailProduct?.title
  return (
    <div>
      <div className='flex flex-col'>
        <div
          onClick={() => handleActive()}
          className='flex items-center justify-between py-5'
        >
          <h1 className='text-lg font-bold leading-7 select-none text-primary-black'>
            {accordionTitle}
          </h1>
          <ArrowDown
            className={`transition-all ${active ? 'rotate-180' : ''}`}
          />
        </div>
        <div
          ref={contentEl}
          className='flex flex-col overflow-hidden transition-all ease-in-out gap-y-5'
          style={{
            ...(active
              ? {
                  height: contentEl.current?.scrollHeight,
                  marginBottom: '30px'
                }
              : { height: 0 })
          }}
        >
          {content ? (
            content
          ) : (
            <>
              {detailProduct?.description && (
                <p className='text-base leading-6 text-primary-black'>
                  {detailProduct.description}
                </p>
              )}{' '}
              {detailProduct?.specification && (
                <ul className='list-disc list-inside'>
                  {detailProduct.specification.map((spec, idx) => (
                    <li
                      key={idx}
                      className='text-base leading-6 text-primary-black'
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
      <div className='border-b border-neutral-grey-grey h-0.5' />
    </div>
  )
}

export default Accordion
