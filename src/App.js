import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Home from "./routes/Home";

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/movie/:id" element={<Detail/>}></Route>
      <Route path="/react-ymdb" element={<Home/>}></Route>
    </Routes>
  </Router>
  );
}

export default App;
