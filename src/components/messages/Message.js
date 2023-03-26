import { format } from "timeago.js";
const Message = ({ avatar, message, sender }) => {
  return (
    <>
      {!sender ? (
        <div className="flex mb-4 message">
          <div className="flex-2">
            <div className="relative w-12 h-12">
              <img
                className="w-12 h-12 mx-auto rounded-full"
                src={avatar}
                alt="chat-user"
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 border-2 border-white rounded-full"></span>
            </div>
          </div>
          <div className="flex-1 px-2">
            <div className="inline-block p-2 px-6 text-gray-700 bg-gray-300 rounded-full">
              <span>{message.content}</span>
            </div>
            <div className="pl-4">
              <small className="text-gray-500">
                {format(message.createdAt)}
              </small>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex mb-4 text-right message me">
          <div className="flex-1 px-2">
            <div className="inline-block p-2 px-6 text-white bg-blue-600 rounded-full">
              <span>{message.content}</span>
            </div>
            <div className="pr-4">
              <small className="text-gray-500">
                {format(message.createdAt)}
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Message;
