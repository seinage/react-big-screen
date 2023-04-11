import { FC, useEffect, useRef } from "react";
import MapChart from "@/components/chart/mapChart";

const MiddleFirst:FC<{height: string}> = (props) => {
  const chartRef = useRef<{ updateChart: Function }>();
  useEffect(() => {
    chartRef.current && chartRef.current.updateChart();
  }, []);
 return (
  <>
   <div style={{height:props.height}}>
     <MapChart ref={chartRef}></MapChart>
   </div>
  </>
 );
};

export default MiddleFirst;
