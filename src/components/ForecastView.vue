<template>
    <div>
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

            <n-button type="primary" @click="fetchForecast"> Primary </n-button>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


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

// fetchForecast
const fetchForecast = () => {
    console.log('fetch forecast');
}

</script>

<style scoped></style>