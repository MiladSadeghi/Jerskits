type Props = {
  strokeColor: string
}

const Delivery = ({ strokeColor }: Props) => {
  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M22.3333 3L2.33325 11L8.33325 12.7647L22.3333 3ZM22.3333 3L13.3333 22L11.5685 16L22.3333 3Z'
        stroke={strokeColor}
        strokeWidth='1.2'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Delivery
