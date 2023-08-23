import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantOverview from "./pages/RestaurantOverview";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/restaurants" element={<RestaurantOverview />}>
      </Route>
    </Routes>
  )

}

export default App;
