type Props = {
  strokeColor: string
  className?: string
}

const Checkmark = ({ strokeColor, className }: Props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M4 12L9.5 17.5L20 7' stroke={strokeColor} strokeWidth='1.2' />
    </svg>
  )
}

export default Checkmark
