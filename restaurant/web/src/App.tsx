import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantHome from "./pages/RestaurantHome";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/restaurant" element={<RestaurantHome />}>
      </Route>
    </Routes>
  )

}

export default App;
