
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import ChocolateMaker from './ChocolateMaker';

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<ChocolateMaker/>} />
      </Routes>
  );
};

export default App;
