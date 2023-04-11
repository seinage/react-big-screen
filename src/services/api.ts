/*
 * @Description 接口入口文件
 * created by cuijie on 2023/4/6
*/
import { request } from "@/plugins";

const { get, post } = request;

type Res<T = any> = Promise<{
  code: number;
  data: T;
  message: string | null;
}>

type ResList<T> = Res<{ records: T[], total: number }>

interface User {
  id: number;
  name: string;
}

interface ProgressOrder {
  id: number;
  orderNo: string;
  progress: number;
}

type TaskCount = Record<string, number>

interface WeldingAlarm {
  content: string;
  time: string;
  type: string;
  id: number;
  equipmentCode: number;
  orderNo: string;
  pictureNo: string;
  pieceNo: string;
  weldingRoadId: number;
  weldingSewId: number;
  workerId: number;
  codeEquipmentCode: string;
}

interface Inspection {
  id?: number; // id
  orderNo?: string; // 工单号
  name?: string; // 名称
  pictureNo?: string; // 令号
  pictureNoName?: string; // 页面展示的令号
  pieceNo?: string;
  content?: string;
  inspectNum?: number; // 检验数量
  tungstenDiameter?: number; // 钨极直径
  current?: number; // 电流强度
  argonFlow?: number; // 氩气流量
  backArgonFlow?: number; // 背面氩气流量
  weldingTime?: Date; // 焊接时间
  qualifiedNum?: number;// 合格数量
  operator?: number; // 操作者
  inspector?: number; // 检验员
  inspectTime?: string; // 检验时间
  remark?: string; // 备注
  wireUseIds?: string; // 焊丝id列表，实际须转化为 number[]
}

interface EquipStatus {
  equipmentCount: number;
  collectorOnlineIds: number[];
  equipmentOnlineIds: number[];
  collectorCount: number;
}

const api = {
  queryTime: () => get("data/time") as unknown as Res<number>,

  queryEquipStatus: () => get("data/status") as unknown as Res<EquipStatus>,

  queryUserList: () => get("api/user/list") as unknown as ResList<User>,

  queryProgressOrder: () => get("api/progress/order") as unknown as Res<ProgressOrder[]>,

  queryTaskCount: () => get("data/taskCount") as unknown as Res<TaskCount>,

  queryWeldingAlarm: (urlParams: {
    timeMin: string,
    timeMax: string,
  }) => get("data/weldingAlarm", { urlParams: { ...urlParams, desc: true } }) as unknown as Res<WeldingAlarm[]>,

  queryInspectList: (urlParams: {
    weldingTime: [string, string]
  }) => get("api/inspect/list", { urlParams }) as unknown as ResList<Inspection>


};
export default api;
