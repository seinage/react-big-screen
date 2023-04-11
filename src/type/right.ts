export interface RightData {
  first: RightFirstData,
  second: RightSecondData,
  third: RightThirdData
}

export interface RightFirstData {

}

export type RightSecondData = {
  time: string
  workCount: number
  inspectCount: number
}[]

export interface RightThirdData {
  left:number[]
  right:number[]
}
