import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";
import MessagePage from "./page/MessagePage";
import Main from "./layout/Main";
import Dashboard from "./page/Admin/Dashboard";
import Accounts from "./page/Admin/Accounts";
import Food from "./page/Admin/food/Food";
import CreateFood from "./page/Admin/food/CreateFood";
import UpdateFood from "./page/Admin/food/UpdateFood";
import Medicine from "./page/Admin/medicine/Medicine";
import CreateMedicine from "./page/Admin/medicine/CreateMedicine";
import UpdateMedicine from "./page/Admin/medicine/UpdateMedicine";
import Category from "./page/Admin/category/Category";
import CreateCategory from "./page/Admin/category/CreateCategory";
import UpdateCategory from "./page/Admin/category/UpdateCategory";

import Guide from "./page/Admin/guide/Guide";
import CreateGuide from "./page/Admin/guide/CreateGuide";
import UpdateGuide from "./page/Admin/guide/UpdateGuide";
import Pigs from "./page/Farmer/Pigs";
import CreatePig from "./page/Farmer/CreatePig";
import UpdatePig from "./page/Farmer/UpdatePig";
import DetailPig from "./page/Farmer/DetailPig";
import Profile from "./page/Farmer/Profile";
import ChatBot from "./page/Farmer/ChatBot";
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
          <Route path="/guide" element={<Guide />}></Route>
          <Route
            path="/create-guide/:idCategory"
            element={<CreateGuide />}
          ></Route>
          <Route
            path="/update-guide/:idCategory"
            element={<UpdateGuide />}
          ></Route>
          <Route path="/accounts" element={<Accounts />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="/food" element={<Food />}></Route>
          <Route path="/create-food" element={<CreateFood />}></Route>
          <Route path="/update-food/:id" element={<UpdateFood />}></Route>

          <Route path="/medicine" element={<Medicine />}></Route>
          <Route path="/create-medicine" element={<CreateMedicine />}></Route>
          <Route
            path="/update-medicine/:id"
            element={<UpdateMedicine />}
          ></Route>

          <Route path="/category" element={<Category />}></Route>
          <Route path="/create-category" element={<CreateCategory />}></Route>
          <Route
            path="/update-category/:id"
            element={<UpdateCategory />}
          ></Route>

          <Route path="/" element={<Pigs />}></Route>
          <Route path="/create-pig" element={<CreatePig />}></Route>
          <Route path="/update-pig/:id" element={<UpdatePig />}></Route>
          <Route path="/detail-pig/:id" element={<DetailPig />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/chat-bot" element={<ChatBot />}></Route>
          {/* <Route path="/payment" element={<Payment />}></Route> */}

          <Route path="/trader" element={<HomeTrader />}></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
