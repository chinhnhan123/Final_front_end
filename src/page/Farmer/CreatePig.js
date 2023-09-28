import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./style/createPig.css";
import axios from "../../http/index";
import { useNavigate } from "react-router-dom";
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

const CreatePig = () => {
  const {
    register,
    handleSubmit,
    isSubmitting,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryInGuide, setCategoryInGuide] = useState([]);
  const idAccount = JSON.parse(localStorage.getItem("user"));
  const getCategoryInGuide = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/category/category-in-guide`
      );
      if (res.status === 200) {
        setCategoryInGuide(res?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getCategoryInGuide();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("idAccount", idAccount.id);
    formData.append("idCategory", data.category);
    formData.append("quantity", data.quantity);
    formData.append("file", data.image[0]);

    const res = await axios.post("http://localhost:4000/api/herd", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      navigate("/", { replace: true });
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="flex justify-center mt-7 md:mt-20 xl:mt-28">
      <div className="w-3/4 lg:w-[60%] bg-white rounded-lg">
        <h1 className="w-full  text-white bg-[#FDB022] text-2xl font-semibold rounded-t-lg h-14 text-center pt-3">
          Create new Pig
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
            <label className="block mb-2 font-semibold">Name:</label>
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
            <label className="block mb-2 font-semibold">Category:</label>
            <select
              {...register("category")}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            >
              <option value="" disabled selected hidden>
                Select your category
              </option>
              {categoryInGuide.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.nameCategory}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="text-red-500">{errors.category.message}</span>
            )}
          </div>
          <div>
            <label className="block mb-2 font-semibold">Quantity:</label>
            <input
              type="number"
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
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Pig..." : "Create Pig"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePig;
