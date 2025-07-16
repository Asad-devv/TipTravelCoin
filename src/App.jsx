import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Elements/Navbar';
import Footer from './Elements/Footer';
import DisclaimerPage from './Pages/DisclaimerPage';
import Presale from './Pages/Presale';
import Whitepaper from './Pages/Whitepaper';
import { Toaster } from 'react-hot-toast';
import {useEffect} from 'react';

const App = () => {

      useEffect(() => {
        // Check if the script is already added to prevent multiple inserts
        if (!document.getElementById("elfsight-script")) {
            const script = document.createElement("script");
            script.src = "https://static.elfsight.com/platform/platform.js";
            script.async = true;
            script.id = "elfsight-script";
            document.body.appendChild(script);
        }
    }, []);

    
  return (
    <div>

      <Toaster/>
      <Router>

        <Navbar />

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/disclaimer' element={<DisclaimerPage />} />
          <Route path='/whitePaper' element={<Whitepaper />} />
          <Route path='/buy' element={<Presale />} />

        </Routes>

        <Footer />

      </Router>

    </div>
  )
}

export default App