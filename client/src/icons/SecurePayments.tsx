type Props = {
  color?: string
}

const SecurePayments = ({ color = 'white' }: Props) => {
  return (
    <svg
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.33334 4.76675H40.6667C40.8876 4.76675 41.0667 4.94583 41.0667 5.16675V32.8574C41.0667 32.9779 41.0124 33.0919 40.9189 33.1679L25.2522 45.8971C25.1053 46.0165 24.8947 46.0165 24.7478 45.8971L9.08111 33.1679C8.98762 33.0919 8.93334 32.9779 8.93334 32.8574V5.16675C8.93334 4.94583 9.11243 4.76675 9.33334 4.76675Z'
        stroke={color}
        strokeWidth='1.2'
      />
      <path
        d='M16.6667 20.8334L22.9167 27.0834L34.375 16.6667'
        stroke={color}
        strokeWidth='1.2'
      />
    </svg>
  )
}

export default SecurePayments
