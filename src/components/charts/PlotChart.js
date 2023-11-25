import React from "react";
import { Pie } from "@ant-design/plots";

const DemoPie = ({ data: dataUser }) => {
  const data = [
    {
      type: "Farmer",
      value: dataUser?.farmer || 0,
    },
    {
      type: "Trader",
      value: dataUser?.trader || 0,
    },
    {
      type: "VIP User",
      value: dataUser?.vip || 0,
    },
  ];
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Account\nTotal",
      },
    },
  };
  return (
    <div className="w-[40%] h-80 ">
      <Pie {...config} />
    </div>
  );
};

export default DemoPie;
