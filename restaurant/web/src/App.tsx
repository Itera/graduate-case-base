import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RestaurantHome from "./pages/RestaurantHome";
import RestaurantOverview from "./pages/RestaurantOverview";
import ReserveTable from "./pages/ReserveTable";


const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
      <Route path="/restaurant/1" element={<RestaurantHome />}/>
      <Route path="/restaurants" element={<RestaurantOverview />}/>
      <Route path="/restaurant/1/reserve" element={<ReserveTable />}/>

    </Routes>
  )

}

export default App;
