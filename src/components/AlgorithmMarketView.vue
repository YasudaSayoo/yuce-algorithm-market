<template>
  <div class="p-5">
    <n-form
      ref="formRef"
      :model="model"
      require-mark-placement="right-hanging"
      label-placement="left"
      label-width="auto"
      size="small"
    >
      <!-- require-mark-placement="right-hanging" -->
      <n-form-item label="开奖:" path="kaiJiang">
        <n-radio-group v-model:value="model.gameId" name="radiogroup1">
          <n-radio v-for="r in kaiJiangRadios" :value="r.gameId">{{ r.label }}</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="方法:" path="method">
        <n-radio-group v-model:value="model.yuceInfoId" name="method">
          <n-radio v-for="m in methods" :value="m.yuceInfoId">{{ m.label }}</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="排序:" path="order">
        <n-radio-group v-model:value="model.order" name="order">
          <n-radio v-for="o in sorts" :value="o.order">{{ o.label }}</n-radio>
        </n-radio-group>
      </n-form-item>
    </n-form>

    <n-grid cols="1 s:2 m:3 l:4 xl:6 2xl:8" responsive="screen">
      <n-grid-item v-for="c in cards" :key="c.id">
        <n-card :title="c.sellName">
          <template #header-extra>
            <span>价格:</span>
            <n-tag size="small" :color="{ color: '#FFB800', textColor: 'white' }"
              >{{ c.sellInfo }}金币</n-tag
            >
          </template>
          <n-flex justify="space-between">
            <span class="text-xs">发布用户：{{ c.userId }}</span>
            <span class="text-xs">时间：{{ new Date(c.sellTime).toLocaleDateString() }}</span>
          </n-flex>
          <n-flex justify="space-between">
            <span class="text-xs">开奖：{{ c.gameName }}</span>
            <span class="text-xs">方法：{{ c.yuceInfoName }}</span>
          </n-flex>
          <n-flex class="mt-3" justify="space-between">
            <div>
              <span class="text-xs">20期命中率：</span>
              <n-tag size="small" :color="{ color: '#FF5722', textColor: 'white' }"
                >{{ c.rate }}%</n-tag
              >
            </div>
            <div>
              <span class="text-xs">200期命中率：</span>
              <n-tag size="small" :color="{ color: '#FF5722', textColor: 'white' }"
                >{{ c.toRate }}%</n-tag
              >
            </div>
          </n-flex>
          <n-flex justify="space-between">
            <div>
              <span class="text-xs">当前连中：</span>
              <n-tag size="small" :color="{ color: '#FF5722', textColor: 'white' }">{{
                c.lianZhong
              }}</n-tag>
            </div>
            <div>
              <span class="text-xs">当前连挂：</span>
              <n-tag size="small" :color="{ color: '#FF5722', textColor: 'white' }">{{
                c.lianShu
              }}</n-tag>
            </div>
          </n-flex>
          <n-flex class="mb-3" justify="space-between">
            <div>
              <span class="text-xs">最大连中：</span>
              <n-tag size="small" :color="{ color: '#FF5722', textColor: 'white' }">{{
                c.maxLianZhong
              }}</n-tag>
            </div>
            <div>
              <span class="text-xs">最大连挂：</span>
              <n-tag size="small" :color="{ color: '#FF5722', textColor: 'white' }">{{
                c.maxLianShu
              }}</n-tag>
            </div>
          </n-flex>
          <n-flex justify="end">
            <n-button type="info" size="small" @click="handlePreview(c)">预览</n-button>
          </n-flex>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-pagination
      v-model:page="model.pageIndex"
      class="justify-end"
      :page-count="Math.ceil(pageInfo.pageCount / pageInfo.pageSize)"
      :on-update:page="handleUpdatePage"
    />

    <n-modal
      v-model:show="showModal"
      transform-origin="center"
      preset="dialog"
      class="w-4/5!"
      title="Dialog"
      :loading="loading"
      :on-after-leave="handleCloseDialog"
    >
      <template #header>
        <div>预览算法</div>
      </template>
      <n-flex vertical>
        <n-flex class="items-center text-base">
          <span>游戏:</span>
          <n-radio-group v-model:value="modalPreviewState.gameId">
            <n-radio-button :label="modalPreviewState.gameName" :value="modalPreviewState.gameId" />
          </n-radio-group>
        </n-flex>
        <n-flex class="items-center text-base">
          <span>方法:</span>
          <n-radio-group v-model:value="modalPreviewState.yuceInfoId">
            <n-radio-button
              :label="modalPreviewState.yuceInfoName"
              :value="modalPreviewState.yuceInfoId"
            />
          </n-radio-group>
        </n-flex>
        <n-button type="info">刷新预测</n-button>

        <n-card class="text-center">
          <n-skeleton v-if="loading" text :repeat="2" />
          <template v-else>
            {{
              `总中：${pastForecastData.zhong}，总输：${pastForecastData.cuo}，连中：${pastForecastData.lianZhong}，连输：${pastForecastData.lianCuo}，最大连中：${pastForecastData.maxLianZhong}，最大连输：${pastForecastData.maxLianCuo}，盈利率：${pastForecastData.yingLiLv}`
            }}
          </template>
        </n-card>
        <!-- {{ pastForecastData.suanfaYuceInfoList[0] }} -->
        <n-data-table
          :columns="pastForecastColumns"
          :data="pastForecastData.suanfaYuceInfoList"
          :loading="loading"
          striped
        >
        </n-data-table>
      </n-flex>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, onUnmounted, reactive, ref, unref, watch } from 'vue'
import { AlgorithmResp } from '../types/Algorithm'
import { ForecastResp, SuanfaYuceInfo } from '../types/forecast'
import { NTag } from 'naive-ui'

type TagType = 'success' | 'error' | 'default' | 'primary' | 'info' | 'warning'

// 开奖
const kaiJiangRadios = ref([
  {
    gameId: null,
    label: '全部'
  },
  {
    gameId: 5,
    label: '加拿大28'
  },
  {
    gameId: 39,
    label: '宾果北京28'
  },
  {
    gameId: 64,
    label: '斯洛伐克28'
  }
])

const methods = ref([
  {
    yuceInfoId: null,
    label: '全部'
  },
  {
    yuceInfoId: 1,
    label: '组合'
  },
  {
    yuceInfoId: 2,
    label: '单双'
  },
  {
    yuceInfoId: 3,
    label: '大小'
  },
  {
    yuceInfoId: 4,
    label: '杀三余'
  },
  {
    yuceInfoId: 5,
    label: '杀四余'
  },
  {
    yuceInfoId: 6,
    label: '杀五余'
  },
  {
    yuceInfoId: 7,
    label: '杀组合'
  },
  {
    yuceInfoId: 9,
    label: '大小尾'
  },
  {
    yuceInfoId: 14,
    label: '杀一尾'
  },
  {
    yuceInfoId: 15,
    label: '双组'
  },
  {
    yuceInfoId: 16,
    label: '中边'
  },
  {
    yuceInfoId: 17,
    label: '波色'
  }
])

const sorts = ref([
  {
    order: 'new',
    label: '最新发布'
  },
  {
    order: 'price_asc',
    label: '价格最低'
  },
  {
    order: 'price_desc',
    label: '价格最高'
  },
  {
    order: 'rate_asc',
    label: '命中率最低'
  },
  {
    order: 'rate_desc',
    label: '命中率最高'
  },
  {
    order: 'lianZhong_asc',
    label: '当前连中最少'
  },
  {
    order: 'lianZhong_desc',
    label: '当前连中最多'
  },
  {
    order: 'lianShu_asc',
    label: '当前连挂最少'
  },
  {
    order: 'lianShu_desc',
    label: '当前连挂最多'
  },
  {
    order: 'maxLianZhong_asc',
    label: '最大连中最少'
  },
  {
    order: 'maxLianZhong_desc',
    label: '最大连中最多'
  },
  {
    order: 'maxLianShu_asc',
    label: '最大连挂最少'
  },
  {
    order: 'maxLianShu_desc',
    label: '最大连挂最多'
  }
])

const model = reactive({
  gameId: null,
  yuceInfoId: null,
  order: 'new',
  pageIndex: 1
})

const cards = ref<AlgorithmResp[]>([])

const pastForecastColumns = ref([
  {
    title: '期号',
    key: 'qihao'
  },
  {
    title: '开奖',
    key: 'kaijiang',
    render(row: SuanfaYuceInfo) {
      if (row.kaijiang === '0') {
        return '开奖中...'
      } else {
        return row.kaijiang?.match(/^\d+$/) ? row.kaijiang + '秒' : row.kaijiang
      }
    }
  },
  {
    title: '特码',
    key: 'yuceNum'
  },
  {
    title: '预测',
    key: 'content'
  },
  {
    title: '结果',
    key: 'shuying',
    render(row: SuanfaYuceInfo) {
      const { shuying, yuceNum } = row
      let type: TagType = shuying === undefined ? 'default' : shuying ? 'success' : 'error'

      return h(
        NTag,
        {
          type
        },
        {
          default: () => (shuying === undefined ? '----' : shuying ? '正确' : '错误')
        }
      )
    }
  }
])

const pastForecastData = reactive<ForecastResp>({
  count: 0,
  cuo: 0,
  lianCuo: 0,
  lianZhong: 0,
  maxLianCuo: 0,
  maxLianZhong: 0,
  suanfaYuceInfoList: [
    {
      content: '',
      gameId: 0,
      qihao: 0,
      yuceId: 0,
      yuceNum: '',
      kaijiang: '',
      shuying: undefined,
      time: undefined
    }
  ],
  yingLiLv: '',
  zhong: 0
})

const pageInfo = reactive({
  page: 1,
  pageSize: 16,
  pageCount: 1
})

// modal
const showModal = ref(false)

// preview algorithm
const modalPreviewState = reactive({
  gameId: 0,
  gameName: '',
  yuceInfoId: 0,
  yuceInfoName: ''
})

const loading = ref(true)

// limit
const countdown = ref(50)

const timer = ref<NodeJS.Timeout>()

onMounted(async () => {
  await fetchAlgorithmMarket()

  timer.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer.value !== null) {
    clearInterval(timer.value)
  }
})

watch([countdown, () => ({ ...model })], ([newCountdown, newModel], [oldCountdown, oldModel]) => {
  // console.log('newCountdown', newCountdown)
  // console.log('oldCountdown', oldCountdown)
  pastForecastData.suanfaYuceInfoList[0].kaijiang = String(countdown.value)

  console.log('new model', newModel)
  console.log('old model', oldModel)
  console.log('equals', newModel === oldModel)
  if (newModel !== oldModel) {
    fetchAlgorithmMarket()
  }
})

// fetchForecast
const fetchAlgorithmMarket = async () => {
  const data = unref(model)
  console.log('data', data)

  const filteredParams = Object.entries(data).filter(([_, v]) => v)
  console.log('filtered', filteredParams)
  const params = new URLSearchParams(filteredParams as string[][])

  // const params = new URLSearchParams()
  // params.append('gameId', data.gameId ?? '')
  // params.append('yuceInfoId', data.yuceInfoId ?? '')
  // params.append('order', data.order)
  // params.append('pageIndex', String(data.pageIndex))

  const url = `https://www.yuce2.com/api/custom/customSellSuanFas?${params}`
  console.log(url)

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ContentType: 'application/x-www-form-urlencoded',
      Token: token
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()
  if (json.success) {
    const algorithmsResp: AlgorithmResp[] = json.data
    cards.value = algorithmsResp
    pageInfo.pageCount = json.count
    console.log('page count', json.count)
  }
  console.log('json', json)
}

const handleUpdatePage = (page: number) => {
  // pageInfo.page = page
  model.pageIndex = page
  fetchAlgorithmMarket()
}

// 预览
const token = '7E8D5813C779F1723D1097B0FA211945'
const session = '69A525A97A7F82D8422DCB1AC76EDA17'
const handlePreview = async (card: AlgorithmResp) => {
  showModal.value = true

  const { customUid, gameId, gameName, yuceInfoId, yuceInfoName } = card

  modalPreviewState.gameId = gameId
  modalPreviewState.gameName = gameName
  modalPreviewState.yuceInfoId = yuceInfoId
  modalPreviewState.yuceInfoName = yuceInfoName

  // save open preview algorithm

  // return

  const url = `https://www.yuce2.com/api/custom/getCustomYuce`
  const params = new URLSearchParams()
  params.append('customUid', customUid)
  params.append('sellPreview', 'true')

  console.log('params', params)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ContentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      Token: token
      // 'Cookie': `JSESSIONID=${session}`
    },
    body: params
  })

  if (response.ok) {
    const data = await response.json()
    console.log('data', data)

    Object.assign(pastForecastData, JSON.parse(data.data.list))
    loading.value = false

    // timeout
    const timeUrl = `https://www.yuce2.com/api/gameInfo/time/${gameId}`
    const timeResp = await fetch(timeUrl, {
      method: 'get'
    })
    if (timeResp.ok) {
      const limit = await timeResp.json()
      console.log('timeResp', limit)
      countdown.value = limit
      // pastForecastData.suanfaYuceInfoList[0].kaijiang = String(countdown.value)
      // pastForecastData.suanfaYuceInfoList[0].kaijiang = String(countdown.value)
    }
  }
}

// close dialog
const handleCloseDialog = () => {
  loading.value = true
  pastForecastData.suanfaYuceInfoList = [
    {
      content: '',
      gameId: 0,
      qihao: 0,
      yuceId: 0,
      yuceNum: '',
      kaijiang: '',
      shuying: undefined,
      time: undefined
    }
  ]
}
</script>

<style scoped></style>
