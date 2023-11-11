type setState<T> = Dispatch<SetStateAction<T>>

type Option = {
  label: string
  value: string
}

interface IFeature {
  background: string
  icon: ReactElement
  title: string
  description: string
}
