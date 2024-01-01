type Props = { strokeColor: string }

const BillingIcon = ({ strokeColor }: Props) => {
  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.66675 8.27517V6C2.66675 5.44771 3.11446 5 3.66675 5H21.6667C22.219 5 22.6667 5.44772 22.6667 6V8.27517M2.66675 8.27517H22.6667M2.66675 8.27517V11M22.6667 8.27517V11M22.6667 11V18C22.6667 18.5523 22.219 19 21.6667 19H3.66675C3.11446 19 2.66675 18.5523 2.66675 18V11M22.6667 11H2.66675'
        stroke={strokeColor}
        strokeWidth='1.2'
      />
    </svg>
  )
}

export default BillingIcon
