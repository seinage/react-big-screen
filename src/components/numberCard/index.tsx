import { CSSProperties, FC } from "react";
import styles from "./index.less";

const NumberCard: FC<{
  count: number;
  desc: string;
  color: CSSProperties['color'];
}> = (props) => {
  return (
    <>
      <div className={styles.count}>{props.count}</div>
      <div className={styles.desc}>
        <span
          className={'icon iconfont icon-dot'}
          style={{ color: props.color }}
        ></span>
        <span className={styles.text}>{props.desc}</span>
      </div>
    </>
  );
};

export default NumberCard;
