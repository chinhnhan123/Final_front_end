import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .positive("Quantity must be a positive number")
    .integer("Quantity must be an integer"),
});

const UpdatePig = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedImage, setSelectedImage] = useState(
    "https://thuthuatnhanh.com/wp-content/uploads/2022/08/hinh-anh-avatar-luffy-mac-do-kimono.jpg"
  );

  const location = useLocation();
  const { name, category, quantity } = location.state || {};
  console.log(
    "🚀 ------------------------------------------------------------🚀"
  );
  console.log(
    "🚀 ~ file: UpdatePig.js:33 ~ UpdatePig ~ quantity:",
    typeof quantity
  );
  console.log(
    "🚀 ------------------------------------------------------------🚀"
  );

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/4 lg:w-[60%] bg-white rounded-lg">
        <h1 className="w-full  text-white bg-[#FDB022] text-2xl font-semibold rounded-t-lg h-14 text-center pt-3">
          Update Pig
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
                className="custom-file-input"
                onChange={handleImageChange}
              />
              <p className="hidden xl:inline-flex">
                Upload images in PNG, JPEG format. Size no more than 1Mb
              </p>
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Name:</label>
            <input
              type="text"
              {...register("name")}
              value={name}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">Category:</label>
            <input
              type="text"
              {...register("category")}
              value={category}
              className="w-full px-4 py-2 border border-gray-300 rounded "
            />
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">Quantity:</label>
            <input
              type="number"
              value={quantity}
              {...register("quantity")}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {errors.quantity && (
              <span className="text-red-500">{errors.quantity.message}</span>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2  text-white bg-[#FDB022] rounded hover:opacity-80"
            >
              Update pigs
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePig;
