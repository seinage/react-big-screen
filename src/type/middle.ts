export interface MiddleData {
  first: MiddleFirstData,
  second: MiddleSecondData
}

export interface MiddleFirstData {

}

export type MiddleSecondData = Record<string, number>
