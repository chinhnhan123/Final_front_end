import { format } from "timeago.js";
import { useEffect, useState } from "react";
import { getAccountById } from "../../api/account";
const User = ({ logo, isChatting, userId, active }) => {
  const [fullName, setFullName] = useState();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getAccountById(userId);
        setFullName(res.data.fullName);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [userId]);

  const isOnline = `flex p-4 mb-4 transition-transform duration-300 border-red-500 transform bg-white rounded shadow-md cursor-pointer entry hover:scale-105 ${
    isChatting === userId ? "border-l-4 " : ""
  }}`;
  return (
    <div className={isOnline}>
      <div className="flex-2">
        <div className="relative w-12 h-12">
          <img
            className="w-12 h-12 mx-auto rounded-full"
            src={logo}
            alt="chat-user"
          />
          {active ? (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          ) : (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full"></span>
          )}
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="w-32 truncate">
          <span className="text-gray-800 ">{fullName}</span>
        </div>
        <div>
          <small className="text-gray-500">
            {active ? <p>Active now</p> : <p>Inactive</p>}
          </small>
        </div>
      </div>
    </div>
  );
};
export default User;
