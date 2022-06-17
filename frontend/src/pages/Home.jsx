import { useState } from 'react'
import { useCounter } from "../hooks/useCounter"
import { useCounter as useGlobalCounter } from "../providers/counter"
import { useAuth } from '../providers/auth'

const Home = () => {

  const {counter, increment, decrement} = useCounter("Home")
  const {value, increment: goUp, decrement: goDown} = useGlobalCounter()
  const {auth, token} = useAuth()


  return (
    <div>Home
       <p>{token ? "Logged in" : "Anonymus"}</p>
        <p>Value Home Local: {counter}</p>
        <button onClick={()=> increment()}>+</button>
        <button onClick={()=> decrement()}>-</button>

        <p>Value Global: {value}</p>
        <button onClick={()=> goUp()}>+</button>
        <button onClick={()=> goDown()}>-</button>

        {token ? "Welcome" : (<button onClick={auth}>Login with Google</button>)}
    </div>
  )
}

export default Home