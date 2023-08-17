import { Table as TableAntd } from "antd";
const Table = (props) => {
  const showSizeChanger = props?.showSizeChanger || false;
  const pageZise = props?.pageSizeOptions || [""];
  return (
    <TableAntd
      columns={props?.columns}
      dataSource={props?.dataSource}
      rowClassName={props?.rowClassName || ""}
      className={props?.className || ""}
      pagination={{
        showSizeChanger: showSizeChanger,
        pageSizeOptions: pageZise,
      }}
    />
  );
};

export default Table;
