import { CSSProperties, FC, useState } from "react";
import Border from "@/components/border";
import { Col, Row } from "antd";
import NumberCard from "@/components/numberCard";
import { LeftFirstData } from "@/type/left";

const borderStyle: CSSProperties = {};

interface NumberSingle {
  count: number;
  desc: string;
  color: CSSProperties["color"];
}

/**
 * 左侧第一区块内容
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const LeftFirst: FC<{
  height: string, data: LeftFirstData
}> = (props) => {
  const { equipmentCount, onlineCount } = props.data;

  const numberList = [
    { count: equipmentCount, desc: "设备总数", color: undefined },
    { count: onlineCount, desc: "设备在线", color: "@green-3" },
    { count: equipmentCount - onlineCount, desc: "设备离线", color: undefined }
  ];
  /*const [numberList, setNumberList] = useState<NumberSingle[]>([
    { count: 46, desc: "设备总数", color: undefined },
    { count: 24, desc: "设备在线", color: "@green-3" },
    { count: 2423, desc: "设备离线", color: undefined }
  ]);*/

  return (
    <Border borderStyle={{ ...borderStyle, height: props.height, marginBottom: "5%" }}>
      <Row gutter={16} style={{ justifyContent: "space-between" }}>
        {numberList.map(({ count, desc, color }, idx) => (
          <Col span={"7"} key={idx}>
            <NumberCard count={count} desc={desc} color={color}></NumberCard>
          </Col>
        ))}
      </Row>
    </Border>
  );
};

export default LeftFirst;
