type Props = {
  width?: number
  height?: number
}

const Bag = ({ width = 20, height = 20 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8M16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11M4 8H20V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V8Z'
        stroke='black'
        strokeWidth='1.2'
      />
    </svg>
  )
}

export default Bag
