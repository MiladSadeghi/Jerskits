type Props = {
  color?: string
}

const BestQualityMaterial = ({ color = 'white' }: Props) => {
  return (
    <svg
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_355_1716)'>
        <path
          d='M31.6291 40.0365C26.409 45.2566 18.2159 45.692 12.4999 41.3426C11.9798 40.9468 11.4802 40.5115 11.0052 40.0365C10.5302 39.5615 10.0948 39.0618 9.69899 38.5417C5.34967 32.8256 5.78507 24.6327 11.0052 19.4125C16.7003 13.7174 38.9948 12.0468 38.9948 12.0468C38.9948 12.0468 37.3243 34.3413 31.6291 40.0365Z'
          stroke={color}
          strokeWidth='1.2'
        />
        <path
          d='M9.69897 38.5417C10.0948 39.0618 10.5302 39.5615 11.0052 40.0365C11.4802 40.5115 11.9798 40.9469 12.4999 41.3426C15.6248 35.4167 21.8748 28.125 30.2081 19.7917C19.3748 25.9876 13.5417 33.3333 9.69897 38.5417Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_355_1716'>
          <rect width='50' height='50' fill={color} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default BestQualityMaterial
