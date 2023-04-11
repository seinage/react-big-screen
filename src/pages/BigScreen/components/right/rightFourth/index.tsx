import { FC, useEffect, useRef, useState } from "react";
import Border from "@/components/border";
import { echarts } from "@/plugins";
import { ECOption } from "@/plugins/echarts";
import HorizontalBarChart from "@/components/chart/horizontalBarChart";

const title = "近一个月生产数量排名";
const RightFourth: FC<{ height: string }> = (props) => {
  const chartRef = useRef<{ updateChart: Function }>(null);

  const [data, setData] = useState([
    { name: "数控角钢高速钻孔生产线-三菱1", count: 7415 },
    { name: "数控角钢高速钻孔生产线-三菱2", count: 6960 },
    { name: "数控角钢高速钻孔生产线-三菱3", count: 7263 },
    { name: "高速钻-台达", count: 7278 }
  ]);
  useEffect(() => {
    chartRef.current && chartRef.current.updateChart();
  }, [data]);


  return (
    <Border borderStyle={{ height: props.height }} title={title}>
      <HorizontalBarChart data={data} ref={chartRef}></HorizontalBarChart>
    </Border>
  );
};

export default RightFourth;
