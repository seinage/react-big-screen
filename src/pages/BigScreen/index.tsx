import { FC, useEffect, useState } from "react";
import styles from "./index.less";
import Title from "@/pages/BigScreen/components/title";
import api from "@/services/api";
import { Col, message, Row } from "antd";
import Left from "@/pages/BigScreen/components/left";
import Middle from "@/pages/BigScreen/components/middle";
import Right from "@/pages/BigScreen/components/right";
import { LeftData, LeftFirstData, LeftSecondData, LeftThirdData } from "@/type/left";
import { dayJs } from "@/plugins";
import leftThird from "@/pages/BigScreen/components/left/leftThird";
import { MiddleFirstData, MiddleSecondData } from "@/type/middle";
import { RightFirstData, RightSecondData, RightThirdData } from "@/type/right";


const title = "车间生产智能看板";

// 大屏宽高基本参数
const baseWidth = 1920;
const baseHeight = 1200;
const fontSize = baseWidth / 100 + "px";


const BigScreen: FC = (props) => {
    const [scale, setScale] = useState([1, 1]);

    const [time, setTime] = useState(dayJs());


    const [leftFirstData, setLeftFirstData] =
      useState<LeftFirstData>({
        equipmentCount: 0,
        onlineCount: 0
      });
    const [leftSecondData, setLeftSecondData] = useState<LeftSecondData>([]);
    const [leftThirdData, setLeftThirdData] = useState<LeftThirdData>([]);

    const [middleFirstData, setMiddleFirstData] = useState<MiddleFirstData>({});
    const [middleSecondData, setMiddleSecondData] = useState<MiddleSecondData>({});

    const [rightFirstData, setRightFirstData] = useState<RightFirstData>({});
    const [rightSecondData, setRightSecondData] = useState<RightSecondData>([]);
    const [rightThirdLeftData, setRightThirdLeftData] = useState<RightThirdData["left"]>([0, 0]);
    const [rightThirdRightData, setRightThirdRightData] = useState<RightThirdData["right"]>([0, 0, 0]);

    const fetchTime = () => {
      api.queryTime().then(({ code, data }) => {
        if (code === 0) {
          setTime(dayJs(data));
          fetchData();
        }
      });
    };

    const fetchData = () => {
      fetchEquipStatus();
      fetchOrderList();
      fetchAlarmList();
      fetchTask();
      fetchInspectList();
    };

    const fetchEquipStatus = () => {
      api.queryEquipStatus().then(({ code, data }) => {
        if (code === 0) {
          const { equipmentCount, equipmentOnlineIds } = data;
          setLeftFirstData({
            equipmentCount,
            onlineCount: equipmentOnlineIds.length
          });
          setRightThirdLeftData([equipmentOnlineIds.length, equipmentCount - equipmentOnlineIds.length]);
        }
      });
    };

    const fetchOrderList = () => {
      api.queryProgressOrder().then(({ code, data }) => {
        if (code === 0) {
          const newData = data.reverse().slice(0, 20)
            .map((x, i: number) => {
              const { orderNo } = x;
              const progress = Math.max(0, Math.min(1, x.progress ?? 0)) * 100;
              return {
                order: i + 1,
                orderNo,
                progress: progress.toFixed(2) + " %",
                state: progress <= 0 ? 0 : (progress >= 100 ? 2 : 1)
              };
            });
          setLeftSecondData(newData);
        }
      });
    };

    const fetchAlarmList = () => {
      api.queryWeldingAlarm({
        timeMin: time.startOf("date").format("YYYY-MM-DD HH:mm:ss"),
        timeMax: time.endOf("date").format("YYYY-MM-DD HH:mm:ss")
      }).then(({ code, data }) => {
        if (code === 0) {
          const newData = data.map(value => ({
            content: value.content,
            time: dayJs(value.time).format("HH:mm"),
            codeEquipmentCode: value.codeEquipmentCode
          }));
          setLeftThirdData(newData);
        }
      });
    };

    const fetchTask = () => {
      api.queryTaskCount().then(({ code, data }) => {
        if (code === 0) {
          setMiddleSecondData(data);
        }
      });
    };

    const fetchInspectList = () => {
      const weldingTimeBase = [time.subtract(7, "day").startOf("date"), time.endOf("date")];
      api.queryInspectList({
        weldingTime: weldingTimeBase.map(v => v.format("YYYY-MM-DD HH:mm:ss")) as [string, string]
      }).then(({ code, data }) => {
        if (code === 0) {
          const dataList: RightSecondData = Array(7).fill("")
            .map((x, i: number) => ({
              time: time.subtract(i, "day").format("MM-DD"),
              workCount: 0,
              inspectCount: 0
            })).reverse();
          data.records.forEach(({
                                  weldingTime,
                                  qualifiedNum, inspectNum
                                }) => {
            const curDate = dayJs(weldingTime).format("MM-DD");
            const idx = dataList.findIndex(v => v.time === curDate);
            if (idx !== -1) {
              dataList[idx].workCount += inspectNum ?? 0;
              dataList[idx].inspectCount += (qualifiedNum ?? (inspectNum ?? 0));
            }
          });

          setRightSecondData(dataList);

          const lastDayData = dataList[dataList.length - 2];
          setRightThirdRightData([lastDayData.inspectCount, lastDayData.workCount - lastDayData.inspectCount]);

        }
      });
    };


    useEffect(() => {
      setResize();
      fetchTime();
    }, []);

    const [messageApi,contextHolder] = message.useMessage();


    function setResize() {
      const html = document.body; // 获取html
      // 计算scale
      const setFont = () => {

        // 获取宽度
        const width = html.clientWidth;
        const height = html.clientHeight;
        // html.style.fontSize = width / 100 + "px";
        setScale([width / baseWidth, height / baseHeight]);
        /*setTimeout(() => {
          messageApi.open({
            type: "success",
            content: `width ${width}  height ${height}  scale ${width / baseWidth}    ${height / baseHeight} `,
            duration: 100
          });
        }, 2000);*/

      };
      setFont();
      document.onkeyup = (event) => {
        if (event.code === "Enter") {
          fullScreen();
        }
      };

      window.onresize = () => {
        setFont();
      };

    };

    return (
      <div className={styles.container}
           style={{
             width: `${baseWidth}px`,
             height: `${baseHeight}px`,
             transformOrigin: "0 0",
             transform: `scale(${scale[0]},${scale[1]})`,
             fontSize: fontSize
           }}>
        <Title name={title}></Title>
        {contextHolder}
        <div className={styles.main}>
          <Row style={{
            width: "100%",
            justifyContent: "space-between"
          }}>
            <Col className={styles.left} span={7}>
              <Left data={{ first: leftFirstData, second: leftSecondData, third: leftThirdData }}></Left>
            </Col>
            <Col className={styles.middle} span={10}>
              <Middle data={{ first: middleFirstData, second: middleSecondData }}></Middle>
            </Col>
            <Col className={styles.right} span={7}>
              <Right data={{
                first: rightFirstData,
                second: rightSecondData,
                third: { left: rightThirdLeftData, right: rightThirdRightData }
              }}></Right>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
;
export default BigScreen;


const refreshTime = 1000 * 60 * 10;


/*$(document).keydown(function (event) {
  if (event.keyCode === 13) {
    fullScreen();
  }
});*/

function fullScreen() {
  const doc = document as any;
  const fullEle = document.body as any;
  if (
    !doc.fullscreenElement &&
    !doc.mozFullScreenElement &&
    !doc.webkitFullscreenElement &&
    !doc.msFullscreenElement
  ) {
    const ele = Element as any;
    if (doc.documentElement.requestFullscreen) {
      // doc.documentElement.requestFullscreen()
      fullEle.requestFullscreen().catch((v: any) => {
        console.log(v);
      });
    } else if (doc.documentElement.mozRequestFullScreen) {
      fullEle.mozRequestFullScreen();
    } else if (doc.documentElement.webkitRequestFullscreen) {
      fullEle.webkitRequestFullscreen(ele.ALLOW_KEYBOARD_INPUT);
    } else if (doc.documentElement.msRequestFullscreen) {
      fullEle.msRequestFullscreen(ele.ALLOW_KEYBOARD_INPUT);
    }
  } else if (doc.cancelFullScreen) {
    doc.cancelFullScreen();
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen();
  } else if (doc.webkitCancelFullScreen) {
    doc.webkitCancelFullScreen();
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen();
  }
}
