import { FC } from "react";
import styles from "./index.less";

const title = "车间生产智能看板";

const Title: FC<{ name: string }> = ({ name }) => {
  return (
    <div className={styles.title} style={{ color: "@blue-3" }}>
      {name ?? title}
    </div>
  );
};

export default Title;
