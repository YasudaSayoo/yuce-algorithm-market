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
    <n-layout-header class="h-[30px]" bordered>预测</n-layout-header>
    <n-layout position="absolute" class="top-[30px]!" has-sider>
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
        <!-- 路由内容显示区域 -->
        <n-message-provider>
          <n-dialog-provider>
            <router-view />
          </n-dialog-provider>
        </n-message-provider>
        <!-- <router-view /> -->
      </n-layout>
    </n-layout>
    <!-- <n-layout-footer position="absolute" class="h-[30px]" bordered> 城府路 </n-layout-footer> -->
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
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/login'
          }
        },
        { default: () => '登录' }
      ),
    key: 'login'
  },
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
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/algorithm-market'
              }
            },
            { default: () => '算法交易市场' }
          ),
        key: 'algorithm-market'
      }
    ]
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/forecast'
          }
        },
        { default: () => '算法预测' }
      ),
    key: 'forecast',
    icon: renderIcon(CartIcon)
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

// export default defineComponent({
//   setup() {
//     return {
//       menuOptions,
//       defaultExpandedKeys: ['diy-algorithm']
//     }
//   }
// })
</script>
