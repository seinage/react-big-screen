import { FC, useEffect, useRef, useState } from "react";
import Border from "@/components/border";
import DateLineChart from "@/components/chart/dateLineChart";
import { RightSecondData } from "@/type/right";

const title = "近7日完成数量";

const RightSecond: FC<{ height: string, data: RightSecondData }> = (props) => {
  const chartRef = useRef<{ updateChart: Function }>();

  const xData = props.data.map(v => v.time);
  const data1 = props.data.map(v => v.workCount);
  const data2 = props.data.map(v => v.workCount - v.inspectCount);


  useEffect(() => {
    chartRef.current && chartRef.current.updateChart();
  }, [props.data]);

  return (
    <Border borderStyle={{ height: props.height, marginBottom: "5%" }} title={title}>
      <DateLineChart ref={chartRef} xData={xData} data1={data1} data2={data2}></DateLineChart>
    </Border>
  );
};

export default RightSecond;
