import React from "react";
// import axios from "../../../http/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.css";

import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const schema = yup.object().shape({
  note: yup.string().required("Note is required"),
});

const Stage2 = ({ foodSelect, medicineSelect, stage2, setStage2 }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChangeFood = (value) => {
    setStage2((prevData) => ({
      ...prevData,
      food: value,
    }));
  };
  const handleChangeMedicine = (value) => {
    setStage2((prevData) => ({
      ...prevData,
      medicine: value,
    }));
  };

  const handleChangeNotes = (event) => {
    setStage2((prevData) => ({
      ...prevData,
      notes: event.target.value,
    }));
  };
  return (
    <form className="space-y-4 p-7 lg:px-14">
      <div>
        <h2 className="mb-2 text-lg font-semibold">Select Foods:</h2>
        <Select
          mode="multiple"
          placeholder="select food"
          defaultValue={stage2.food}
          onChange={handleChangeFood}
          optionLabelProp="label"
          className="w-full"
          options={foodSelect.map((food) => ({
            value: food._id,
            label: food.nameFood,
          }))}
        ></Select>
        {errors.food && (
          <span className="text-red-500">{errors.food.message}</span>
        )}
      </div>
      <div>
        <h2 className="mb-2 text-lg font-semibold">Select Medicines:</h2>
        <Select
          mode="multiple"
          placeholder="select medicine"
          defaultValue={stage2.medicine}
          onChange={handleChangeMedicine}
          optionLabelProp="label"
          className="w-full"
          options={medicineSelect.map((medicine) => ({
            value: medicine._id,
            label: medicine.nameMedicine,
          }))}
        ></Select>
        {errors.medicine && (
          <span className="text-red-500">{errors.medicine.message}</span>
        )}
      </div>
      <div>
        <label className="block mb-2 font-semibold">Note:</label>
        <textarea
          type="text"
          rows="7"
          defaultValue={stage2.notes}
          {...register("note")}
          onChange={handleChangeNotes}
          className="w-full px-4 py-2 border border-gray-300 rounded "
        />
        {errors.note && (
          <span className="text-red-500">{errors.note.message}</span>
        )}
      </div>
    </form>
  );
};

export default Stage2;
