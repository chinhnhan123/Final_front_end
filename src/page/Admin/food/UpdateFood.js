import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../http/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { enqueueSnackbar } from "notistack";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getFoodDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/food/${id}`);
        const foodData = res.data;

        // Set initial form values
        setValue("name", foodData.nameFood);
        setValue("description", foodData.description);

        // Set initial image preview
        setSelectedImage(foodData.urlImage);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };

    getFoodDetails();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("nameFood", data.name);
    formData.append("description", data.description);
    if (data.image[0]) {
      formData.append("file", data.image[0]);
    } else {
      formData.append("img", selectedImage);
    }

    try {
      const res = await axios.patch(
        `http://localhost:4000/api/food/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        navigate("/food");
      }
    } catch (error) {
      enqueueSnackbar("Thông tin chưa chính xác", { variant: "error" });
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="flex justify-center mb-10 mt-7 md:mt-20 xl:mt-28">
      <div className="w-3/4 lg:w-[60%] bg-white rounded-lg">
        <h1 className="w-full  text-white bg-[#FDB022] text-2xl font-semibold rounded-t-lg h-14 text-center pt-3">
          Update Food
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
            <label className="block mb-2 font-semibold">Name Food:</label>
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
            <label className="block mb-2 font-semibold">Description:</label>
            <textarea
              type="text"
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
              className="px-4 py-2  text-white bg-[#FDB022] rounded hover:opacity-80"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating Food..." : "Update Food"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
