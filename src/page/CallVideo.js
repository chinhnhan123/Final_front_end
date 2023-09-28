import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/CallVideo/CallVideoContext";
const CallVideo = () => {
  const {
    name,
    answerCall,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    callUser,
    leaveCall,
  } = useContext(SocketContext);

  const { id } = useParams();
  useEffect(() => {
    callUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="h-screen bg-slate-800">
      <header className="w-full h-10 pt-1 text-xl font-thin text-center text-white bg-slate-700">
        Video call
      </header>
      <div className="flex w-full mt-20 border h-3/5 border-amber-300">
        {stream && (
          <div className="relative w-1/2 myVideo">
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className="w-full h-full"
            />
            <p className="absolute bottom-0 z-20 px-3 py-2 font-medium text-white rounded-lg opacity-70 left-24 bg-slate-700">
              {name || "Name"}
            </p>
          </div>
        )}
        {callAccepted && !callEnded && (
          <div className="relative w-1/2 userVideo">
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className="w-full h-full"
            />
            <p className="absolute bottom-0 left-0 z-20 px-3 py-2 font-medium text-white rounded-lg bg-slate-700">
              Name
            </p>
          </div>
        )}
      </div>
      <footer className="absolute bottom-0 flex items-center justify-center w-full h-16 gap-4 pt-1 bg-slate-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          onClick={answerCall}
          className="w-10 h-10 p-2 text-white rounded-full cursor-pointer bg-sky-600 hover:bg-sky-700"
        >
          <path
            strokeLinecap="round"
            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-10 h-10 p-2 text-white rounded-full cursor-pointer bg-sky-600 hover:bg-sky-700"
        >
          <path
            strokeLinecap="round"
            stroke-linejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          onClick={leaveCall}
          className="w-10 h-10 p-2 text-white bg-red-500 rounded-full cursor-pointer hover:bg-red-600"
        >
          <path
            strokeLinecap="round"
            stroke-linejoin="round"
            d="M15.75 3.75L18 6m0 0l2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
          />
        </svg>
      </footer>
    </div>
  );
};

export default CallVideo;
