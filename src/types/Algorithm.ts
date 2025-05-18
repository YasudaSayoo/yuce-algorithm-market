export interface AlgorithmResp {
  id: number
  userId: number
  name: string
  sellName: string
  gameId: number
  yuceInfoId: number
  sellGameId: number
  sellYuceInfoId: number
  gameName: string
  yuceInfoName: string
  zhong: number
  shu: number
  lianZhong: number
  lianShu: number
  maxLianZhong: number
  maxLianShu: number
  rate: number
  toRate: number
  sell: boolean
  customUid: string
  saveTime: number
  sellTime: number
  sellInfo: number
  buyNum: number
  buyTime: number | null
  expireTime: number | null
  sellExpireTime: number | null
  sellStatus: string | null
}
