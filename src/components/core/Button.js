import React from "react";

export default function Button(props) {
  return (
    <div
      onClick={props?.onClick || null}
      className="bg-[#FDB022] text-white hover:opacity-80 hover:text-white inline-block px-4 py-2 rounded-md active:shadow-sm cursor-pointer text-justify"
    >
      {props?.icon || null} {props?.children || "Button"}
    </div>
  );
}
