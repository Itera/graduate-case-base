import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TreatmentPage from "./pages/TreatmentPage";
import ConfirmationPage from "./pages/ConfirmationPage";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/treatments" element={<TreatmentPage/>}/>
      <Route path="/confirmation" element={<ConfirmationPage/>}/>
    </Routes>
  )

}

export default App;
