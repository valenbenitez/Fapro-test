import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import InvalidRoute from './components/404';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<InvalidRoute />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
