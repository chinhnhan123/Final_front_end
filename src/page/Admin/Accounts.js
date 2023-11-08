import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Tag } from "antd";
import Button from "../../components/core/Button";
import {
  getAccounts as getAccountsApi,
  lockAccountAPI,
} from "../../services/api/account";
const styleNameColumn = "text-md 2xl:text-lg capitalize ";

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

  const handleStatusChange = async (_id, lockAccount) => {
    await lockAccountAPI(_id, lockAccount);
    getAccounts();
  };

  const getAccounts = async () => {
    const res = await getAccountsApi();
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
        className="w-[90%]"
      />
    </div>
  );
}
