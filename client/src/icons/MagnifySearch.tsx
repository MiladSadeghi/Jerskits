type Props = {
  width?: number
  height?: number
}

const MagnifySearch = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M16 16L19 19' stroke='black' strokeWidth='1.2' />
      <circle cx='11.5' cy='11.5' r='5.9' stroke='black' strokeWidth='1.2' />
    </svg>
  )
}

export default MagnifySearch
