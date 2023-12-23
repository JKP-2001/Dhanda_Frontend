
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import MockInterviewProfile from './Pages/Mock_Interviewer/MockInterviewProfile';
import Home from './Pages/Home';

import Mock_Interview from './Pages/Mock_Interview/Mock_Interview';


function App() {
  return (
    <Router>
            <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path="/mock-interview" element={<Mock_Interview />} />
            <Route path='/mock-interview/:user_id' element={<MockInterviewProfile/>}></Route>
            </Routes>
    </Router>
  );
}

export default App;
