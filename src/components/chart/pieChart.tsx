/*
 * @Description 饼图
 * created by cuijie on 2023/2/3
*/
import { FC, forwardRef, useImperativeHandle, createRef ,useState,useEffect} from "react";
import { ECBasicOption } from "echarts/types/dist/shared";
import { echarts } from "@/plugins";

const PieChart= forwardRef<any,
  { data: { name: string, value: number }[],colorList?:string[] }>(
  (props, ref) => {
    const chartRef = createRef<HTMLDivElement>();
    let chart:echarts.ECharts
    useImperativeHandle(ref, () => ({
      updateChart
    }));
    const updateChart=()=> {
      let options: ECBasicOption;
      const { data } = props

      if (chart) {
        options = {
          series: [
            {
              name: "数量",
              data,
            },
          ],
        };
      } else {
        options = {
          title: {
            show: false,
            text: "Referer of a Website",
            subtext: "Fake Data",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            show: true,
            orient: "vertical",
            itemGap:
              50 / (data.length - 1 > 0 ? data.length - 1 : 1) -
              1,
            itemWidth: 10,
            itemHeight: 5,
            align: "left",
            textStyle: {
              color: "#4c9bfd",
              fontSize: 6,
            },
            right: 0,
            top: 0,
            bottom: 0,
            padding: 1,
            // left: "left",
          },

          series: [
            {
              name: "数量",
              type: "pie",
              radius: "75%",
              data: data,
              label: {
                color: "white",
                fontSize: 6,
                show: false,
                position: "inside",
                formatter: "{c}",
              },
              color: props.colorList,
              right: 30,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        chart = echarts.init(chartRef.current!);
      }
      chart && options && chart.setOption(options);
    }

    return (<>
        <div
      ref={chartRef}
      style={{ width: "100%", height: "100%", letterSpacing: 0 }}
    ></div>
    </>

    );
  });

export default PieChart;
