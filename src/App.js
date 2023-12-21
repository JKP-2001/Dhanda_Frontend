
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './Pages/Home';
import MockInterviewProfile from './Pages/Mock_Interview/MockInterviewProfile';

function App() {
  return (
    <Router>
            <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/mock-interview/:user_id' element={<MockInterviewProfile/>}></Route>
            </Routes>
    </Router>
  );
}

export default App;
