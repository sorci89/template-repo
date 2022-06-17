import React, { useEffect} from 'react'
import { useAuth } from '../providers/auth'
import { useNavigate } from 'react-router-dom'

const Protected = ({children}) => {
  const {token} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
    navigate("/")
    }
  }, [token]);

  return (
    <React.Fragment>{children}</React.Fragment>
  )
}

export default Protected