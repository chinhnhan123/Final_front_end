import React, { useEffect, useState } from "react";
import moment from "moment";

import InfoCard from "../../components/cards/InfoCard";
import DemoLine from "../../components/charts/LineChart";
import DemoPie from "../../components/charts/PlotChart";
import { getHerd as getHerdAPI } from "../../services/api/herd";
import {
  getTotalAccountFarmers,
  getTotalAccountTraders,
  getTotalAccountVIP,
} from "../../services/api/account";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [totalUser, setTotalUser] = useState({
    totalFarmer: 0,
    totalTrader: 0,
    totalVIP: 0,
  });
  console.log("🚀 ~ file: Dashboard.js:17 ~ Dashboard ~ totalUser:", totalUser);
  useEffect(() => {
    const getHerd = async () => {
      const resHerd = await getHerdAPI();
      const resTotalFarmer = await getTotalAccountFarmers();
      const resTotalTrader = await getTotalAccountTraders();
      const resTotalVIP = await getTotalAccountVIP();
      setTotalUser({
        totalFarmer: resTotalFarmer.data.total,
        totalTrader: resTotalTrader.data.total,
        totalVIP: resTotalVIP.data.total,
      });

      const dataResHerd = resHerd.data.data.map((item) => {
        return {
          date: moment(item.createdAt).format("DD-MM-YYYY"),
          Quantity: item.quantity,
        };
      });
      setData(dataResHerd);
    };
    getHerd();
  }, []);

  return (
    <div className="relative w-full bg-slate-50">
      <div className="w-full h-40 bg-sky-700 -z-1000 "></div>
      <div className="flex items-center justify-center gap-20 mb-8 -translate-y-14 ">
        <InfoCard title="Total farmer:" value={totalUser?.totalFarmer || 0}>
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/farmer-5706137-4745159.png"
            alt="Farmer"
            className="rounded-full shadow-xl w-14 h-14"
          />
        </InfoCard>
        <InfoCard title="Total trader:" value={totalUser?.totalTrader || 0}>
          <img
            src="https://www.clipartmax.com/png/middle/179-1793724_png-ico-more-trader-free-icon.png"
            alt="trader"
            className="rounded-full w-14 h-14"
          />
        </InfoCard>
        <InfoCard title="Total VIP:" value={totalUser?.totalVIP || 0}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/7186/7186453.png"
            alt="VIP"
            className="w-12 h-12 rounded-full"
          />
        </InfoCard>
      </div>
      {/* <div className="absolute px-3 py-2 font-medium bg-white rounded-lg cursor-pointer top-10 right-10">
        Create a new account
      </div> */}
      <div className="flex items-center justify-center">
        <DemoLine data={data} />
      </div>
      <div className="flex items-center justify-center mt-10 pb-20">
        <DemoPie
          data={{
            farmer: totalUser.totalFarmer,
            trader: totalUser.totalTrader,
            vip: totalUser.totalVIP,
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
