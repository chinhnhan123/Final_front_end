import React, { useState } from "react";
import { Modal } from "antd";
const Modals = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div onClick={() => setOpen(true)} className="inline-block">
        {props?.icon || "Button"}
      </div>

      <Modal
        title={props.title}
        centered
        open={open}
        onOk={() => {
          props.handleDeleteConfirm(props.id);
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
        <p>{props.content}</p>
      </Modal>
    </>
  );
};
export default Modals;
