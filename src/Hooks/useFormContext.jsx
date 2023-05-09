import { useContext } from 'react'
import FormContext from '../context/FromContext'

const useFormContext = () => {
  return (
    useContext(FormContext)
  )
}

export default useFormContext