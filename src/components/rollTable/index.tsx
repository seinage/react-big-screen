import { createContext, FC, useState } from "react";
import styles from "./index.less";
import RollTableHeader from "@/components/rollTable/rollTableHeader";
import RollTableBody from "@/components/rollTable/rollTableBody";

export interface Column {
  name: string;
  width: number;
  key: string;
}

export type RollTableSingle = {
  [x: string]: string | number | boolean;
} & {
  // 行状态，0为正常，1为success，2为warning，3为danger
  lineState?: number;
};

const RollTable: FC<{ columns: Column[]; tableData: RollTableSingle[] }> = (
  props
) => {
  return (
    <div className={styles.rollTable}>
      <RollTableHeader columns={props.columns}></RollTableHeader>
      <RollTableBody
        columns={props.columns}
        tableData={props.tableData}
      ></RollTableBody>
    </div>
  );
};

export default RollTable;
