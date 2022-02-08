import { BrowserRouter } from 'react-router-dom';
import './App.css'
import './Components/Main';
import Main from './Components/Main';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Main/>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
