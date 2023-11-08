import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import defaultAvatar from "../../assets/images/default-avatar.jpg";
import DemoLine from "../../components/charts/LineChart";
import { AuthContext } from "../../context/auth/AuthContext";
import { enqueueSnackbar } from "notistack";
import { getHerdByAccount } from "../../services/api/herd";
import { getAccountById, updateAvatar } from "../../services/api/account";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(defaultAvatar);
  const [data, setData] = useState([]);
  const [dataPigs, setDataPigs] = useState({
    quantityHerd: 0,
    quantityPigs: 0,
  });

  useEffect(() => {
    const getHerd = async () => {
      const res = await getHerdByAccount(user.id);

      const resAccount = await getAccountById(user.id);

      setSelectedImage(resAccount?.data?.urlImage || defaultAvatar);

      const dataRes = res.data.map((item) => {
        return {
          date: moment(item.createdAt).format("DD-MM-YYYY"),
          Quantity: item.quantity,
        };
      });
      setDataPigs({
        quantityHerd: res.data.length,
        quantityPigs: res.data.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0),
      });
      setData(dataRes);
    };
    getHerd();
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    handleUpdateProfile(e.target.files[0]);
  };

  const handleUpdateProfile = async (data) => {
    const formData = new FormData();
    formData.append("file", data);
    const res = await updateAvatar(user.id, formData);
    if (res.status === 200) {
      enqueueSnackbar("Bạn đã cập nhật avatar thành công.", {
        variant: "success",
      });
    }
  };

  return (
    <div className=" flex gap-5 p-7">
      <div className="w-1/3 h-auto bg-white min-h-[500px] rounded-lg shadow-lg p-5">
        <div className="flex flex-col md:flex-row  md:items-center">
          {selectedImage && (
            <img
              name="avatar"
              src={selectedImage}
              alt="Selected"
              className="object-cover w-24 h-24 rounded-full"
            />
          )}
          <div className="ml-6">
            <input
              type="file"
              className="custom-file-input1"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="border border-solid border-gray-500 rounded-md mt-7 shadow-lg p-3 flex flex-col gap-2">
          <div>
            <p className="text-slate-600 font-semibold">Your name:</p>
            <div className="flex justify-between">
              <span className="capitalize">{user.fullName}</span>
              <button className="px-3 py-[5px] rounded-xl bg-[#f0effa] text-sm">
                Edit
              </button>
            </div>
          </div>
          <div>
            <p className="text-slate-600 font-semibold">Email:</p>
            <div className="flex justify-between">
              <span className="capitalize">{user.email}</span>
              <button className="px-3 py-[5px] rounded-xl bg-[#f0effa] text-sm">
                Edit
              </button>
            </div>
          </div>
          <div>
            <p className="text-slate-600 font-semibold">Phone number:</p>
            <div className="flex justify-between">
              <span className="capitalize">{user.phoneNumber}</span>
              <button className="px-3 py-[5px] rounded-xl bg-[#f0effa] text-sm">
                Edit
              </button>
            </div>
          </div>
          <div>
            <p className="text-slate-600 font-semibold">Address:</p>
            <div className="flex justify-between">
              <span className="capitalize">{user.address}</span>
              <button className="px-3 py-[5px] rounded-xl bg-[#f0effa] text-sm">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 h-auto bg-white min-h-[500px] rounded-lg shadow-lg p-5">
        <div className="flex justify-between px-4">
          <div className="w-[43%] p-5 border border-solid border-[#EBBC15] bg-[#fff39b] flex justify-between">
            <span className="text-[#606060]">Số lượng đàn heo</span>
            <span className="font-semibold">{dataPigs.quantityHerd}</span>
          </div>
          <div className="w-[43%] p-5 border border-solid border-[#EBBC15] bg-[#fff39b] flex justify-between">
            <span className="text-[#606060]">Số lượng heo</span>
            <span className="font-semibold">{dataPigs.quantityPigs}</span>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5">
          <DemoLine data={data} />
        </div>
      </div>
    </div>
  );
}
