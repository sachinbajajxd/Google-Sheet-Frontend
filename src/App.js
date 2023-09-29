import './App.css';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
