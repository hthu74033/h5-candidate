<template>
  <div class="space-y-5">
    <!-- 无工作经历选项 -->
    <div class="bg-white rounded-3xl shadow-soft p-5 flex flex-col gap-3 border border-gray-100 hover:shadow-float transition-all">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
            <svg class="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-800">我是应届生 / 无工作经历</div>
            <div class="text-[11px] text-gray-400 mt-0.5">勾选后可跳过工作经历的填写</div>
          </div>
        </div>
        <button 
          @click="toggleNoWorkExp"
          class="w-14 h-7 rounded-full relative transition-all duration-300 outline-none shadow-inner-soft shrink-0"
          :class="formStore.hasNoWorkExp ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gray-200'"
        >
          <div 
            class="absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300"
            :class="formStore.hasNoWorkExp ? 'translate-x-7' : 'translate-x-0'"
          ></div>
        </button>
      </div>
      <div v-if="formStore.hasNoWorkExp" class="text-xs text-rose-500 bg-rose-50 rounded-xl px-3 py-2 border border-rose-100 flex gap-2">
        <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
        <span>注意：非应届生未填写工作经历，可能会影响面试结果。</span>
      </div>
    </div>

    <template v-if="!formStore.hasNoWorkExp">
      <div v-for="(w, index) in formStore.work" :key="index" class="bg-white rounded-3xl shadow-soft overflow-hidden border border-gray-100 transition-all hover:shadow-float">
        <div class="px-5 py-4 bg-emerald-50/50 border-b border-emerald-100/50 flex items-center justify-between">
          <h3 class="font-semibold text-emerald-700 text-sm flex items-center gap-2">
            <div class="w-1.5 h-4 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full"></div>
            工作经历 {{ index + 1 }}
          </h3>
          <button @click="formStore.removeWork(index)" class="text-rose-400 hover:text-rose-600 active:scale-95 transition-all text-xs flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            删除
          </button>
        </div>
        <div class="divide-y divide-gray-50 px-2">
          <div class="flex items-center px-3 py-3.5">
            <label class="w-20 text-sm text-gray-500 font-medium shrink-0">工作单位 <span class="text-rose-500">*</span></label>
            <input v-model="w.company" type="text" placeholder="公司/单位名称" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
          </div>
          <div class="flex items-center px-3 py-3.5 gap-2">
            <label class="w-20 text-sm text-gray-500 font-medium shrink-0">起止时间 <span class="text-rose-500">*</span></label>
            <div class="flex-1 flex items-center gap-2">
              <div @click="openDatePicker(index, 'startDate')" class="w-full text-center text-sm border border-gray-200 rounded-xl px-2 py-1.5 outline-none bg-gray-50 transition-all text-gray-700 cursor-pointer" :class="w.startDate ? '' : 'text-gray-400'">
                {{ w.startDate || '入职时间' }}
              </div>
              <span class="text-gray-300 text-xs">至</span>
              <div @click="openDatePicker(index, 'endDate')" class="w-full text-center text-sm border border-gray-200 rounded-xl px-2 py-1.5 outline-none bg-gray-50 transition-all text-gray-700 cursor-pointer" :class="w.endDate ? '' : 'text-gray-400'">
                {{ w.endDate || '离职时间/至今' }}
              </div>
            </div>
          </div>
          <div class="px-3 py-3.5">
            <label class="text-sm text-gray-500 font-medium block mb-2.5">工作内容 <span class="text-rose-500">*</span></label>
            <textarea v-model="w.jobContent" rows="3" placeholder="请简要描述主要工作内容和职责" class="w-full text-sm text-gray-800 placeholder-gray-300 border border-gray-200 rounded-2xl p-3.5 resize-none outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-gray-50"></textarea>
          </div>
          <div class="px-3 py-3.5">
            <label class="text-sm text-gray-500 font-medium block mb-2.5">离职原因 <span class="text-rose-500">*</span></label>
            <textarea v-model="w.leaveReason" rows="2" placeholder="请如实填写离职原因" class="w-full text-sm text-gray-800 placeholder-gray-300 border border-gray-200 rounded-2xl p-3.5 resize-none outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all bg-gray-50"></textarea>
          </div>
        </div>
      </div>

      <button @click="formStore.addWork()"
        class="w-full py-4 bg-white border-2 border-dashed border-emerald-300 rounded-3xl text-emerald-600 text-sm font-semibold hover:bg-emerald-50 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-sm">
        <div class="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
        </div>
        添加工作经历
      </button>

      <div v-if="formStore.work.length === 0" class="text-center py-8 text-gray-400 text-sm">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        请点击上方按钮添加您的工作经历（必填）<br><span class="text-xs text-gray-300 mt-1 inline-block">如无工作经历请勾选上方选项</span>
      </div>
    </template>

    <!-- 年月选择器 Popup -->
    <van-popup v-model:show="showDatePicker" position="bottom" round>
      <van-date-picker
        v-model="currentDate"
        title="选择时间"
        :columns-type="['year', 'month']"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onDateConfirm"
        @cancel="showDatePicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFormStore } from '../../stores/form'
import { showConfirmDialog } from 'vant'

const formStore = useFormStore()

const toggleNoWorkExp = async () => {
  if (!formStore.hasNoWorkExp && formStore.work.length > 0) {
    try {
      await showConfirmDialog({
        title: '提示',
        message: '勾选后将清空已填写的工作经历，确认继续吗？',
      })
      formStore.work.splice(0, formStore.work.length)
      formStore.hasNoWorkExp = true
    } catch {
      // cancel
    }
  } else {
    formStore.hasNoWorkExp = !formStore.hasNoWorkExp
  }
}

// 日期选择处理
const showDatePicker = ref(false)
const minDate = new Date(1980, 0, 1)
const maxDate = new Date(2040, 11, 31)
const currentDate = ref<string[]>(['2020', '01'])
const pickerState = ref({ index: 0, field: 'startDate' as 'startDate' | 'endDate' })

function openDatePicker(index: number, field: 'startDate' | 'endDate') {
  pickerState.value = { index, field }
  const existingVal = formStore.work[index][field]
  if (existingVal) {
    currentDate.value = existingVal.split('-')
  } else {
    currentDate.value = [new Date().getFullYear().toString(), String(new Date().getMonth() + 1).padStart(2, '0')]
  }
  showDatePicker.value = true
}

function onDateConfirm({ selectedValues }: { selectedValues: string[] }) {
  const { index, field } = pickerState.value
  formStore.work[index][field] = selectedValues.join('-')
  showDatePicker.value = false
}
</script>
