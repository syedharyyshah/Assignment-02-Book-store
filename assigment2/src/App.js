import { Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Cards from './components/Cards';

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Cards/>}/>
    </Routes> 
  );
}

export default App;
