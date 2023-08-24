import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TreatmentPage from "./pages/TreatmentPage";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/treatments" element={<TreatmentPage/>}/>
    </Routes>
  )

}

export default App;
