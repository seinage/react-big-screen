export interface LeftData {
  first: LeftFirstData,
  second: LeftSecondData,
  third: LeftThirdData,
}

export interface LeftFirstData {
  equipmentCount: number;
  onlineCount: number;
}

export type LeftSecondData = {
  order: number
  orderNo: string
  progress: string
  state: number
}[]

export type LeftThirdData = {
  codeEquipmentCode: string;
  time: string;
  content: string;
}[]
