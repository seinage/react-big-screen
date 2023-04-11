import React from "react";
import MiddleFirst from "@/pages/BigScreen/components/middle/middleFirst";
import MiddleSecond from "@/pages/BigScreen/components/middle/middleSecond";
import { MiddleData } from "@/type/middle";

const height = {
  first: 62.5,
  second: 36
};
export default function Middle(props: { data:MiddleData }) {
  const { first, second } = height;
  return (
    <>
      <MiddleFirst height={`${first}%`}></MiddleFirst>
      <MiddleSecond height={`${second}%`} data={props.data.second}></MiddleSecond>
    </>
  );
}
