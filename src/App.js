import { BrowserRouter } from 'react-router-dom';
import './App.css'
import './Components/Main';
import Main from './Components/Main';
import {AuthContextProvider} from './context/AuthContext'
function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
