<template>
  <div class="space-y-5">
    <div v-for="(edu, index) in formStore.education" :key="index" class="bg-white rounded-3xl shadow-soft overflow-hidden border border-gray-100 transition-all hover:shadow-float">
      <div class="px-5 py-4 bg-brand-50/50 border-b border-brand-100/50 flex items-center justify-between">
        <h3 class="font-semibold text-brand-700 text-sm flex items-center gap-2">
          <div class="w-1.5 h-4 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full"></div>
          教育经历 {{ index + 1 }}
        </h3>
        <button @click="formStore.removeEducation(index)" class="text-rose-400 hover:text-rose-600 active:scale-95 transition-all text-xs flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          删除
        </button>
      </div>
      <div class="divide-y divide-gray-50 px-2">
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">学历 <span class="text-rose-500">*</span></label>
          <select v-model="edu.degree" class="flex-1 text-sm text-gray-800 border-none outline-none bg-transparent appearance-none">
            <option value="">请选择学历</option>
            <option v-for="d in degrees" :key="d" :value="d">{{ d }}</option>
          </select>
          <svg class="w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </div>
        <div class="flex items-center px-3 py-3.5 gap-2">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">时间 <span class="text-rose-500">*</span></label>
          <div class="flex-1 flex items-center gap-2">
            <div @click="openDatePicker(index, 'startDate')" class="w-full text-center text-sm border border-gray-200 rounded-xl px-2 py-1.5 outline-none bg-gray-50 transition-all text-gray-700 cursor-pointer" :class="edu.startDate ? '' : 'text-gray-400'">
              {{ edu.startDate || '入学时间' }}
            </div>
            <span class="text-gray-300 text-xs">至</span>
            <div @click="openDatePicker(index, 'endDate')" class="w-full text-center text-sm border border-gray-200 rounded-xl px-2 py-1.5 outline-none bg-gray-50 transition-all text-gray-700 cursor-pointer" :class="edu.endDate ? '' : 'text-gray-400'">
              {{ edu.endDate || '毕业时间' }}
            </div>
          </div>
        </div>
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">毕业院校 <span class="text-rose-500">*</span></label>
          <input v-model="edu.school" type="text" placeholder="学校名称" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">专业 <span class="text-rose-500">*</span></label>
          <input v-model="edu.major" type="text" placeholder="所学专业" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">应届生</label>
          <div class="flex gap-2">
            <button v-for="opt in freshOptions" :key="String(opt.value)"
              @click="edu.isFreshGraduate = opt.value"
              class="px-5 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border"
              :class="edu.isFreshGraduate === opt.value ? 'bg-brand-600 border-brand-600 text-white shadow-md' : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'">
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button @click="formStore.addEducation()"
      class="w-full py-4 bg-white border-2 border-dashed border-brand-300 rounded-3xl text-brand-600 text-sm font-semibold hover:bg-brand-50 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-sm">
      <div class="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
        <svg class="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
      </div>
      {{ formStore.education.length > 0 ? '我有更多教育经历' : '添加教育经历' }}
    </button>

    <div v-if="formStore.education.length === 0" class="text-center py-8 text-gray-400 text-sm">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
      </div>
      请添加教育背景（至少填写一条最高学历）
    </div>

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

const formStore = useFormStore()
const degrees = ['初中及以下', '中专/职高', '高中', '大专', '本科', '硕士', '博士']
const freshOptions = [{ value: false, label: '否' }, { value: true, label: '是' }]

// 日期选择处理
const showDatePicker = ref(false)
const minDate = new Date(1980, 0, 1)
const maxDate = new Date(2040, 11, 31)
const currentDate = ref<string[]>(['2020', '09'])
const pickerState = ref({ index: 0, field: 'startDate' as 'startDate' | 'endDate' })

function openDatePicker(index: number, field: 'startDate' | 'endDate') {
  pickerState.value = { index, field }
  const existingVal = formStore.education[index][field]
  if (existingVal) {
    currentDate.value = existingVal.split('-')
  } else {
    currentDate.value = [new Date().getFullYear().toString(), String(new Date().getMonth() + 1).padStart(2, '0')]
  }
  showDatePicker.value = true
}

function onDateConfirm({ selectedValues }: { selectedValues: string[] }) {
  const { index, field } = pickerState.value
  formStore.education[index][field] = selectedValues.join('-')
  showDatePicker.value = false
}
</script>
