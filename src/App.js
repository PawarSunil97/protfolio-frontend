import { ProtfolioContainer } from './ProtfolioContainer/ProtfolioContainer';
import { ToastContainer } from 'react-toastify';
import './App.css';
function App() {  
  return (
    <>
    <div className="App">
     
      <ProtfolioContainer />
      <ToastContainer position="top-center" autoClose={3000} />
      </div>
      </>
  );
}

export default App;
