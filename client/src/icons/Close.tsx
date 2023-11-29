type Props = { width?: number; height?: number }

const Close = ({ width = 30, height = 30 }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={`0 0 30 30`}
      fill='none'
    >
      <path
        d='M22.0711 7.92969L15 15.0008M15 15.0008L7.92896 22.0718M15 15.0008L22.0711 22.0718M15 15.0008L7.92896 7.92969'
        stroke='#262D33'
        strokeWidth='1.2'
      />
    </svg>
  )
}

export default Close
