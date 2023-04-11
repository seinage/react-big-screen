/*
 * @Description 水平条形图
 * created by cuijie on 2023/2/2
*/
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ECOption } from "@/plugins/echarts";
import { echarts } from "@/plugins";
import { ECBasicOption } from "echarts/types/dist/shared";


const HorizontalBarChart = forwardRef<any,
  { data: { name: string, count: number }[] }>(
  (props, ref) => {
    const chartRef = useRef<null | HTMLDivElement>(null);
    let chart: echarts.ECharts;
    useImperativeHandle(ref, () => ({
      updateChart: createChart
    }));

    function createChart() {
      const xData = props.data.map(value => value.name);
      const yData = props.data.map(value => value.count);
      let options: ECBasicOption;
      if (chart) {
        options = {
          yAxis: { data: xData },
          series: [{ data: yData }]
        };
      } else {
        options = {
          title: {
            show: false
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: { show: false },
          grid: {
            left: "0",
            right: "6%",
            bottom: "3%",
            top: "5%",
            containLabel: true
          },
          xAxis: {
            type: "value",
            axisLabel: {
              color: "#4c9bfd", //文本颜色
              fontSize: 8
            },
            boundaryGap: [0, 0.01],
            splitLine: {
              lineStyle: {
                color: "rgba(0, 240, 255, 0.3)"
              }
            }
          },
          yAxis: {
            type: "category",
            axisLabel: {
              color: "#4c9bfd", //文本颜色
              fontSize: 8,
              interval: 0,
              // align:"left",
              width: 50,

              overflow: "truncate"
            },
            data: xData
          },
          series: [
            {
              type: "bar",
              itemStyle: {
                // 提供的工具函数生成渐变颜色
                // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
                  { offset: 0, color: "#00fffb" }, // 0 起始颜色
                  { offset: 1, color: "#0061ce" } // 1 结束颜色
                ])
              },
              // 柱子宽度
              barWidth: "60%",
              data: yData,
              label: {
                show: true,
                position: "right",
                color: "#00fffb"
              }
            }
          ]
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

export default HorizontalBarChart;

