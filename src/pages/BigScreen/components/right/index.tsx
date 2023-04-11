import React from "react";
import RightFirst from "@/pages/BigScreen/components/right/rightFirst";
import RightSecond from "@/pages/BigScreen/components/right/rightSecond";
import RightThird from "@/pages/BigScreen/components/right/rightThird";
import RightFourth from "@/pages/BigScreen/components/right/rightFourth";
import { RightData } from "@/type/right";

const height = {
  first: 15,
  second: 45.5,
  third: 32.5,
  fourth: 35
};
export default function Right(props: { data: RightData }) {
  const { first, second, third, fourth } = height;
  return (
    <>
      <RightFirst height={`${first}%`}></RightFirst>
      <RightSecond height={`${second}%`} data={props.data.second}></RightSecond>
      <RightThird height={`${third}%`} data={props.data.third}></RightThird>
      {/*<RightFourth height={`${fourth}%`}></RightFourth>*/}
    </>
  );
}
