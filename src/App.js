
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import MockInterviewProfile from './Pages/Mock_Interviewer/MockInterviewProfile';
import Home from './Pages/Home';

import Mock_Interview from './Pages/Mock_Interview/Mock_Interview';
import NotFound from './Pages/NotFound';

import Interviewer_Card from './Components/Mock_Interview/Interviewer_Card';



function App() {
  return (
    <Router>
            <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/mock-interview" element={<Mock_Interview />} />
            <Route path='/mock-interview/:user_id' element={<MockInterviewProfile/>}/>
            <Route path="/test" element={<Interviewer_Card />} />   {/* Use to test component */}
            <Route path="*" element={<NotFound />} />
            
            </Routes>
    </Router>
  );
}

export default App;
