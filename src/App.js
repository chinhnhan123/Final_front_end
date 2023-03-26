import socketIO from "socket.io-client";
import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";
import MessagePage from "./page/MessagePage";
import Main from "./layout/Main";
const socket = socketIO.connect("http://localhost:4000");
function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main />}>
          <Route
            path="/message"
            element={<MessagePage socket={socket} />}
          ></Route>
        </Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
