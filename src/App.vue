<template>
  <!-- <n-layout class="h-screen flex flex-col" position="absolute">
    <n-layout-header class="h-20" bordered> Header Header Header </n-layout-header>
    <n-layout class="flex-1 flex" position="absolute" has-sider>
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
      >
        <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
      </n-layout-sider>
      <div class="flex-1 overflow-auto"></div>
    </n-layout>
    <n-layout-footer bordered position="absolute"> Footer Footer Footer </n-layout-footer>
  </n-layout> -->
  <n-layout class="h-screen">
    <n-layout-header class="h-[30px]" bordered> aaaa </n-layout-header>
    <n-layout position="absolute" class="top-[30px]! bottom-[30px]!" has-sider>
      <n-layout-sider
        :native-scrollbar="false"
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        bordered
      >
        <!-- <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" /> -->
        <n-menu :options="menuOptions" :default-expanded-keys="defaultExpandedKeys" accordion />
      </n-layout-sider>
      <n-layout :native-scrollbar="false">
        <pre
          >{{ model }}
        </pre>
        <n-form ref="formRef" :model="model" label-placement="left" label-width="auto" size="small">
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

          <n-button type="primary" @click="fetchAlgorithmMarket"> Primary </n-button>
        </n-form>

        <n-card title="卡片"> 卡片内容 </n-card>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" class="h-[30px]" bordered> 城府路 </n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { MenuOption, NIcon } from 'naive-ui'
import { Home as HomeIcon, DigitalOcean as OceanIcon, ShoppingCart as CartIcon } from '@vicons/fa'
// import { RouterLink } from 'vue-router'

import { defineComponent, h, ref, toRaw, unref } from 'vue'
import { RouterLink } from 'vue-router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  // {
  //   label: () =>
  //     h(
  //       RouterLink,
  //       {
  //         to: {
  //           name: 'home',
  //           params: {
  //             lang: 'zh-CN'
  //           }
  //         }
  //       },
  //       { default: () => '回家' }
  //     ),
  //   key: 'go-back-home',
  //   icon: renderIcon(HomeIcon)
  // },
  {
    label: '自定义算法',
    key: 'diy-algorithm',
    icon: renderIcon(OceanIcon),
    children: [
      {
        label: '添加自定义算法',
        key: 'add-algorithm'
      },
      {
        label: '算法交易市场',
        key: 'algorithm-market'
      }
    ]
  },
  {
    label: '走势、趋势',
    key: 'trend',
    // icon: renderIcon(PawIcon),
    children: [
      {
        label: '趋势图',
        key: 'trend-chart'
      },
      {
        label: '走势图',
        key: 'trend-table'
      }
    ]
  }
]

const defaultExpandedKeys = ref('diy-algorithm')

// 开奖
const kaiJiangRadios = ref([
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

const model = ref({
  gameId: 5,
  yuceInfoId: null
})

const fetchAlgorithmMarket = async () => {
  const data = unref(model)
  console.log('data', data)

  const params = new URLSearchParams()
  params.append('gameId', String(data.gameId))
  params.append('yuceInfoId', data.yuceInfoId ?? '')
  // for (const key in data) {
  //   if (Object.prototype.hasOwnProperty.call(data, key)) {
  //     console.log(key, data[key])
  //   }
  // }
  const url = `https://www.yuce2.com/api/custom/customSellSuanFas?${params}`
  console.log(url)

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()
  console.log('json', json)
}

// export default defineComponent({
//   setup() {
//     return {
//       menuOptions,
//       defaultExpandedKeys: ['diy-algorithm']
//     }
//   }
// })
</script>
