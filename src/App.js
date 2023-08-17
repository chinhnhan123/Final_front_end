import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";
import MessagePage from "./page/MessagePage";
import Main from "./layout/Main";
import Dashboard from "./page/Admin/Dashboard";
import Food from "./page/Admin/food/Food";
import CreateFood from "./page/Admin/food/CreateFood";
import CreateMedicine from "./page/Admin/medicine/CreateMedicine";
import Medicine from "./page/Admin/medicine/Medicine";
import Category from "./page/Admin/category/Category";
import CreateCategory from "./page/Admin/category/CreateCategory";
import Pigs from "./page/Famer/Pigs";
import CreatePig from "./page/Famer/CreatePig";
import UpdatePig from "./page/Famer/UpdatePig";
import DetailPig from "./page/Famer/DetailPig";
import HomeTrader from "./page/trader/Home";
function App({ socket }) {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main />}>
          <Route
            path="/message"
            element={<MessagePage socket={socket} />}
          ></Route>
          <Route path="/guide" element={<Dashboard />}></Route>
          <Route path="/food" element={<Food />}></Route>
          <Route path="/create-food" element={<CreateFood />}></Route>
          <Route path="/create-medicine" element={<CreateMedicine />}></Route>
          <Route path="/medicine" element={<Medicine />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/create-category" element={<CreateCategory />}></Route>

          <Route path="/" element={<Pigs />}></Route>
          <Route path="/createpig" element={<CreatePig />}></Route>
          <Route path="/updatePig/:id" element={<UpdatePig />}></Route>
          <Route path="/detailPig/:id" element={<DetailPig />}></Route>

          <Route path="/trader" element={<HomeTrader />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
