import { useEffect, useState } from "react";
import { getAccountById } from "../../services/api/account";
const HeaderChat = ({ logo, userId, active }) => {
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

  const handleCallVideo = () => {
    window.location.replace(`/call/${userId}`);
  };
  return (
    <div className="flex flex-row justify-between border-b-2 border-gray-200">
      <div className="flex px-2">
        <div className="relative">
          <img className="w-12 h-12 mx-auto rounded-full" src={logo} alt="" />
          {active ? (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          ) : (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div className="w-32 ml-2 truncate">
          <span className="text-gray-800">{fullName}</span>
          <small className="block text-gray-600">
            {active ? <p>Active now</p> : <p>Inactive</p>}
          </small>
        </div>
      </div>
      <div className="flex gap-3 mr-3 call">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          onClick={handleCallVideo}
          className="w-6 h-6 font-normal"
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
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      </div>
    </div>
  );
};
export default HeaderChat;
