import React from 'react'
import NumberPresenter from './NumberPresenter'
import { useCounter } from './CounterProvider'

const NumberModifier = () => {

    const {value, increment, decrement} = useCounter();
    
  return (
    <div>NumberModifier
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <NumberPresenter value={value}/>
    </div>
  )
}

export default NumberModifier