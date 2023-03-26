import logo from "../assets/images/logo.png";
const SideBar = () => {
  return (
    <div className="hidden w-64 bg-gray-200 xl:block">
      <div className="text-center user-profile">
        <div className="">
          <img
            src={logo}
            alt="logo"
            className="block w-32 h-32 m-auto mt-6 border-2 rounded-full shadow-lg"
          />
        </div>
      </div>

      <div className="mt-8 menu">
        <a
          className="block px-12 py-4 text-gray-600 border-l-4 hover:bg-gray-300 hover:text-black"
          href="/#"
        >
          <span className="inline-block mr-2 align-text-bottom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>
          Home
        </a>
        <a
          className="block px-12 py-4 text-black bg-gray-300 border-l-4 border-gray-800 hover:bg-gray-300 hover:text-black"
          href="/#"
        >
          <span className="inline-block mr-2 align-text-bottom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
              />
            </svg>
          </span>
          Chat
        </a>
      </div>

      <div className="absolute flex gap-2 bottom-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsi9Fr2wXH4VSiJVPj699LjORRidri6dc3PDeKvxJO6iJ6SFPVVmM_PfGZfX96SaDrSk&usqp=CAU"
          alt=""
          className="block w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-lg font-semibold">phan le chinh nhaan</p>
          <a href="/#" className="text-sm font-light">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
