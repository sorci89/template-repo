import React from 'react'
import { useCounter } from '../providers/counter'

const NumberPresenter = () => {

    const {value} = useCounter();
    
  return (
    <div>NumberPresenter

    <p>{value}</p>
    </div>
  )
}

export default NumberPresenter