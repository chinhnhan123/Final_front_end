import React from "react";
import InfoCard from "../../components/cards/InfoCard";

const Dashboard = () => {
  return (
    <div className="relative w-full">
      <div className="w-full h-40 bg-sky-700 -z-10 "></div>
      <div className="flex items-center justify-center gap-20 mb-8 -translate-y-14 ">
        <InfoCard title="Total farmer:" value="6389">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/farmer-5706137-4745159.png"
            alt="Farmer"
            className="rounded-full shadow-xl w-14 h-14"
          />
        </InfoCard>
        <InfoCard title="Total trader:" value="608">
          <img
            src="https://www.clipartmax.com/png/middle/179-1793724_png-ico-more-trader-free-icon.png"
            alt="trader"
            className="rounded-full w-14 h-14"
          />
        </InfoCard>
        <InfoCard title="Total trader VIP:" value="89">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7186/7186453.png"
            alt="VIP"
            className="w-12 h-12 rounded-full"
          />
        </InfoCard>
      </div>
      <div className="absolute px-3 py-2 font-medium bg-white rounded-lg cursor-pointer top-10 right-10">
        Create a new account
      </div>
    </div>
  );
};

export default Dashboard;
