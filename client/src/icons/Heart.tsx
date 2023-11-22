type Props = {
  width?: number
  height?: number
  fill?: boolean
}

const Heart = ({ width = 20, height = 20, fill }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill={fill ? '#262D33' : 'none'}
    >
      <path
        d='M5.83335 3.33398C3.53217 3.33398 1.66669 5.19946 1.66669 7.50065C1.66669 8.43866 1.72959 9.57786 2.79728 10.8235C3.86496 12.0691 10 17.501 10 17.501C10 17.501 16.1351 12.0691 17.2028 10.8235C18.2705 9.57786 18.3334 8.43866 18.3334 7.50065C18.3334 5.19946 16.4679 3.33398 14.1667 3.33398C11.8655 3.33398 10 5.19946 10 7.50065C10 5.19946 8.13454 3.33398 5.83335 3.33398Z'
        stroke='#262D33'
        strokeWidth='1.2'
      />
    </svg>
  )
}

export default Heart
