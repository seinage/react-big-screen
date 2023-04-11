import { Component, CSSProperties, FC } from 'react';
import styles from './index.less';

/**
 * border通用组件
 * @param borderStyle border覆写样式，主要包含height
 * @param innerStyle inner覆写样式，主要包含height
 * @param title border标题
 * @param children 内容
 * @returns {JSX.Element}
 * @constructor
 */
const Border: FC<{
  borderStyle: CSSProperties;
  innerStyle?: CSSProperties;
  title?: string;
}> = ({ borderStyle, innerStyle, title, children }): JSX.Element => {
  return (
    <div className={styles.border} style={borderStyle}>
      <div className={styles.inner} style={innerStyle}>
        {title ? <div className={styles.title}>{title}</div> : undefined}
        {children}
      </div>
    </div>
  );
};

export default Border;
