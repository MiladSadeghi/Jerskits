type Props = {
  strokeColor: string
}

const PaymentIcon = ({ strokeColor }: Props) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <circle
          id='Coin'
          cx='12'
          cy='12'
          r='10'
          stroke={strokeColor}
          strokeWidth='1.2'
        />
        <path
          id='Dollar'
          d='M15 9.55C15 8.1969 13.6569 7.1 12 7.1M12 7.1C10.3431 7.1 9 8.1969 9 9.55C9 10.9031 10.433 11.6344 12 12C13.5 12.35 15 13.0969 15 14.45C15 15.8031 13.6569 16.9 12 16.9M12 7.1V5M12 16.9C10.3431 16.9 9 15.8031 9 14.45M12 16.9V19'
          stroke={strokeColor}
          strokeWidth='1.2'
        />
      </g>
    </svg>
  )
}

export default PaymentIcon
