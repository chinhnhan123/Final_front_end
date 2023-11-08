import { Line } from "@ant-design/plots";

const DemoLine = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "Quantity",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };

  return (
    <div className="w-[85%] ">
      <Line {...config} />
    </div>
  );
};

export default DemoLine;
