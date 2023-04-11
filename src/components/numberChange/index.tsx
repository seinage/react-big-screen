import { FC } from 'react';
import './index.less';
import { Col, Row } from 'antd';
import upArrow from '@/assets/images/arrow/upArrow.svg';
import downArrow from '@/assets/images/arrow/downArrow.svg';

export interface NumberChangeSingle {
  text: string;
  percent: number;
  count: number;
  judgeUp?: number;
}

const NumberChange: FC<NumberChangeSingle> = ({
  text,
  percent,
  count,
  judgeUp,
}) => {
  return (
    <>
      <div className={'numberTitle'}>{text}</div>
      <Row style={{ alignItems: 'stretch' }}>
        <Col
          span={12}
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            display: 'flex',
          }}
        >
          <div className={'percent'}>{percent}%</div>
          <div>{count}</div>
        </Col>
        <Col span={12}>
          <img
            src={percent >= (judgeUp ?? 0) ? upArrow : downArrow}
            alt={'图片错误'}
          />
        </Col>
      </Row>
    </>
  );
};

export default NumberChange;
