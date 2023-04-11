import { FC, useEffect, useRef, useState } from "react";
import Border from "@/components/border";
import { Col, Row } from "antd";
import PieChart from "@/components/chart/pieChart";
import { RightThirdData } from "@/type/right";

const RightThird: FC<{ height: string, data: RightThirdData }> = (props) => {
  const chartLeftRef = useRef<{ updateChart: Function }>(null);
  const chartRightRef = useRef<{ updateChart: Function }>(null);

  const { left, right } = props.data;

  const dataLeft = [
    { name: "在线", value: left[0] },
    { name: "离线", value: left[1] }
  ];

  useEffect(() => {
    chartLeftRef.current && chartLeftRef.current.updateChart();
  }, [dataLeft]);

  const dataRight = [
    { name: "合格品", value: right[0] },
    { name: "不合格品", value: right[1] }
  ]
  useEffect(() => {
    chartRightRef.current && chartRightRef.current.updateChart();
  }, [dataRight]);

  return (
    <Row gutter={16} style={{ height: props.height, marginBottom: "5%" }}>
      {
        [
          { title: "设备状态", data: dataLeft, ref: chartLeftRef, colorList: ['#36be90', '#8e8e8a', 'red'] },
          { title: "昨日合格统计", data: dataRight, ref: chartRightRef, colorList: ['#36be90', 'red'] }
        ].map((v, k) => {
          const { title, data, colorList, ref } = v;
          return <Col span={12} key={title}>
            <Border borderStyle={{ height: "100%" }} title={title}>
              <PieChart data={data} ref={ref} colorList={colorList}></PieChart>
            </Border>
          </Col>;
        })}
    </Row>
  );
};

export default RightThird;
