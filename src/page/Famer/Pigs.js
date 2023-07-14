import React from "react";
import Button from "../../components/core/Button";
import { PlusSquareOutlined } from "@ant-design/icons";
import PigCard from "../../components/cards/PigCard";
import { useNavigate } from "react-router";

export default function Pigs() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-10 text-center">
        <Button
          type="link"
          icon={<PlusSquareOutlined className="-translate-y-[3px] pr-[2px]" />}
          onClick={() => {
            navigate("/createpig");
          }}
        >
          Create new pig
        </Button>
      </div>
      <div className="grid grid-cols-1 mb-8 sm:gap-x-2 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
        <PigCard idPig="1111" />
        <PigCard idPig="1111" />
        <PigCard idPig="1111" />
        <PigCard idPig="1111" />
        <PigCard idPig="1111" />
      </div>
    </div>
  );
}
