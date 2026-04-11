<template>
  <div class="space-y-5">
    <div class="bg-white rounded-3xl overflow-hidden shadow-soft border border-gray-100 hover:shadow-float transition-all">
      <div class="px-5 py-4 bg-brand-50/50 border-b border-brand-100/50">
        <h3 class="font-semibold text-brand-700 text-sm flex items-center gap-2">
          <div class="w-1.5 h-4 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full"></div>
          个人基本信息
        </h3>
      </div>

      <div class="divide-y divide-gray-50 px-2">
        <!-- 姓名 -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">姓名 <span class="text-rose-500">*</span></label>
          <input v-model="basic.name" type="text" placeholder="请输入真实姓名" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <!-- 性别 -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">性别 <span class="text-rose-500">*</span></label>
          <div class="flex gap-2">
            <button v-for="g in genders" :key="g.value" @click="basic.gender = g.value"
              class="px-5 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border"
              :class="basic.gender === g.value ? 'bg-brand-600 border-brand-600 text-white shadow-md' : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'">
              {{ g.label }}
            </button>
          </div>
        </div>
        <!-- 出生日期 -->
        <div class="flex items-center px-3 py-3.5 cursor-pointer hover:bg-brand-50/30 transition-colors rounded-xl mx-2" @click="showDatePicker = true">
          <label class="w-22 ml-1 text-sm text-gray-500 font-medium shrink-0">出生日期 <span class="text-rose-500">*</span></label>
          <div class="flex-1 text-sm outline-none bg-transparent" :class="basic.birthDate ? 'text-gray-800 font-medium' : 'text-gray-300'">
            {{ basic.birthDate || '请选择出生日期' }}
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>
        <!-- 联系电话 -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">联系电话 <span class="text-rose-500">*</span></label>
          <input v-model="basic.phone" type="tel" maxlength="11" inputmode="numeric" placeholder="请输入11位手机号"
            class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0"
            @input="basic.phone = basic.phone.replace(/\D/g, '').slice(0, 11)" />
        </div>
        <!-- 微信名 -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">微信名</label>
          <input v-model="basic.wechatName" type="text" placeholder="请输入微信昵称" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <!-- 微信号 -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">微信号</label>
          <input v-model="basic.wechatId" type="text" placeholder="请输入微信号" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <!-- 祖籍 -->
        <div class="flex items-center px-3 py-3.5 cursor-pointer hover:bg-brand-50/30 transition-colors rounded-xl mx-2" @click="openAreaPicker">
          <label class="w-22 ml-1 text-sm text-gray-500 font-medium shrink-0">祖籍 <span class="text-rose-500">*</span></label>
          <div class="flex-1 text-sm outline-none bg-transparent" :class="basic.hometown ? 'text-gray-800 font-medium' : 'text-gray-300'">
            {{ basic.hometown || '请选择省市' }}
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </div>
        <!-- 民族 -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">民族 <span class="text-rose-500">*</span></label>
          <input v-model="basic.ethnicity" type="text" placeholder="如：汉族" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <!-- 婚姻状况 (选填) -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">婚姻状况</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="m in maritalOptions" :key="m.value" @click="basic.maritalStatus = m.value"
              class="px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer"
              :class="basic.maritalStatus === m.value ? 'bg-brand-600 border-brand-600 text-white shadow-md' : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'">
              {{ m.label }}
            </button>
          </div>
        </div>
        <!-- 现住址 -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">现住址 <span class="text-rose-500">*</span></label>
          <input v-model="basic.address" type="text" placeholder="请输入现居住地址" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <!-- 通勤方式 -->
        <div class="px-3 py-3.5">
          <label class="text-sm text-gray-500 font-medium block mb-3">通勤方式 <span class="text-rose-500">*</span></label>
          <div class="flex flex-wrap gap-2">
            <button v-for="c in commuteOptions" :key="c.value" @click="basic.commuteType = c.value"
              class="px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer"
              :class="basic.commuteType === c.value ? 'bg-brand-50 border-brand-400 text-brand-600 shadow-sm' : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'">
              {{ c.label }}
            </button>
          </div>
        </div>
        <!-- 预计通勤时间 -->
        <div class="px-3 py-3.5">
          <label class="text-sm text-gray-500 font-medium block mb-3">预计通勤时间 <span class="text-rose-500">*</span></label>
          <div class="flex flex-wrap gap-2">
            <button v-for="t in commuteTimeOptions" :key="t.value" @click="basic.estimatedCommuteTime = t.value"
              class="px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer"
              :class="basic.estimatedCommuteTime === t.value ? 'bg-brand-50 border-brand-400 text-brand-600 shadow-sm' : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'">
              {{ t.label }}
            </button>
          </div>
        </div>
        <!-- 面试岗位 -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">面试岗位 <span class="text-rose-500">*</span></label>
          <input v-model="basic.interviewPosition" type="text" placeholder="请输入应聘岗位" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <!-- 期望薪资 -->
        <div class="flex items-center px-3 py-3.5 gap-2">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">期望薪资 <span class="text-rose-500">*</span></label>
          <div class="flex-1 flex items-center gap-2">
            <input v-model="minSalary" type="number" placeholder="最低" class="w-full text-center text-sm text-gray-800 border border-gray-200 rounded-xl py-1.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-gray-50 transition-all" />
            <span class="text-gray-300">-</span>
            <input v-model="maxSalary" type="number" placeholder="最高" class="w-full text-center text-sm text-gray-800 border border-gray-200 rounded-xl py-1.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-gray-50 transition-all" />
            <span class="text-gray-500 text-sm font-medium">元</span>
          </div>
        </div>
        <!-- 预计到岗 -->
        <div class="flex items-center px-3 py-3.5">
          <label class="w-24 text-sm text-gray-500 font-medium shrink-0">预计到岗 <span class="text-rose-500">*</span></label>
          <input v-model="basic.expectedStart" type="text" placeholder="如：一周内、随时" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <!-- 特殊疾病史 -->
        <div class="px-3 py-3.5">
          <label class="text-sm text-gray-500 font-medium block mb-2.5">特殊疾病史 <span class="text-rose-500">*</span></label>
          <textarea v-model="basic.diseaseHistory" rows="2" placeholder="如无请填写：无" class="w-full text-sm text-gray-800 placeholder-gray-300 border border-gray-200 rounded-2xl p-3.5 resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all bg-gray-50"></textarea>
        </div>
        <!-- 个人爱好 (选填) -->
        <div class="px-3 py-3.5">
          <label class="text-sm text-gray-500 font-medium block mb-2.5">个人爱好/才艺</label>
          <textarea v-model="basic.hobbies" rows="2" placeholder="请填写您的个人爱好或特长才艺" class="w-full text-sm text-gray-800 placeholder-gray-300 border border-gray-200 rounded-2xl p-3.5 resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all bg-gray-50"></textarea>
        </div>
        <!-- 自我评价 (选填) -->
        <div class="px-3 py-3.5">
          <label class="text-sm text-gray-500 font-medium block mb-2.5">自我评价</label>
          <textarea v-model="basic.selfEvaluation" rows="3" placeholder="请简要介绍自己的优势和特点" class="w-full text-sm text-gray-800 placeholder-gray-300 border border-gray-200 rounded-2xl p-3.5 resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all bg-gray-50"></textarea>
        </div>
      </div>
    </div>

    <!-- 招聘来源 -->
    <div class="bg-white rounded-3xl overflow-hidden shadow-soft border border-gray-100 mt-5">
      <div class="px-5 py-4 bg-brand-50/50 border-b border-brand-100/50">
        <h3 class="font-semibold text-brand-700 text-sm flex items-center gap-2">
          <div class="w-1.5 h-4 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full"></div>
          招聘信息来源
        </h3>
      </div>
      <div class="px-4 py-4">
        <label class="text-sm text-gray-600 font-medium block mb-3">您从何处了解到本公司招聘信息？ <span class="text-rose-500">*</span></label>
        <div class="flex flex-wrap gap-2 mb-3">
          <button v-for="s in recruitmentOptions" :key="s.value" @click="selectSource(s.value)"
            class="px-4 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer"
            :class="basic.recruitmentSource === s.value ? 'bg-brand-50 border-brand-400 text-brand-600 shadow-sm' : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'">
            {{ s.label }}
          </button>
        </div>
        
        <div v-if="basic.recruitmentSource === '内部推荐'" class="mt-2">
          <input v-model="basic.recruitmentDetail" type="text" placeholder="请输入推荐人姓名" class="w-full text-sm text-gray-800 placeholder-gray-300 border border-gray-200 rounded-xl px-3.5 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-gray-50 transition-all" />
        </div>
        <div v-if="basic.recruitmentSource === '其他'" class="mt-2">
          <input v-model="basic.recruitmentDetail" type="text" placeholder="请注明来源" class="w-full text-sm text-gray-800 placeholder-gray-300 border border-gray-200 rounded-xl px-3.5 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 bg-gray-50 transition-all" />
        </div>
      </div>
    </div>

    <!-- 日期选择器 Popup -->
    <van-popup v-model:show="showDatePicker" position="bottom" round>
      <van-date-picker
        v-model="currentDate"
        title="选择出生日期"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onDateConfirm"
        @cancel="showDatePicker = false"
      />
    </van-popup>

    <!-- 祖籍地区选择器 Popup -->
    <van-popup v-model:show="showAreaPicker" position="bottom" round>
      <van-area
        title="选择祖籍"
        :area-list="areaList"
        :columns-num="2"
        @confirm="onAreaConfirm"
        @cancel="showAreaPicker = false"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useFormStore } from '../../stores/form'

// 懒加载 area-data（500KB），仅在弹窗打开时才加载
const areaList = ref<any>({})
async function loadAreaData() {
  if (Object.keys(areaList.value).length === 0) {
    const { areaList: data } = await import('@vant/area-data')
    areaList.value = data
  }
}

const formStore = useFormStore()
const basic = formStore.basic

const genders = [{ value: 'male', label: '男' }, { value: 'female', label: '女' }]
const maritalOptions = [
  { value: 'single', label: '未婚' },
  { value: 'married', label: '已婚' },
  { value: 'divorced', label: '离异' },
  { value: 'widowed', label: '丧偶' }
]
const commuteOptions = [
  { value: '步行', label: '步行' },
  { value: '自行/电动车', label: '自行/电动车' },
  { value: '公共交通(公交地铁)', label: '公共交通(公交地铁)' },
  { value: '机动车(汽车/摩托)', label: '机动车(汽车/摩托)' },
]
const commuteTimeOptions = [
  { value: '30分钟以内', label: '30分钟以内' },
  { value: '30分钟-1小时', label: '30分钟-1小时' },
  { value: '1-1.5小时', label: '1-1.5小时' },
  { value: '1.5小时以上', label: '1.5小时以上' },
]

const recruitmentOptions = [
  { value: 'Boss直聘', label: 'Boss直聘' },
  { value: '智联招聘', label: '智联招聘' },
  { value: '内部推荐', label: '内部推荐' },
  { value: '其他', label: '其他' },
]

function selectSource(source: string) {
  if (basic.recruitmentSource !== source) {
    basic.recruitmentSource = source
    basic.recruitmentDetail = ''
  }
}

// 薪资处理
const minSalary = ref('')
const maxSalary = ref('')

onMounted(() => {
  if (basic.expectedSalary) {
    const parts = basic.expectedSalary.replace('元', '').split('-')
    if (parts.length === 2) {
      minSalary.value = parts[0]
      maxSalary.value = parts[1]
    }
  }
})

watch([minSalary, maxSalary], ([min, max]) => {
  if (min && max) {
    basic.expectedSalary = `${min}-${max}元`
  } else {
    basic.expectedSalary = ''
  }
})

// 日期选择处理
const showDatePicker = ref(false)
const minDate = new Date(1960, 0, 1)
const maxDate = new Date()
// Vant DatePicker v-model 接收数组 ['YYYY', 'MM', 'DD']
const currentDate = ref<string[]>(['1995', '01', '01'])

onMounted(() => {
  if (basic.birthDate) {
    const d = basic.birthDate.split('-')
    if (d.length === 3) currentDate.value = d
  }
})

function onDateConfirm({ selectedValues }: { selectedValues: string[] }) {
  basic.birthDate = selectedValues.join('-')
  showDatePicker.value = false
}

// 地区选择处理
const showAreaPicker = ref(false)

async function openAreaPicker() {
  await loadAreaData()
  showAreaPicker.value = true
}

function onAreaConfirm({ selectedOptions }: { selectedOptions: any[] }) {
  const province = selectedOptions[0]?.text || ''
  const city = selectedOptions[1]?.text || ''
  basic.hometown = province === city ? province : `${province}${city}`
  showAreaPicker.value = false
}
</script>
