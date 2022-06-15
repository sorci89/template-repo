import { useState, useEffect } from "react"

const useCounter = (componentName) => {
    const [counter, setCounter] = useState(0)

    const decrement = ()=> {
        setCounter(counter - 1)
    }
    const increment = ()=> {
        setCounter(counter + 1)
    }

    useEffect(() => {
        localStorage.setItem("counter" + componentName, counter)
      }, [counter])
    
      useEffect(() => {
        const localCounter = parseInt(localStorage.getItem("counter" + componentName))
        setCounter(localCounter || 0)
      }, [])
      
    return {counter, increment, decrement}
 }

 export  {useCounter}