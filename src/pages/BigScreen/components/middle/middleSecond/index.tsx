import { FC, useEffect, useRef, useState } from "react";
import Border from "@/components/border";
import ColumnChart from "@/components/chart/columnChart";
import { Col, Row } from "antd";
import NumberCard from "@/components/numberCard";
import styles from "./index.less";
import { MiddleSecondData } from "@/type/middle";
import api from "@/services/api";

const title = "当前任务统计";
const MiddleSecond: FC<{ height: string, data: MiddleSecondData }> = (props) => {
  const chartRef = useRef<{ updateChart: Function }>();

  const [userList, setUserList] = useState<{ id: number, name: string }[]>([]);

  const calcName = (id: number) => userList.find(v => v.id === id)?.name ?? "";

  function fetchUserList() {
    api.queryUserList().then(({ code, data }) => {
      if (code === 0) {
        setUserList(data.records.map(v => ({ id: v.id, name: v.name })));
      }
    });
  }

  useEffect(() => {
    fetchUserList();
  }, []);

  const chartData = Object.keys(props.data).map(v =>
    ({ name: calcName(Number(v)), count: props.data[v] }))
    .sort((a,b)=>b.count-a.count);


  const numberData = [
    chartData.length, chartData.reduce((total, v) => total + v.count, 0)
  ];


  useEffect(() => {
    chartRef.current && chartRef.current.updateChart();
  }, [chartData]);

  return (
    <Border borderStyle={{ height: props.height }} title={title}>
      <Row style={{ height: "100%", justifyContent: "stretch" }}>
        <Col span={20}>
          <ColumnChart ref={chartRef} data={chartData}></ColumnChart>
        </Col>
        <Col span={4}>
          <div className={styles.numberCardContainer}>
            {
              [
                { count: numberData[0], desc: "作业人员", color: "#ed3f35" },
                { count: numberData[1], desc: "任务总量", color: "#eacf19" }
              ].map(
                ({ count, desc, color }, k) =>
                  <NumberCard count={count} desc={desc} color={color} key={k}></NumberCard>
              )
            }
          </div>
        </Col>
      </Row>
    </Border>
  );
};

export default MiddleSecond;
