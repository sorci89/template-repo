import React from 'react'
import NumberPresenter from './NumberPresenter'
import { useCounter } from '../providers/counter'

const NumberModifier = () => {

    const {counter, increment, decrement} = useCounter();
    
  return (
    <div>NumberModifier
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <NumberPresenter value={counter}/>
    </div>
  )
}

export default NumberModifier