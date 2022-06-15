import React, { useEffect} from 'react'
import { useCounter } from "../hooks/useCounter"
import { useCounter as useGlobalCounter } from "../providers/counter"
import { useAuth } from '../providers/auth'


const Profile = () => {

  const {counter, increment, decrement} = useCounter("Profile")
  const {value, increment: goUp, decrement: goDown} = useGlobalCounter()
  const {token} = useAuth()


  return (
    <div>Profile
      <p>{token ? "Logged in" : "Anonymus"}</p>
        <p>Value Profile Local: {counter}</p>
        <button onClick={()=> increment()}>+</button>
        <button onClick={()=> decrement()}>-</button>

        <p>Value Global: {value}</p>
        <button onClick={()=>goUp()}>+</button>
        <button onClick={()=> goDown()}>-</button>
    </div>
  )
}

export default Profile