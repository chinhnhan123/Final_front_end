import React, { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router";
import Button from "../core/Button";
import { enqueueSnackbar } from "notistack";

const Modals = (props) => {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(
    props?.categoriesNotInGuide[0]?._id
  );
  const navigate = useNavigate();
  const onChange = (categoryId) => {
    console.log("🚀 ~ file: Guide.js:44 ~ categoryId:", categoryId);
    setCategoryId(categoryId);
  };

  const handleNavigation = () => {
    if (!categoryId) {
      enqueueSnackbar("Bạn chưa chọn category", { variant: "error" });
      return;
    }
    navigate(`/create-guide/${categoryId}`);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create new guide</Button>
      <Modal
        title={props.title}
        centered
        open={open}
        onOk={() => {
          handleNavigation();
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        width={400}
        okText={props.okText}
        okButtonProps={{
          className: "!bg-[#FDB022] hover:opacity-60 ",
        }}
        cancelButtonProps={{
          className: "!border-[#FDB022] !text-[#FDB022] hover:opacity-60 ",
        }}
      >
        <p>
          <select
            required
            onChange={(e) => onChange(e.target.value)}
            className="px-2 py-1 border rounded"
          >
            <option value="" disabled selected hidden>
              Select category
            </option>
            {props?.categoriesNotInGuide.map((category) => (
              <option key={category._id} value={category._id}>
                {category.nameCategory}
              </option>
            ))}
          </select>
        </p>
      </Modal>
    </>
  );
};
export default Modals;
