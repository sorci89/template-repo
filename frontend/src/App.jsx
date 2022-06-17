import './App.css';
// import NumberPresenter from './components/NumberPresenter';
// import NumberModifier from './components/NumberModifier';
// import { useCounter} from './providers/counter';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Callback from './components/Callback';
import Protected from './components/Protected';
import Register from './pages/Register';

function App() {

//  const {value, increment, decrement} = useCounter()

  return (
    
     <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/about" element={< About />} />
        <Route path="/profile" element={(
          <Protected > 
            < Profile /> 
          </Protected>
          )} />
        <Route path="/callback" element={< Callback />} />
        <Route path="/register" element={(
          <Protected > 
            < Register /> 
          </Protected>
          )} />
      </Routes>
{/*     
     <p>Change the value</p>
     <p>Value: {value}</p>
     <button onClick={decrement}>-</button>
     <button onClick={increment}>+</button>

     <NumberPresenter />
     <NumberModifier /> */}
    
    </div>
    

  );
}

export default App;
