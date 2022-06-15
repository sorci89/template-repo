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
//useHistory, useNavigate, most CounterProvider, ezek index.js-be mennek

function App() {

//  const {value, increment, decrement} = useCounter()

  return (
    
     <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/about" element={< About />} />
        <Route path="/profile" element={< Profile />} />
        <Route path="/callback" element={< Callback />} />
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
