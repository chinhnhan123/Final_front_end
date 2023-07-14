import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import Peer from "simple-peer";
import { AuthContext } from "../auth/AuthContext";
import socketIO from "socket.io-client";

const SocketContext = createContext();

const CallVideoContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();

  const [call, setCall] = useState({});
  const [yourID, setYourID] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const socket = useRef();
  const connectionRef = useRef();
  const { user } = useContext(AuthContext);

  const name = user?.fullName;

  useEffect(() => {
    socket.current = socketIO.connect("http://localhost:4000");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentStream;
        }
      });
  }, []);

  useEffect(() => {
    socket.current.on("yourID", (id) => {
      setYourID(id);
      console.log(
        "🚀 ~ file: CallVideoContext.js:43 ~ useEffect ~ me:",
        yourID
      );
    });
    socket.current.on("callUser", (data) => {
      setCall({
        isReceivingCall: true,
        signal: data.signalData,
        from: data.from,
        name: data.name,
      });
      console.log(data);
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
        name: name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        callEnded,
        yourID,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { CallVideoContextProvider, SocketContext };
