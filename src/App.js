import socketIO from "socket.io-client";
import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";
import MessagePage from "./page/MessagePage";
import Main from "./layout/Main";
import CallVideo from "./page/CallVideo1";
import Dashboard from "./page/Admin/Dashboard";
import Course from "./page/Admin/Course";
import Pigs from "./page/Famer/Pigs";
import CreatePig from "./page/Famer/CreatePig";
import UpdatePig from "./page/Famer/UpdatePig";
function App({ socket }) {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main />}>
          <Route
            path="/message"
            element={<MessagePage socket={socket} />}
          ></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/course" element={<Course />}></Route>
          <Route path="/" element={<Pigs />}></Route>
          <Route path="/createpig" element={<CreatePig />}></Route>
          <Route path="/updatePig/:id" element={<UpdatePig />}></Route>
        </Route>

        <Route path="/call/:id" element={<CallVideo />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
