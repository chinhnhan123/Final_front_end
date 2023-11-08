import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { createCategory } from "../../../services/api/category";

const schema = yup.object().shape({
  nameCategory: yup.string().required("Category name is required"),
  kilogram: yup.number().required("Kilogram is required"),
  description: yup.string().required("Description is required"),
  daysToRaisePigs: yup.number().required("Days to raise pigs is required"),
});

const CreateCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await createCategory(data);
    if (res.status === 200) {
      navigate("/category", { replace: true });
    }
  };

  return (
    <div className="flex justify-center mb-10 mt-7 md:mt-20 xl:mt-28">
      <div className="w-3/4 lg:w-[60%] bg-white rounded-lg">
        <h1 className="w-full  text-white bg-[#FDB022] text-2xl font-semibold rounded-t-lg h-14 text-center pt-3">
          Create new Category
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 p-7 lg:px-14"
        >
          <div>
            <label className="block mb-2 font-semibold">Category Name:</label>
            <input
              type="text"
              {...register("nameCategory")}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {errors.nameCategory && (
              <span className="text-red-500">
                {errors.nameCategory.message}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">Kilogram:</label>
            <input
              type="number"
              {...register("kilogram")}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {errors.kilogram && (
              <span className="text-red-500">{errors.kilogram.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">
              Days to Raise Pigs:
            </label>
            <input
              type="number"
              {...register("daysToRaisePigs")}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {errors.daysToRaisePigs && (
              <span className="text-red-500">
                {errors.daysToRaisePigs.message}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">Description:</label>
            <textarea
              rows="7"
              {...register("description")}
              className="w-full px-4 py-2 border border-gray-300 rounded "
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#FDB022] rounded hover:opacity-80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Category..." : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
