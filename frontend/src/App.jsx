import './App.css';
import NumberPresenter from './components/NumberPresenter';
import NumberModifier from './components/NumberModifier';
import { useCounter} from './components/CounterProvider';

function App() {

  const {value, increment, decrement} = useCounter()

  return (
     <div className="App">
     <p>Change the value</p>
     <p>Value: {value}</p>
     <button onClick={decrement}>-</button>
     <button onClick={increment}>+</button>

     <NumberPresenter />
     <NumberModifier />
    </div>

  );
}

export default App;
