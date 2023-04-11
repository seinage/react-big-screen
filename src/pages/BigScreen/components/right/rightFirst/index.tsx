import { FC, useState } from 'react';
import Border from '@/components/border';
import { Col, Row } from 'antd';
import NumberChange, { NumberChangeSingle } from '@/components/numberChange';

const RightFirst: FC<{ height: string }> = (props) => {
  const [numberList, setNumberList] = useState<NumberChangeSingle[]>([
    { text: '昨日任务完成率', percent: 96, count: 10, judgeUp: 95 },
    { text: '昨日完成数', percent: 93, count: 623, judgeUp: 95 },
  ]);
  return (
    <Border borderStyle={{ height: props.height,marginBottom:'5%' }}>
      <Row gutter={16} style={{ justifyContent: 'space-around' }}>
        {numberList.map(({ text, percent, count, judgeUp }, idx) => (
          <Col span={'9'} key={idx}>
            <NumberChange
              text={text}
              percent={percent}
              count={count}
              judgeUp={judgeUp}
            ></NumberChange>
          </Col>
        ))}
      </Row>
    </Border>
  );
};

export default RightFirst;
