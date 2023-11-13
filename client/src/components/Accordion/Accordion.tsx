import { TDetailProduct } from '../../shared/types/Product.types'
import tw from 'twin.macro'
import { useRef, ReactNode } from 'react'
import { ArrowDown } from '../../icons'

type Props = {
  detailProduct?: TDetailProduct
  active: boolean
  handleActive: () => void
  content?: ReactNode
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
  return (
    <div>
      <AccordionWrapper>
        <div
          onClick={() => handleActive()}
          className='flex items-center justify-between py-5'
        >
          <AccordionTitle>{title ?? detailProduct?.title}</AccordionTitle>
          <ArrowDown
            className={`transition-all ${active ? 'rotate-180' : ''}`}
          />
        </div>
        <div
          ref={contentEl}
          className='flex flex-col overflow-hidden transition-all ease-in-out gap-y-5'
          css={{
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
                <AccordionDescription>
                  {detailProduct.description}
                </AccordionDescription>
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
      </AccordionWrapper>
      <div className='border-b border-neutral-grey-grey h-0.5' />
    </div>
  )
}

const AccordionWrapper = tw.div`flex flex-col`
const AccordionTitle = tw.h1`text-lg font-bold leading-7 text-primary-black select-none`
const AccordionDescription = tw.p`text-primary-black text-base leading-6`

export default Accordion
