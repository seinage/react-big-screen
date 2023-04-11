import { createContext, CSSProperties, FC, useEffect, useState } from "react";
import Border from "@/components/border";
import RollTable, { Column, RollTableSingle } from "@/components/rollTable";
import { LeftSecondData } from "@/type/left";

const borderStyle: CSSProperties = {};

const innerStyle: CSSProperties = {};

const title = "工单列表";

const columns: Column[] = [
  { name: "序号", width: 10, key: "order" },
  { name: "工单号", width: 60, key: "orderNo" },
  { name: "完成率", width: 30, key: "progress" },
  { name: "状态", width: 30, key: "state" }
];


const LeftSecond: FC<{ height: string, data: LeftSecondData }> = (props) => {

  return (
    <Border
      borderStyle={{ ...borderStyle, height: props.height, marginBottom: "5%" }}
      innerStyle={innerStyle}
      title={title}
    >
      <RollTable columns={columns} tableData={
        props.data.map(v => ({
          ...v,
          state: ["未开始", "作业中", "已完成"][v.state ?? 0],
          lineState: [0, 0, 1][v.state ?? 0]
        }))
      }></RollTable>
    </Border>
  );
};

export default LeftSecond;
