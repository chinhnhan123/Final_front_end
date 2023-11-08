import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "../style/createMedicine.css";
import { createMedicine } from "../../../services/api/medicine";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  types: yup.string().required("Types is required"),
  description: yup.string().required("Description is required"),
  instruction: yup.string().required("Instruction is required"),
});

const CreateMedicine = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("nameMedicine", data.name);
    formData.append("types", data.types);
    formData.append("description", data.description);
    formData.append("instruction", data.instruction);
    formData.append("file", data.image[0]);
    const res = await createMedicine(formData);
    if (res.status === 200) {
      navigate("/medicine", { replace: true });
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="flex justify-center mb-10 mt-7 md:mt-20 xl:mt-28">
      <div className="w-3/4 lg:w-[60%] bg-white rounded-lg">
        <h1 className="w-full  text-white bg-[#FDB022] text-2xl font-semibold rounded-t-lg h-14 text-center pt-3">
          Create new Medicine
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-7 lg:px-14"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <div className="">
              <div className="w-60  overflow-hidden bg-gray-200 aspect-[5/3]">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>
            </div>
            <div>
              <input
                type="file"
                {...register("image")}
                className="custom-file-input "
                onChange={handleImageChange}
              />
              <p className="hidden xl:block">
                Upload images in PNG, JPEG format. Size no more than 1Mb
              </p>
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Name Medicine:</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div>
            <label className="mb-2 mr-5 font-semibold ">Type:</label>
            <select
              {...register("types")}
              className="w-auto px-4 py-2 border border-gray-300 rounded"
            >
              <option value="Vaccine">Vaccine</option>
              <option value="Medicine">Medicine</option>
              <option value="Tonic">Tonic</option>
            </select>
            {errors.types && (
              <span className="text-red-500">{errors.types.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">Description:</label>
            <textarea
              type="text"
              rows="4"
              {...register("description")}
              className="w-full px-4 py-2 border border-gray-300 rounded "
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">Instruction:</label>
            <textarea
              rows="4"
              {...register("instruction")}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {errors.instruction && (
              <span className="text-red-500">{errors.instruction.message}</span>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2  text-white bg-[#FDB022] rounded hover:opacity-80"
            >
              Add Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMedicine;
