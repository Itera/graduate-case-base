import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantHome from "./pages/RestaurantHome";
import RestaurantOverview from "./pages/RestaurantOverview";
import MyBookings from "./pages/MyBookings";


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/restaurant" element={<RestaurantHome />}/>
      <Route path="/mybookings" element={<MyBookings />}/>
      <Route path="/restaurants" element={<RestaurantOverview />}/>

    </Routes>
  )

}

export default App;
