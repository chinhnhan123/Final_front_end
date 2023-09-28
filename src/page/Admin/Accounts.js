import React, { useEffect, useState } from "react";
import axios from "../../http/index";
import { Table } from "antd";
import { Tag } from "antd";
import Button from "../../components/core/Button";

const styleNameColumn = "text-md 2xl:text-lg capitalize ";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  console.log("🚀 ~ file: Accounts.js:64 ~ accounts:", accounts);

  const handleStatusChange = async (_id, lockAccount) => {
    console.log("🚀 ~ file: Accounts.js:18 ~ props:", lockAccount);
    const res = await axios.patch(
      `http://localhost:4000/api/admin//lock-account/${_id}`,
      {
        lockAccount: !lockAccount,
      }
    );
    getAccounts();
  };

  const getAccounts = async () => {
    const res = await axios.get("http://localhost:4000/api/admin/accounts");
    setAccounts([...res.data]);
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const columns = [
    {
      title: <span className="text-lg font-bold 2xl:text-xl ">Full Name</span>,
      dataIndex: "fullName",
      className: styleNameColumn,
      width: "20%",
    },
    {
      title: <span className="text-lg font-bold 2xl:text-xl ">Email</span>,
      dataIndex: "email",
      className: styleNameColumn,
      width: "20%",
    },
    {
      title: <span className="text-lg font-bold 2xl:text-xl ">Address</span>,
      dataIndex: "address",
      className: styleNameColumn,
      width: "30%",
    },
    {
      title: <span className="text-lg font-bold 2xl:text-xl ">Phone</span>,
      dataIndex: "phoneNumber",
      className: styleNameColumn,
      width: "20%",
    },
    {
      title: <span className="text-lg font-bold 2xl:text-xl ">Role</span>,
      dataIndex: "role",
      className: styleNameColumn,
      width: "15%",
    },
    {
      title: <span className="text-lg font-bold 2xl:text-xl ">Status</span>,
      dataIndex: "lockAccount",
      className: styleNameColumn,
      render: (lockAccount) => (
        <Tag color={lockAccount === false ? "success" : "error"}>
          {lockAccount === false ? "Active" : "Lock"}
        </Tag>
      ),
      width: "15%",
    },
    {
      title: <span className="text-lg font-bold 2xl:text-xl ">Action</span>,
      dataIndex: "_id",
      className: styleNameColumn,
      render: (_id, record) => (
        <Button
          type="primary"
          className="!p-1"
          onClick={() => handleStatusChange(_id, record.lockAccount)}
        >
          {record.lockAccount === false ? "Lock" : "Unlock"}
        </Button>
      ),
      width: "15%",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center w-full my-7 ">
      <Table
        columns={columns}
        dataSource={accounts}
        onChange={onChange}
        className="w-[70%]"
      />
    </div>
  );
}
