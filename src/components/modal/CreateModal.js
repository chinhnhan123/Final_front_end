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
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={400}
        okText="Create"
        okButtonProps={{
          className: "!bg-[#FDB022] hover:opacity-60 ",
        }}
        cancelButtonProps={{
          className: "!border-[#FDB022] !text-[#FDB022] hover:opacity-60 ",
        }}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};
export default Modals;
