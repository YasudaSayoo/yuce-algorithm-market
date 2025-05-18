<template>
    <div class="p-5">

        <pre>{{ model }}
        </pre>
        <n-form ref="formRef" :model="model" require-mark-placement="right-hanging" label-placement="left"
            label-width="auto" size="small">
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

        <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen">
            <n-grid-item v-for="c in cards" :key="c.id">
                <n-card :title="c.sellName">
                    价格：{{ c.sellInfo }} 金币 <br>
                    发布用户：{{ c.userId }} 时间：{{ new Date(c.sellTime).toLocaleDateString() }} <br>
                    开奖：{{ c.gameName }} 方法：{{ c.yuceInfoName }}<br>
                    20期命中率：{{ c.rate }}% 200期命中率：{{ c.toRate }}%<br>
                    当前连中：{{ c.lianZhong }} 当前连挂：{{ c.lianShu }}<br>
                    最大连中：{{ c.maxLianZhong }} 最大连挂：{{ c.maxLianShu }}<br>
                    <n-flex justify="end">
                        <n-button type="info" size="small" @click="handlePreview(c.customUid)">预览</n-button>
                    </n-flex>
                </n-card>
            </n-grid-item>
        </n-grid>

        <!-- modal -->
        <n-modal v-model:show="showModal" transform-origin="center">
            <n-card style="width: 600px" title="自愿" :bordered="false" size="huge" role="dialog" aria-modal="true">
                <template #header-extra>
                    按需
                </template>
                原则
                <template #footer>
                    支持一下
                </template>
            </n-card>
        </n-modal>
    </div>
</template>


<script setup lang="ts">
import { computed, ref, unref } from 'vue';
import { AlgorithmResp } from '../types/Algorithm';


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

const model = ref({
    gameId: null,
    yuceInfoId: null,
    order: 'new',
    pageIndex: 1,
})

const cards = ref<AlgorithmResp[]>(
    [
        {
            "id": 21486,
            "userId": 56725,
            "name": "大小尾 算法",
            "sellName": "大小尾 算法",
            "gameId": 5,
            "yuceInfoId": 9,
            "sellGameId": 5,
            "sellYuceInfoId": 9,
            "gameName": "加拿大28(210游戏)",
            "yuceInfoName": "大小尾",
            "zhong": 11,
            "shu": 8,
            "lianZhong": 0,
            "lianShu": 1,
            "maxLianZhong": 7,
            "maxLianShu": 3,
            "rate": 57.89,
            "toRate": 49.25,
            "sell": true,
            "customUid": "b27a5585-2535-458b-8033-654e30b5b1b8-56725",
            "saveTime": 1747461610000,
            "sellTime": 1747461611000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21485,
            "userId": 56724,
            "name": "组合 算法",
            "sellName": "组合 算法",
            "gameId": 39,
            "yuceInfoId": 1,
            "sellGameId": 39,
            "sellYuceInfoId": 1,
            "gameName": "宾果北京28",
            "yuceInfoName": "组合",
            "zhong": 15,
            "shu": 4,
            "lianZhong": 1,
            "lianShu": 0,
            "maxLianZhong": 8,
            "maxLianShu": 1,
            "rate": 78.95,
            "toRate": 80.4,
            "sell": true,
            "customUid": "3e3a63dc-f043-4f31-8a3e-4f7ecda7dc16-56724",
            "saveTime": 1747461607000,
            "sellTime": 1747461608000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21484,
            "userId": 56723,
            "name": "大小尾 算法",
            "sellName": "大小尾 算法",
            "gameId": 39,
            "yuceInfoId": 9,
            "sellGameId": 39,
            "sellYuceInfoId": 9,
            "gameName": "宾果北京28",
            "yuceInfoName": "大小尾",
            "zhong": 8,
            "shu": 11,
            "lianZhong": 0,
            "lianShu": 2,
            "maxLianZhong": 3,
            "maxLianShu": 3,
            "rate": 42.11,
            "toRate": 45.73,
            "sell": true,
            "customUid": "cbe55b77-2248-4edd-9e13-307a4aa5a4a1-56723",
            "saveTime": 1747461606000,
            "sellTime": 1747461606000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21483,
            "userId": 56722,
            "name": "杀五余 算法",
            "sellName": "杀五余 算法",
            "gameId": 64,
            "yuceInfoId": 6,
            "sellGameId": 64,
            "sellYuceInfoId": 6,
            "gameName": "斯洛伐克28",
            "yuceInfoName": "杀五余",
            "zhong": 13,
            "shu": 6,
            "lianZhong": 1,
            "lianShu": 0,
            "maxLianZhong": 8,
            "maxLianShu": 2,
            "rate": 68.42,
            "toRate": 79.9,
            "sell": true,
            "customUid": "c1460b6b-f356-4189-8ff1-e63312f306c0-56722",
            "saveTime": 1747461602000,
            "sellTime": 1747461602000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21482,
            "userId": 56721,
            "name": "组合 算法",
            "sellName": "组合 算法",
            "gameId": 39,
            "yuceInfoId": 1,
            "sellGameId": 39,
            "sellYuceInfoId": 1,
            "gameName": "宾果北京28",
            "yuceInfoName": "组合",
            "zhong": 14,
            "shu": 5,
            "lianZhong": 5,
            "lianShu": 0,
            "maxLianZhong": 6,
            "maxLianShu": 1,
            "rate": 73.68,
            "toRate": 77.89,
            "sell": true,
            "customUid": "63b74934-fc1d-472c-a9bb-1af71f693fa4-56721",
            "saveTime": 1747461600000,
            "sellTime": 1747461601000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21474,
            "userId": 56697,
            "name": "单双 算法",
            "sellName": "单双 算法",
            "gameId": 39,
            "yuceInfoId": 2,
            "sellGameId": 39,
            "sellYuceInfoId": 2,
            "gameName": "宾果北京28",
            "yuceInfoName": "单双",
            "zhong": 11,
            "shu": 8,
            "lianZhong": 2,
            "lianShu": 0,
            "maxLianZhong": 3,
            "maxLianShu": 4,
            "rate": 57.89,
            "toRate": 51.26,
            "sell": true,
            "customUid": "6dd1b3c7-aca2-42a5-81f5-4a640108f11a-56697",
            "saveTime": 1747375213000,
            "sellTime": 1747375214000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21473,
            "userId": 56696,
            "name": "单双 算法",
            "sellName": "单双 算法",
            "gameId": 40,
            "yuceInfoId": 2,
            "sellGameId": 40,
            "sellYuceInfoId": 2,
            "gameName": "宾果蛋蛋28",
            "yuceInfoName": "单双",
            "zhong": 11,
            "shu": 8,
            "lianZhong": 0,
            "lianShu": 1,
            "maxLianZhong": 5,
            "maxLianShu": 3,
            "rate": 57.89,
            "toRate": 48.74,
            "sell": true,
            "customUid": "babf21ba-a2db-487c-b469-d43e7736704d-56696",
            "saveTime": 1747375211000,
            "sellTime": 1747375211000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21472,
            "userId": 56695,
            "name": "杀组合 算法",
            "sellName": "杀组合 算法",
            "gameId": 39,
            "yuceInfoId": 7,
            "sellGameId": 39,
            "sellYuceInfoId": 7,
            "gameName": "宾果北京28",
            "yuceInfoName": "杀组合",
            "zhong": 13,
            "shu": 6,
            "lianZhong": 0,
            "lianShu": 1,
            "maxLianZhong": 5,
            "maxLianShu": 2,
            "rate": 68.42,
            "toRate": 65.83,
            "sell": true,
            "customUid": "c6b1d9c5-a843-4981-8bd3-deacc8244ee6-56695",
            "saveTime": 1747375209000,
            "sellTime": 1747375209000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21471,
            "userId": 56694,
            "name": "大小尾 算法",
            "sellName": "大小尾 算法",
            "gameId": 39,
            "yuceInfoId": 9,
            "sellGameId": 39,
            "sellYuceInfoId": 9,
            "gameName": "宾果北京28",
            "yuceInfoName": "大小尾",
            "zhong": 6,
            "shu": 13,
            "lianZhong": 1,
            "lianShu": 0,
            "maxLianZhong": 2,
            "maxLianShu": 6,
            "rate": 31.58,
            "toRate": 49.25,
            "sell": true,
            "customUid": "814aa41b-3edf-4493-95ef-f1bce51424bc-56694",
            "saveTime": 1747375207000,
            "sellTime": 1747375208000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21470,
            "userId": 56693,
            "name": "杀组合 算法",
            "sellName": "杀组合 算法",
            "gameId": 39,
            "yuceInfoId": 7,
            "sellGameId": 39,
            "sellYuceInfoId": 7,
            "gameName": "宾果北京28",
            "yuceInfoName": "杀组合",
            "zhong": 15,
            "shu": 4,
            "lianZhong": 3,
            "lianShu": 0,
            "maxLianZhong": 5,
            "maxLianShu": 1,
            "rate": 78.95,
            "toRate": 73.87,
            "sell": true,
            "customUid": "59bc2e6f-224d-4684-818c-e78a86c9d826-56693",
            "saveTime": 1747375200000,
            "sellTime": 1747375201000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21467,
            "userId": 56668,
            "name": "大小尾 算法",
            "sellName": "大小尾 算法",
            "gameId": 5,
            "yuceInfoId": 9,
            "sellGameId": 5,
            "sellYuceInfoId": 9,
            "gameName": "加拿大28(210游戏)",
            "yuceInfoName": "大小尾",
            "zhong": 7,
            "shu": 12,
            "lianZhong": 0,
            "lianShu": 3,
            "maxLianZhong": 3,
            "maxLianShu": 6,
            "rate": 36.84,
            "toRate": 47.74,
            "sell": true,
            "customUid": "27a46079-2236-42ae-9620-2e006f92b9b2-56668",
            "saveTime": 1747288807000,
            "sellTime": 1747288808000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21466,
            "userId": 56667,
            "name": "单双 算法",
            "sellName": "单双 算法",
            "gameId": 5,
            "yuceInfoId": 2,
            "sellGameId": 5,
            "sellYuceInfoId": 2,
            "gameName": "加拿大28(210游戏)",
            "yuceInfoName": "单双",
            "zhong": 10,
            "shu": 9,
            "lianZhong": 1,
            "lianShu": 0,
            "maxLianZhong": 3,
            "maxLianShu": 2,
            "rate": 52.63,
            "toRate": 54.27,
            "sell": true,
            "customUid": "b2fc391d-7012-4c6e-a58e-72043549e6b5-56667",
            "saveTime": 1747288805000,
            "sellTime": 1747288805000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21465,
            "userId": 56666,
            "name": "杀三余 算法",
            "sellName": "杀三余 算法",
            "gameId": 5,
            "yuceInfoId": 4,
            "sellGameId": 5,
            "sellYuceInfoId": 4,
            "gameName": "加拿大28(210游戏)",
            "yuceInfoName": "杀三余",
            "zhong": 11,
            "shu": 8,
            "lianZhong": 0,
            "lianShu": 1,
            "maxLianZhong": 5,
            "maxLianShu": 3,
            "rate": 57.89,
            "toRate": 71.36,
            "sell": true,
            "customUid": "9958527b-e4c9-449f-bcc1-2a0444662326-56666",
            "saveTime": 1747288803000,
            "sellTime": 1747288804000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21464,
            "userId": 56665,
            "name": "杀组合 算法",
            "sellName": "杀组合 算法",
            "gameId": 40,
            "yuceInfoId": 7,
            "sellGameId": 40,
            "sellYuceInfoId": 7,
            "gameName": "宾果蛋蛋28",
            "yuceInfoName": "杀组合",
            "zhong": 14,
            "shu": 5,
            "lianZhong": 2,
            "lianShu": 0,
            "maxLianZhong": 7,
            "maxLianShu": 2,
            "rate": 73.68,
            "toRate": 74.37,
            "sell": true,
            "customUid": "ac1d95df-2774-48e6-b8de-33b54f22b197-56665",
            "saveTime": 1747288802000,
            "sellTime": 1747288802000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21463,
            "userId": 56664,
            "name": "杀三余 算法",
            "sellName": "杀三余 算法",
            "gameId": 64,
            "yuceInfoId": 4,
            "sellGameId": 64,
            "sellYuceInfoId": 4,
            "gameName": "斯洛伐克28",
            "yuceInfoName": "杀三余",
            "zhong": 11,
            "shu": 8,
            "lianZhong": 0,
            "lianShu": 1,
            "maxLianZhong": 3,
            "maxLianShu": 1,
            "rate": 57.89,
            "toRate": 66.33,
            "sell": true,
            "customUid": "09c5e5aa-5faf-4c19-978d-3e26c1c45d4f-56664",
            "saveTime": 1747288801000,
            "sellTime": 1747288801000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        },
        {
            "id": 21462,
            "userId": 56628,
            "name": "单双 算法",
            "sellName": "单双 算法",
            "gameId": 64,
            "yuceInfoId": 2,
            "sellGameId": 64,
            "sellYuceInfoId": 2,
            "gameName": "斯洛伐克28",
            "yuceInfoName": "单双",
            "zhong": 12,
            "shu": 7,
            "lianZhong": 0,
            "lianShu": 1,
            "maxLianZhong": 4,
            "maxLianShu": 2,
            "rate": 63.16,
            "toRate": 59.8,
            "sell": true,
            "customUid": "aeb9e398-88c5-4a8e-a797-50a6ecd219fb-56628",
            "saveTime": 1747202409000,
            "sellTime": 1747202410000,
            "sellInfo": 20,
            "buyNum": 0,
            "buyTime": null,
            "expireTime": null,
            "sellExpireTime": null,
            "sellStatus": null
        }
    ]
)

const pageInfo = ref({
    pageNum: 1,
    pageSize: 16,
    total: 1
})

// modal
const showModal = ref(false)

// fetchForecast
const fetchAlgorithmMarket = async () => {
    const data = unref(model)
    console.log('data', data)

    const filteredParams = Object.entries(data).filter(([_, v]) => v)
    console.log('filtered', filteredParams);

    const params = new URLSearchParams(filteredParams as string[][])
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
    if (json.success) {
        const algorithmsResp: AlgorithmResp[] = json.data
        cards.value = algorithmsResp
    }
    console.log('json', json)
}

// 预览
const token = '3BDB552F0067B31442B833B909183252'
const session = '69A525A97A7F82D8422DCB1AC76EDA17'
const handlePreview = async (customUid: string) => {
    const url = `https://www.yuce2.com/api/custom/getCustomYuce`
    const params = new URLSearchParams()
    params.append('customUid', customUid)
    params.append('sellPreview', 'true')

    console.log('params', params);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Authorization': `Bearer ${token}`,
            // 'Cookie': `JSESSIONID=${session}`
        },
        body: params
    });

    // const response = await fetch(url, {
    //     method: 'post',
    //     body: params,
    //     headers: {
    //         'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //     },
    //     credentials: 'include'
    //     // cookie: 'JSESSIONID=69A525A97A7F82D8422DCB1AC76EDA17'
    // })

    if (response.ok) {
        const data = await response.json()
        console.log('data', data);

        showModal.value = true
    }

}


</script>

<style scoped></style>