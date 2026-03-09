import { BrowserRouter as Router } from 'react-router-dom';
import Presale from './Pages/Presale';
import { Toaster } from 'react-hot-toast';
import Navbar from './Elements/Navbar';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Toaster />
        <Presale />
      </div>
    </Router>
  );
};

export default App;
