import { forwardRef, useImperativeHandle, useRef } from "react";
import { ECOption } from "@/plugins/echarts";
import { dayJs, echarts } from "@/plugins";


function createXData(count = 7) {
  const today = dayJs();
  const xData: string[] = [];
  for (let i = 0; i < count; i++) {
    xData.unshift(today.subtract(i, "day").format("MM-DD"));
  }
  return xData;
}

const DateLineChart = forwardRef<any, { xData: string[], data1: number[], data2: number[] }>((props, ref) => {
  const chartRef = useRef<null | HTMLDivElement>(null);
  let chart: echarts.ECharts;
  useImperativeHandle(ref, () => ({
    updateChart: createChart
  }));

  function createChart() {
    let options: ECOption;

    const { xData, data1, data2 } = props;

    if (chart) {
      options = {
        xAxis: { data: xData },
        series: [{ data: data1 }, { data: data2 }]
      };
    } else {
      options = {
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: xData,
          axisTick: {
            show: false //去除刻度线
          },
          axisLabel: {
            color: "#4c9bfd", //文本颜色
            fontSize: 8
          },
          axisLine: {
            show: false //去除轴线
          },
          boundaryGap: false //去除轴内间距
        },
        yAxis: {
          // 数据作为刻度文字
          type: "value",
          axisTick: {
            show: false //去除刻度线
          },
          axisLabel: {
            color: "#4c9bfd", //文本颜色
            fontSize: 8
          },
          axisLine: {
            show: false //去除轴线
          },
          boundaryGap: false, //去除轴内间距
          splitLine: {
            lineStyle: {
              color: "rgba(0, 240, 255, 0.3)"
            }
          }
        },
        legend: {
          textStyle: {
            color: "#4c9bfd", // 图例文字颜色
            fontSize: 8
          },
          itemWidth: 10,
          itemHeight: 5,
          itemStyle: {
            borderWidth: 1
          },
          lineStyle: {
            width: 1
          },
          right: "3%" //距离右边10%
        },
        grid: {
          show: true, // 显示边框
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          borderColor: "#012f4a", // 边框颜色
          containLabel: true // 包含刻度文字在内
        },
        series: [
          {
            name: "合格数量",
            // 数据
            data: data1,
            // 图表类型
            type: "line",
            // 圆滑连接
            smooth: false,
            itemStyle: {
              color: "#00f2f1", // 线颜色
              borderWidth: 1
            },
            lineStyle: {
              width: 0.5
            }
          },
          {
            name: "不合格数量",
            // 数据
            data: data2,
            // 图表类型
            type: "line",
            // 圆滑连接
            smooth: false,
            itemStyle: {
              color: "#ed3f35", // 线颜色
              borderWidth: 1
            },
            lineStyle: {
              width: 0.5
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

export default DateLineChart;
