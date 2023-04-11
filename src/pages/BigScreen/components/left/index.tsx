import { FC, PureComponent } from "react";
import LeftFirst from "@/pages/BigScreen/components/left/leftFirst";
import LeftSecond from "@/pages/BigScreen/components/left/leftSecond";
import LeftThird from "@/pages/BigScreen/components/left/leftThird";
import { LeftData } from "@/type/left";

const height = {
  first: 10,
  second: 47,
  third: 35
};

const Left: FC<{
  data: LeftData
}> =
  (props) => {
    const { first, second, third } = height;

    return (
      <>
        <LeftFirst height={`${first}%`} data={props.data.first}></LeftFirst>
        <LeftSecond height={`${second}%`} data={props.data.second}></LeftSecond>
        <LeftThird height={`${third}%`} data={props.data.third}></LeftThird>
      </>
    );
  };

export default Left;
