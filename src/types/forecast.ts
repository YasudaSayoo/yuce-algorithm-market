export interface ForecastResp{
  count: number
  cuo: number
  lianCuo: number
  lianZhong: number
  maxLianCuo: number
  maxLianZhong: number
  suanfaYuceInfoList: SuanfaYuceInfo[]
  yingLiLv: string
  zhong: number
}

export interface SuanfaYuceInfo {
  content: string
  gameId: number
  qihao: number
  yuceId: number
  yuceNum: string
  kaijiang?: string
  shuying?: boolean
  time?: number
}

