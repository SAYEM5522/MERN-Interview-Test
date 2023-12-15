import React from 'react'
import WhiteBoard from './components/whiteBoard/WhiteBoard'

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AllDrawing from './components/view/AllDrawing';
import Drawing from './components/view/Drawing';

const App = () => {
  return (
    <div>
     <Router>
     <Routes>
     <Route path="/" element={<AllDrawing/>} />
     <Route path="/createWhiteboard" element={<WhiteBoard/>} />
     <Route path="/whiteBoard/:id" element={<Drawing/>} />

     </Routes>
     </Router>
     
    </div>
  )
}

export default App