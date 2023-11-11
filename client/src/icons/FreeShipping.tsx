type Props = { color?: string }

const FreeShipping = ({ color = 'white' }: Props) => {
  return (
    <svg
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M33.3333 16.6666C33.3333 12.0642 29.6024 8.33325 25 8.33325C20.3976 8.33325 16.6667 12.0642 16.6667 16.6666M33.3333 22.9166C33.3333 27.519 29.6024 31.2499 25 31.2499C20.3976 31.2499 16.6667 27.519 16.6667 22.9166M8.33334 16.6666H41.6667V39.5833C41.6667 41.8844 39.8012 43.7499 37.5 43.7499H12.5C10.1988 43.7499 8.33334 41.8844 8.33334 39.5833V16.6666Z'
        stroke={color}
        strokeWidth='1.2'
      />
    </svg>
  )
}

export default FreeShipping
