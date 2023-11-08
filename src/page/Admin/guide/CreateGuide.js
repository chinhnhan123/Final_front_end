import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Steps } from "antd";

import Button from "../../../components/core/Button";
import FormStage1 from "../../../components/form/FormStage1";
import FormStage2 from "../../../components/form/FormStage2";
import FormStage3 from "../../../components/form/FormStage3";

import { PlusCircleFilled } from "@ant-design/icons";

import { getFood as getFoodAPI } from "../../../services/api/food";
import { getMedicine as getMedicineAPI } from "../../../services/api/medicine";
import { createGuide } from "../../../services/api/guide";

const guideData = {
  food: [],
  medicine: [],
  notes: "",
};

const CreateGuide = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { idCategory } = useParams();

  const [stage1, setStage1] = useState(guideData);
  const [stage2, setStage2] = useState(guideData);
  const [stage3, setStage3] = useState(guideData);

  const [food, setFood] = useState([]);
  const [medicine, setMedicine] = useState([]);
  useEffect(() => {
    const getFood = async () => {
      const res = await getFoodAPI();
      setFood([...res.data]);
    };
    getFood();
  }, []);

  useEffect(() => {
    const getMedicine = async () => {
      const res = await getMedicineAPI();
      setMedicine([...res.data]);
    };
    getMedicine();
  }, []);

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const steps = [
    {
      title: "Giai đoạn 1",
      key: "1",
      component: (
        <FormStage1
          foodSelect={food}
          medicineSelect={medicine}
          stage1={stage1}
          setStage1={setStage1}
        />
      ),
    },
    {
      title: "Giai đoạn 2",
      key: "2",
      component: (
        <FormStage2
          foodSelect={food}
          medicineSelect={medicine}
          stage2={stage2}
          setStage2={setStage2}
        />
      ),
    },
    {
      title: "Giai đoạn 3",
      key: "3",
      component: (
        <FormStage3
          foodSelect={food}
          medicineSelect={medicine}
          stage3={stage3}
          setStage3={setStage3}
        />
      ),
    },
  ];

  const onNext = () => {
    setCurrent(current + 1);
  };

  const onDone = async () => {
    const payload = {
      stage1: {
        idFood: stage1.food,
        idMedicine: stage1.medicine,
        idCategory: idCategory,
        notes: stage1.notes,
      },
      stage2: {
        idFood: stage2.food,
        idMedicine: stage2.medicine,
        idCategory: idCategory,
        notes: stage2.notes,
      },
      stage3: {
        idFood: stage3.food,
        idMedicine: stage3.medicine,
        idCategory: idCategory,
        notes: stage3.notes,
      },
    };
    const res = await createGuide(payload);
    if (res.status === 200) {
      navigate("/guide", { replace: true });
    }
  };

  const renderFooter = () => (
    <div className="px-8 text-end">
      <Button
        type={current === 0 ? "primary" : "default"}
        suffix={current === 0 && <PlusCircleFilled />}
        onClick={current === 2 ? onDone : onNext}
      >
        {current === 2 ? "Done" : "Next"}
      </Button>
    </div>
  );

  return (
    <div className="flex justify-center mb-10 mt-7 xl:mt-15">
      <div className="w-[85%] 2xl:w-[80%] bg-white rounded-lg pt-2 pb-8">
        <Steps
          type="navigation"
          size="small"
          current={current}
          onChange={onChange}
          className="site-navigation-steps text-[#FDB022]"
          items={steps}
        />
        <div className="px-10 py-1">{steps[current]?.component || ""}</div>
        {renderFooter()}
      </div>
    </div>
  );
};
export default CreateGuide;
