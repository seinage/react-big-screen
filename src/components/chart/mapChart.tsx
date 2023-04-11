import { forwardRef, useImperativeHandle, useRef } from "react";
import { echarts } from "@/plugins";
import { ECBasicOption } from "echarts/types/dist/shared";
import { series } from "./mapData";

const MapChart = forwardRef<any,
  {}>((props, ref) => {
  const chartRef = useRef<null | HTMLDivElement>(null);
  let chart: echarts.ECharts;
  useImperativeHandle(ref, () => ({
    updateChart: createChart
  }));

  function createChart() {
    let options: ECBasicOption;
    if (chart) {
      options = {};
    } else {
      options = {
        backgroundColor: "#080a20",
        title: {
          left: "left",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          show: false,
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          show: false,
          top: "bottom",
          left: "right",
          data: ["北京 Top10", "上海 Top10", "广州 Top10"],
          textStyle: {
            color: "#fff"
          },
          selectedMode: "single"
        },
        geo: {
          map: "china",
          zoom: 1.2,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#142957",
              borderColor: "#0692a4"
            },
            emphasis: {
              areaColor: "#0b1c2d"
            }
          }
        },
        series: series
      };
      chart = echarts.init(chartRef.current!);
    }

    chart && options && chart.setOption(options);
  }

  return (
    <div
      ref={chartRef}
      style={{ width: "100%", height: "100%", letterSpacing: 0 }}
    ></div>
  );
});
export default MapChart;
