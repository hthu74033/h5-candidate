<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a1128] via-[#102454] to-[#1565C0] flex flex-col p-5 overflow-y-auto overflow-x-hidden">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]"></div>
      <div class="absolute bottom-10 right-10 w-60 h-60 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgTCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
    </div>

    <div class="relative z-10 w-full max-w-sm mx-auto">
      <!-- 品牌信息与标题 -->
      <div class="text-center mb-6 pt-4">
        <div class="text-white/80 text-sm font-semibold tracking-widest mb-3">千广传媒</div>
        <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(25,118,210,0.3)] border border-white/20">
          <svg class="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white tracking-wide">入职补充信息登记</h1>
        <p class="text-blue-200/70 text-sm mt-2 font-light">恭喜您通过面试，请补充入职所需信息</p>
      </div>

        <!-- 第一阶段：身份校验 -->
      <div v-if="step === 1" class="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 relative overflow-hidden transition-all duration-300">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
        <div class="text-center mb-6">
          <div class="text-base text-white/90 font-medium">请核验您的身份</div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-blue-200 text-sm mb-1.5 ml-1">5位面试序号</label>
            <input
              v-model="verifyForm.interviewNo"
              type="text"
              maxlength="5"
              placeholder="请输入您面试时的序号"
              class="w-full h-12 px-4 rounded-xl focus:outline-none transition-all uppercase bg-white/5 border border-white/20 text-white shadow-inner focus:bg-white/10 focus:border-blue-400 placeholder-blue-200/30 font-mono tracking-wider"
            />
          </div>
          <div>
            <label class="block text-blue-200 text-sm mb-1.5 ml-1">登记的手机号</label>
            <input
              v-model="verifyForm.phone"
              type="tel"
              maxlength="11"
              placeholder="请输入面试时预留的手机号"
              class="w-full h-12 px-4 rounded-xl focus:outline-none transition-all bg-white/5 border border-white/20 text-white shadow-inner focus:bg-white/10 focus:border-blue-400 placeholder-blue-200/30"
            />
          </div>
        </div>

        <button
          @click="handleVerify"
          :disabled="loading || verifyForm.interviewNo.length !== 5 || verifyForm.phone.length !== 11"
          class="w-full mt-8 py-3.5 rounded-xl text-white font-medium shadow-lg transition-all"
          :class="(verifyForm.interviewNo.length === 5 && verifyForm.phone.length === 11) ? 'bg-gradient-to-r from-blue-500 to-blue-400 hover:shadow-blue-500/30 active:scale-[0.98]' : 'bg-gray-500/50 cursor-not-allowed opacity-70'"
        >
          <span v-if="loading">验证中...</span>
          <span v-else>立即验证</span>
        </button>

        <div class="mt-4 text-center">
            <button @click="$router.push('/')" class="text-blue-300 text-sm hover:text-white transition-colors border-b border-blue-400/30 pb-0.5 inline-flex items-center gap-1 cursor-pointer">
              返回主页
            </button>
        </div>
      </div>

      <!-- 第二阶段：填写表单 -->
      <div v-else-if="step === 2" class="space-y-4">
        <!-- 基础信息核对与编辑卡片 -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 relative">
          <div class="text-white/90 font-medium mb-3 flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            请核对并完善您的基本信息
          </div>
          <div class="space-y-3">
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">姓名 <span class="text-red-400">*</span></label>
              <input v-model="baseInfo.name" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">性别 <span class="text-red-400">*</span></label>
              <select v-model="baseInfo.gender" class="form-input select-arrow">
                <option value="male" class="text-gray-800">男</option>
                <option value="female" class="text-gray-800">女</option>
              </select>
            </div>
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">出生日期 <span class="text-red-400">*</span></label>
              <input v-model="baseInfo.birth_date" type="date" class="form-input">
            </div>
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">手机号 <span class="text-red-400">*</span></label>
              <input v-model="baseInfo.phone" type="tel" class="form-input bg-black/20 opacity-70" readonly title="手机号不可修改">
            </div>
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">微信号 <span class="text-red-400">*</span></label>
              <input v-model="baseInfo.wechat_id" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">微信名称 <span class="text-red-400">*</span></label>
              <input v-model="baseInfo.wechat_name" type="text" class="form-input">
            </div>
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">学历 <span class="text-red-400">*</span></label>
              <select v-model="baseInfo.degree" class="form-input select-arrow">
                <option value="" disabled class="text-gray-400">请选择</option>
                <option value="初中及以下" class="text-gray-800">初中及以下</option>
                <option value="中专/职高" class="text-gray-800">中专/职高</option>
                <option value="高中" class="text-gray-800">高中</option>
                <option value="大专" class="text-gray-800">大专</option>
                <option value="本科" class="text-gray-800">本科</option>
                <option value="硕士" class="text-gray-800">硕士</option>
                <option value="博士" class="text-gray-800">博士</option>
              </select>
            </div>
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">期望薪资 <span class="text-red-400">*</span></label>
              <div class="flex items-center gap-2">
                <input v-model="salaryMin" type="number" placeholder="最低" class="form-input text-center">
                <span class="text-white/50 shrink-0">-</span>
                <input v-model="salaryMax" type="number" placeholder="最高" class="form-input text-center">
                <span class="text-white/50 text-sm shrink-0">元</span>
              </div>
            </div>
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">籍贯 <span class="text-red-400">*</span></label>
              <div class="flex items-center form-input cursor-pointer hover:border-blue-400 transition-colors" @click="showAreaPicker = true">
                <span class="flex-1 text-sm" :class="baseInfo.hometown ? 'text-white' : 'text-blue-200/30'">{{ baseInfo.hometown || '请选择省市' }}</span>
                <svg class="w-4 h-4 text-white/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </div>
            </div>
            <div>
              <label class="block text-blue-200/80 text-sm mb-1">现住址 <span class="text-red-400">*</span></label>
              <input v-model="baseInfo.address" type="text" class="form-input">
            </div>
          </div>
        </div>

        <!-- 补充填写表单 -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20">
          <div class="text-white/90 font-medium mb-4">请补全以下信息</div>
          
          <div class="space-y-4">
            <!-- 1. 花名 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">花名 <span class="text-blue-400/50 text-xs">(用于直播昵称)</span> <span class="text-red-400">*</span></label>
              <input v-model="formData.stage_name" type="text" class="form-input" placeholder="请输入您的花名">
            </div>

            <!-- 2. 抖音号 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">抖音号 <span class="text-red-400">*</span></label>
              <input v-model="formData.tiktok_account" type="text" class="form-input" placeholder="请输入抖音号">
            </div>

            <!-- 3. 抖音是否实名 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">抖音号是否本人实名 <span class="text-red-400">*</span></label>
              <div class="flex gap-3">
                <label class="flex-1 radio-btn" :class="{'active': formData.tiktok_real_name === 'yes'}">
                  <input type="radio" v-model="formData.tiktok_real_name" value="yes" class="hidden"> 是
                </label>
                <label class="flex-1 radio-btn" :class="{'active': formData.tiktok_real_name === 'no'}">
                  <input type="radio" v-model="formData.tiktok_real_name" value="no" class="hidden"> 否
                </label>
              </div>
            </div>

            <!-- 4. MBTI -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">MBTI人格 <span class="text-red-400">*</span></label>
              <input v-model="formData.mbti" type="text" class="form-input" placeholder="例：ENFP">
            </div>

            <!-- 5. 接档时间 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">接档时间 (可多选) <span class="text-red-400">*</span></label>
              <div class="flex-1 flex items-center bg-white/5 border border-white/20 rounded-lg h-11 px-4 cursor-pointer hover:border-blue-400 transition-colors" @click="showShiftTimePicker = true">
                <span class="flex-1 text-sm truncate" :class="formData.shift_time.length ? 'text-white' : 'text-blue-200/30'">
                  {{ formData.shift_time.length ? formData.shift_time.join(', ') : '请选择接档时间' }}
                </span>
                <svg class="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>

            <!-- 6. 日常通勤时间 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">日常通勤时间 <span class="text-red-400">*</span></label>
              <select v-model="formData.daily_commute_time" class="form-input select-arrow">
                <option value="" disabled class="text-gray-400">请选择</option>
                <option value="10分钟" class="text-gray-800">10分钟</option>
                <option value="20分钟" class="text-gray-800">20分钟</option>
                <option value="30分钟" class="text-gray-800">30分钟</option>
                <option value="40分钟" class="text-gray-800">40分钟</option>
                <option value="1小时以上" class="text-gray-800">1小时以上</option>
              </select>
            </div>

            <!-- 7. 才艺 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">才艺 (可多选) <span class="text-red-400">*</span></label>
              <div class="flex-1 flex items-center bg-white/5 border border-white/20 rounded-lg h-11 px-4 cursor-pointer hover:border-blue-400 transition-colors" @click="showTalentsPicker = true">
                <span class="flex-1 text-sm truncate" :class="formData.talents.length ? 'text-white' : 'text-blue-200/30'">
                  {{ formData.talents.length ? formData.talents.join(', ') : '请选择才艺' }}
                </span>
                <svg class="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
              
              <!-- 其他才艺输入框 -->
              <div v-if="formData.talents.includes('其他')" class="mt-3">
                <input v-model="otherTalent" type="text" class="form-input" placeholder="请输入具体才艺内容">
              </div>
            </div>

            <!-- 8. 过往工作 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">过往工作 <span class="text-red-400">*</span></label>
              <textarea v-model="formData.past_work" rows="2" class="form-input py-2 h-auto" placeholder="简述过往工作经历"></textarea>
            </div>

            <!-- 9. 语音厅经验 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">对于语音厅是否有经验 <span class="text-red-400">*</span></label>
              <div class="flex gap-3">
                <label class="flex-1 radio-btn" :class="{'active': formData.voice_room_experience === 'yes'}">
                  <input type="radio" v-model="formData.voice_room_experience" value="yes" class="hidden"> 是
                </label>
                <label class="flex-1 radio-btn" :class="{'active': formData.voice_room_experience === 'no'}">
                  <input type="radio" v-model="formData.voice_room_experience" value="no" class="hidden"> 否
                </label>
              </div>
            </div>

            <!-- 10. 感情状况 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">感情状况 <span class="text-red-400">*</span></label>
              <select v-model="formData.relationship_status" class="form-input select-arrow">
                <option value="" disabled class="text-gray-400">请选择</option>
                <option value="单身" class="text-gray-800">单身</option>
                <option value="恋爱" class="text-gray-800">恋爱</option>
                <option value="已婚" class="text-gray-800">已婚</option>
                <option value="离异" class="text-gray-800">离异</option>
              </select>
            </div>

            <!-- 11. 有无欠款 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">有无欠款 <span class="text-red-400">*</span></label>
              <div class="flex gap-3">
                <label class="flex-1 radio-btn" :class="{'active': formData.has_debt === '有'}">
                  <input type="radio" v-model="formData.has_debt" value="有" class="hidden"> 有
                </label>
                <label class="flex-1 radio-btn" :class="{'active': formData.has_debt === '无'}">
                  <input type="radio" v-model="formData.has_debt" value="无" class="hidden"> 无
                </label>
              </div>
            </div>

            <!-- 12. 爱好 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">爱好 <span class="text-red-400">*</span></label>
              <input v-model="formData.hobbies" type="text" class="form-input" placeholder="请输入您的日常爱好">
            </div>

            <!-- 13. 短期目标 -->
            <div>
              <label class="block text-blue-200 text-sm mb-1">短期目标 <span class="text-red-400">*</span></label>
              <textarea v-model="formData.short_term_goal" rows="2" class="form-input py-2 h-auto" placeholder="描述入职后的短期目标"></textarea>
            </div>
          </div>
          
          <button
            @click="handleSubmit"
            :disabled="loading || !isFormValid"
            class="w-full mt-6 py-3.5 rounded-xl text-white font-medium shadow-lg transition-all"
            :class="isFormValid ? 'bg-gradient-to-r from-blue-500 to-blue-400 hover:shadow-blue-500/30' : 'bg-gray-500/50 cursor-not-allowed opacity-70'"
          >
            <span v-if="loading">提交中...</span>
            <span v-else>确认提交</span>
          </button>
        </div>
      </div>

      <!-- 第三阶段：提交成功 -->
      <div v-else-if="step === 3" class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent"></div>
        <div class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-white mb-2">提交成功</h2>
        <p class="text-blue-200/70 text-sm">您的入职信息已补充完毕，请等待人事安排。</p>
        <button @click="$router.push('/')" class="mt-8 text-blue-300 border border-blue-400/30 rounded-xl px-6 py-2 hover:bg-blue-400/10 transition-colors">
          返回主界面
        </button>
      </div>

      <!-- 地区选择弹窗 -->
      <van-popup v-model:show="showAreaPicker" position="bottom" round>
        <van-area
          title="选择籍贯"
          :area-list="areaList"
          :columns-num="2"
          @confirm="onAreaConfirm"
          @cancel="showAreaPicker = false"
        />
      </van-popup>

      <!-- 接档时间选择弹窗 -->
      <van-popup v-model:show="showShiftTimePicker" position="bottom" round>
        <div class="bg-white">
          <div class="flex justify-between items-center p-4 border-b border-gray-100">
            <span class="text-gray-500 cursor-pointer" @click="showShiftTimePicker = false">取消</span>
            <span class="font-medium text-gray-800">选择接档时间</span>
            <span class="text-blue-500 cursor-pointer" @click="showShiftTimePicker = false">确定</span>
          </div>
          <div class="max-h-[50vh] overflow-y-auto p-4">
            <div class="flex flex-col gap-3">
              <label v-for="time in ['0-3(凌晨)', '3-6(凌晨)', '6-9(上午)', '9-12(上午)', '12-15(下午)', '15-18(下午)', '18-21(晚上)', '21-24(晚上)']" :key="time" 
                class="flex items-center gap-3 p-3 rounded-xl border border-gray-200 transition-colors"
                :class="formData.shift_time.includes(time) ? 'bg-blue-50 border-blue-400' : 'bg-gray-50'">
                <input type="checkbox" v-model="formData.shift_time" :value="time" class="w-5 h-5 text-blue-500 rounded border-gray-300">
                <span class="text-base" :class="formData.shift_time.includes(time) ? 'text-blue-600 font-medium' : 'text-gray-700'">{{ time }}</span>
              </label>
            </div>
          </div>
        </div>
      </van-popup>

      <!-- 才艺选择弹窗 -->
      <van-popup v-model:show="showTalentsPicker" position="bottom" round>
        <div class="bg-white">
          <div class="flex justify-between items-center p-4 border-b border-gray-100">
            <span class="text-gray-500 cursor-pointer" @click="showTalentsPicker = false">取消</span>
            <span class="font-medium text-gray-800">选择才艺</span>
            <span class="text-blue-500 cursor-pointer" @click="showTalentsPicker = false">确定</span>
          </div>
          <div class="max-h-[50vh] overflow-y-auto p-4">
            <div class="flex flex-wrap gap-3">
              <label v-for="talent in ['打游戏', '唱歌', '乐器', '卡点', '喊麦', '读文', 'rap', '跳舞', '无', '配音', '其他']" :key="talent" 
                class="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 transition-colors"
                :class="formData.talents.includes(talent) ? 'bg-blue-50 border-blue-400' : 'bg-gray-50'">
                <input type="checkbox" v-model="formData.talents" :value="talent" class="hidden">
                <span class="text-base" :class="formData.talents.includes(talent) ? 'text-blue-600 font-medium' : 'text-gray-700'">{{ talent }}</span>
              </label>
            </div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { onboardingApi } from '@/api'
import { areaList } from '@vant/area-data'

const router = useRouter()
const step = ref(1) // 1: 验证, 2: 填写, 3: 成功
const loading = ref(false)

const verifyForm = reactive({
  interviewNo: '',
  phone: ''
})

const baseInfo = ref<any>({})
const salaryMin = ref('')
const salaryMax = ref('')

const showAreaPicker = ref(false)
const showShiftTimePicker = ref(false)
const showTalentsPicker = ref(false)
const otherTalent = ref('')

function onAreaConfirm({ selectedOptions }: { selectedOptions: any[] }) {
  const province = selectedOptions[0]?.text || ''
  const city = selectedOptions[1]?.text || ''
  baseInfo.value.hometown = province === city ? province : `${province}${city}`
  showAreaPicker.value = false
}

watch([salaryMin, salaryMax], ([min, max]) => {
  if (min && max) {
    baseInfo.value.expected_salary = `${min}-${max}元`
  } else if (min) {
    baseInfo.value.expected_salary = `${min}元以上`
  } else {
    baseInfo.value.expected_salary = ''
  }
})

const formData = reactive({
  stage_name: '',
  tiktok_account: '',
  tiktok_real_name: '',
  mbti: '',
  shift_time: [] as string[],
  daily_commute_time: '',
  talents: [] as string[],
  past_work: '',
  voice_room_experience: '',
  relationship_status: '',
  has_debt: '',
  hobbies: '',
  short_term_goal: ''
})

// 简单判断必填
const isFormValid = computed(() => {
  return formData.stage_name && 
         formData.tiktok_account && 
         formData.tiktok_real_name && 
         formData.mbti && 
         formData.shift_time.length > 0 && 
         formData.daily_commute_time && 
         formData.talents.length > 0 && 
         (!formData.talents.includes('其他') || otherTalent.value.trim() !== '') &&
         formData.past_work && 
         formData.voice_room_experience && 
         formData.relationship_status && 
         formData.has_debt && 
         formData.hobbies && 
         formData.short_term_goal
})

async function handleVerify() {
  verifyForm.interviewNo = verifyForm.interviewNo.toUpperCase()
  if (verifyForm.interviewNo.length !== 5 || verifyForm.phone.length !== 11) return

  loading.value = true
  try {
    // 1. 验证权限
    await onboardingApi.verify(verifyForm)
    // 2. 获取基础信息
    const res: any = await onboardingApi.getBaseInfo(verifyForm.interviewNo, verifyForm.phone)
    if (res.data.birth_date) {
      res.data.birth_date = res.data.birth_date.split('T')[0]
    }
    baseInfo.value = res.data
    
    // 回显薪资
    if (baseInfo.value.expected_salary) {
      const parts = baseInfo.value.expected_salary.replace('元', '').replace('以上', '').split('-')
      if (parts.length === 2) {
        salaryMin.value = parts[0]
        salaryMax.value = parts[1]
      } else if (parts.length === 1) {
        salaryMin.value = parts[0]
      }
    }
    
    step.value = 2
  } catch (err: any) {
    alert(err.message || '验证失败，请检查输入或联系管理员开通权限')
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  if (!isFormValid.value) return
  if (!baseInfo.value.name || !baseInfo.value.gender || !baseInfo.value.birth_date ||
      !baseInfo.value.wechat_id || !baseInfo.value.wechat_name || !baseInfo.value.degree ||
      !baseInfo.value.expected_salary || !baseInfo.value.hometown || !baseInfo.value.address) {
    alert('请完善所有基础信息(全部必填)')
    return
  }
  loading.value = true
  try {
    const finalTalents = formData.talents.map(t => {
      if (t === '其他' && otherTalent.value) {
        return `其他(${otherTalent.value})`
      }
      return t
    })

    await onboardingApi.submit({
      interviewNo: verifyForm.interviewNo,
      phone: verifyForm.phone,
      ...formData,
      shift_time: formData.shift_time.join(','),
      talents: finalTalents.join(','),
      baseInfo: baseInfo.value
    })
    step.value = 3
  } catch (err: any) {
    alert(err.message || '提交失败，请重试')
  } finally {
    loading.value = false
  }
}

function resetFlow() {
  step.value = 1
  verifyForm.interviewNo = ''
  verifyForm.phone = ''
  // 清楚表单
  Object.keys(formData).forEach(key => (formData as any)[key] = '')
}
</script>

<style scoped>
.form-input {
  @apply w-full h-11 px-4 rounded-xl focus:outline-none transition-all bg-white/5 border border-white/20 text-white placeholder-blue-200/30;
}
.form-input:focus {
  @apply bg-white/10 border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.2)];
}
.radio-btn {
  @apply block text-center py-2.5 rounded-xl border border-white/20 text-blue-200 transition-all cursor-pointer;
}
.radio-btn.active {
  @apply bg-blue-500 border-blue-400 text-white shadow-lg shadow-blue-500/30 font-medium;
}
/* Custom dropdown arrow for dark background */
.select-arrow {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2393C5FD%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem top 50%;
  background-size: 0.65rem auto;
}
</style>
