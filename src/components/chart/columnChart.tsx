import { FC, forwardRef, useImperativeHandle, useRef } from "react";
import { echarts } from "@/plugins";
import { ECBasicOption } from "echarts/types/dist/shared";

const ColumnChart = forwardRef<any,
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
          xAxis: [
            {
              data: xData
            }
          ],
          series: [
            {
              data: yData
            }
          ]
        };
      } else {
        options = {
          // 工具提示
          tooltip: {
            // 触发类型  经过轴触发axis  经过轴触发item
            trigger: "item",
            // 轴触发提示才有效
            axisPointer: {
              // 默认为直线，可选为：'line' 线效果 | 'shadow' 阴影效果
              type: "shadow"
            }
          },
          // 图表边界控制
          grid: {
            // 距离 上右下左 的距离
            left: "0",
            right: "3%",
            bottom: "3%",
            top: "12%",
            // 大小是否包含文本【类似于boxsizing】
            containLabel: true,
            //显示边框
            show: true,
            //边框颜色
            borderColor: "rgba(0, 240, 255, 0.3)"
          },
          // 控制x轴
          xAxis: [
            {
              // 使用类目，必须有data属性
              type: "category",
              // 使用 data 中的数据设为刻度文字
              data: xData,
              // 刻度设置
              axisTick: {
                // true意思：图形在刻度中间
                // false意思：图形在刻度之间
                alignWithLabel: false,
                show: false
              },
              //文字
              axisLabel: {
                color: "#4c9bfd",
                fontSize: 8,
                width: 36,
                overflow: "break",
                interval: 0
              }
            }
          ],
          // 控制y轴
          yAxis: [
            {
              // 使用数据的值设为刻度文字
              type: "value",
              axisTick: {
                // true意思：图形在刻度中间
                // false意思：图形在刻度之间
                alignWithLabel: false,
                show: false
              },
              //文字
              axisLabel: {
                color: "#4c9bfd",
                fontSize: 10
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(0, 240, 255, 0.3)"
                }
              }
            }
          ],
          // 控制x轴
          series: [
            {
              // 颜色
              itemStyle: {
                // 提供的工具函数生成渐变颜色
                color: new echarts.graphic.LinearGradient(
                  // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: "#00fffb" }, // 0 起始颜色
                    { offset: 1, color: "#0061ce" } // 1 结束颜色
                  ]
                )
              },
              // 图表数据名称
              // name: "用户统计",
              // 图表类型
              type: "bar",
              // 柱子宽度
              barWidth: "60%",
              // 数据
              data: yData,
              label: {
                show: true,
                position: "top",
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
      <>
        <div
          ref={chartRef}
          style={{ width: "100%", height: "100%", letterSpacing: 0 }}
        ></div>
      </>
    );
  }
);

export default ColumnChart;
