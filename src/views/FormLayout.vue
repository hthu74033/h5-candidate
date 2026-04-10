<template>
  <div class="min-h-screen bg-surface pb-28 font-sans selection:bg-brand-200">
    <!-- 顶部导航 & 步骤条 -->
    <div class="sticky top-0 z-20 bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.02)] border-b border-white/20">
      <!-- 头部信息 -->
      <div class="flex items-center justify-between px-5 py-3.5">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 shadow-inner-soft">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex items-center">
            <div class="text-gray-500 font-medium text-sm tracking-wide">序号：<span class="text-brand-700 font-bold font-mono text-base">{{ formStore.interviewNo }}</span></div>
          </div>
        </div>
        <div class="px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-semibold tracking-wide">
          千广传媒
        </div>
      </div>

      <!-- 步骤指示器 -->
      <div class="px-5 py-3 overflow-x-auto hide-scrollbar">
        <div class="flex items-center justify-between min-w-[320px]">
          <template v-for="(s, i) in steps" :key="i">
            <div class="flex flex-col items-center gap-1.5 relative z-10 flex-1">
              <div 
                class="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-500 ease-out shadow-sm"
                :class="formStore.step > i + 1 ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-white shadow-emerald-200/50' : formStore.step === i + 1 ? 'bg-gradient-to-tr from-brand-600 to-brand-400 text-white shadow-brand-300/50 scale-110' : 'bg-gray-100 text-gray-400 border border-gray-200/50'"
              >
                <svg v-if="formStore.step > i + 1" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
                </svg>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="text-[11px] whitespace-nowrap transition-colors duration-300"
                :class="formStore.step === i + 1 ? 'text-brand-600 font-bold tracking-wide' : 'text-gray-400 font-medium'">{{ s }}</span>
            </div>
            <!-- 连接线 -->
            <div v-if="i < steps.length - 1" class="flex-1 h-[2px] -mt-5 mx-1 rounded-full transition-colors duration-500 relative z-0"
                 :class="formStore.step > i + 1 ? 'bg-emerald-300' : 'bg-gray-200'">
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 步骤内容容器 -->
    <div class="px-4 pt-6 max-w-lg mx-auto transition-all duration-300">
      <component :is="currentStepComponent" />
    </div>

    <!-- 底部悬浮操作区 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100/50 p-4 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-20">
      <div class="max-w-lg mx-auto flex gap-4">
        <button
          v-if="formStore.step > 1"
          @click="prevStep"
          class="w-1/3 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl text-sm font-semibold cursor-pointer transition-all active:scale-95 shadow-sm"
        >上一步</button>
        <button
          v-if="formStore.step < 4"
          @click="nextStep"
          class="flex-1 py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-2xl text-sm font-semibold cursor-pointer transition-all active:scale-95 shadow-float"
        >下一步</button>
        <button
          v-if="formStore.step === 4"
          @click="handleSubmit"
          :disabled="submitting"
          class="flex-1 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-2xl text-sm font-semibold cursor-pointer transition-all active:scale-95 shadow-[0_12px_32px_rgba(16,185,129,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span class="flex items-center justify-center gap-2">
            <svg v-if="submitting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ submitting ? '正在提交...' : '确认并提交登记表' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast, showConfirmDialog } from 'vant'
import { useFormStore } from '../stores/form'
import { candidateApi } from '../api/index'
import Step1Basic from './form/Step1Basic.vue'
import Step2Education from './form/Step2Education.vue'
import Step3Work from './form/Step3Work.vue'
import Step4Family from './form/Step4Family.vue'

const router = useRouter()
const formStore = useFormStore()
const submitting = ref(false)
// 草稿模式：有草稿但 tempToken 已失效（如浏览器重开后）
const isDraftMode = ref(false)

onMounted(() => {
  const tempToken = sessionStorage.getItem('tempToken')
  const hasDraft = !!formStore.interviewNo && !!localStorage.getItem('interview_form_draft')
  if (!tempToken && !hasDraft) {
    // 既没有 token 也没有草稿，直接回首页
    router.replace('/')
  } else if (!tempToken && hasDraft) {
    // 草稿恢复模式：有草稿但 token 不存在（浏览器关闭后 sessionStorage 被清空）
    isDraftMode.value = true
    showToast({ type: 'text', message: '草稿已恢复，提交前需重新验证序号', duration: 3000 })
  }
})

const steps = ['基本信息', '教育背景', '工作经历', '家庭成员']
const stepComponents = [Step1Basic, Step2Education, Step3Work, Step4Family]
const currentStepComponent = computed(() => stepComponents[formStore.step - 1])

function prevStep() { formStore.setStep(formStore.step - 1) }

function nextStep() {
    // 简单必填校验
  if (formStore.step === 1) {
    const b = formStore.basic
    if (!b.name || !b.gender || !b.birthDate || !b.phone || !b.hometown || !b.ethnicity || !b.address || !b.commuteType || !b.estimatedCommuteTime || !b.diseaseHistory || !b.expectedSalary || !b.interviewPosition || !b.expectedStart || !b.recruitmentSource) {
      showToast({ type: 'fail', message: '请完善带星号(*)的必填项' })
      return
    }
    if (!/^1\d{10}$/.test(b.phone)) {
      showToast({ type: 'fail', message: '请输入正确的11位手机号' })
      return
    }
    if (b.recruitmentSource === '内部推荐' && !b.recruitmentDetail) {
      showToast({ type: 'fail', message: '请输入推荐人姓名' })
      return
    }
    if (b.recruitmentSource === '其他' && !b.recruitmentDetail) {
      showToast({ type: 'fail', message: '请注明招聘信息来源' })
      return
    }
  } else if (formStore.step === 2) {
    if (formStore.education.length === 0) {
      showToast({ type: 'fail', message: '请至少添加一条教育经历' })
      return
    }
    // 检查是否有未填完的教育记录
    const hasEmpty = formStore.education.some(e => !e.degree || !e.startDate || !e.endDate || !e.school || !e.major)
    if (hasEmpty) {
      showToast({ type: 'fail', message: '请完善已添加的教育经历信息' })
      return
    }
  } else if (formStore.step === 3) {
    if (!formStore.hasNoWorkExp && formStore.work.length === 0) {
      showToast({ type: 'fail', message: '请添加工作经历，或勾选上方无工作经历选项' })
      return
    }
    if (!formStore.hasNoWorkExp) {
      const hasEmpty = formStore.work.some(w => !w.company || !w.startDate || !w.endDate || !w.jobContent || !w.leaveReason)
      if (hasEmpty) {
        showToast({ type: 'fail', message: '请完善已添加的工作经历信息' })
        return
      }
    }
  }

  formStore.setStep(formStore.step + 1)
  window.scrollTo(0, 0)
}

async function handleSubmit() {
  // 草稿模式下 tempToken 已失效，需引导重新验证序号
  if (isDraftMode.value || !sessionStorage.getItem('tempToken')) {
    try {
      await showConfirmDialog({
        title: '需要重新验证',
        message: '您的验证码已过期，需要重新输入面试序号以完成提交。',
        confirmButtonText: '去验证',
        cancelButtonText: '取消'
      })
      router.push('/')
    } catch {}
    return
  }
  try {
    await showConfirmDialog({ title: '确认提交', message: '提交后不可修改，确认提交面试登记表？', confirmButtonText: '确认提交', cancelButtonText: '再看看' })
  } catch {
    return // 用户点了"再看看"
  }
  submitting.value = true
  try {
    const payload = {
      basic: formStore.basic,
      education: formStore.education,
      work: formStore.work,
      family: formStore.family
    }
    const res: any = await candidateApi.submit(payload)
    if (res.code === 200) {
      formStore.clearDraft()
      sessionStorage.removeItem('tempToken')
      showToast({ type: 'success', message: '提交成功！' })
      router.push('/success')
    } else {
      showToast({ type: 'fail', message: res.message || '提交失败，请重试' })
    }
  } catch (err: any) {
    showToast({ type: 'fail', message: err.message || '提交失败，请重试' })
  } finally {
    submitting.value = false
  }
}
</script>
