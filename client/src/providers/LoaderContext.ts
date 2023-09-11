import { createContext } from 'react'
import { LoaderContextType } from '../shared/types/Loader.types'

const LoaderContext = createContext<LoaderContextType | undefined>(undefined)

export default LoaderContext
