<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a1128] via-[#102454] to-[#1565C0] flex flex-col items-center justify-center p-6">
    <!-- 背景装饰 (科技感微发光效果) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]"></div>
      <div class="absolute bottom-10 right-10 w-60 h-60 bg-blue-600/20 rounded-full blur-[100px]"></div>
      <!-- 增加一些网格线条营造科技感 -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgTCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
    </div>

    <div class="relative w-full max-w-sm">
      <!-- 品牌信息与标题 -->
      <div class="text-center mb-8">
        <div class="text-white/80 text-sm font-semibold tracking-widest mb-4">千广传媒</div>
        <div class="w-20 h-20 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(25,118,210,0.3)] border border-white/20">
          <svg class="w-10 h-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-white tracking-wide">面试登记预约</h1>
        <p class="text-blue-200/70 text-sm mt-3 font-light">请联系前台给获取您的面试序号并填写</p>
      </div>

      <!-- 玻璃拟物化卡片容器 -->
      <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
        
        <div class="text-center mb-6">
          <div class="text-base text-white/90 font-medium mb-1">请您输入5位面试序号</div>
          <div class="text-xs text-blue-200/50">示例：<span class="font-mono text-blue-300 font-medium tracking-wider">Bc01A</span></div>
        </div>

        <!-- 序号输入框 (科技风UI) -->
        <div class="flex justify-center gap-2 mb-8">
          <input
            v-for="i in 5"
            :key="i"
            :ref="el => { if(el) inputRefs[i-1] = el as HTMLInputElement }"
            v-model="chars[i-1]"
            type="text"
            maxlength="1"
            class="w-12 h-14 text-center text-2xl font-bold rounded-xl focus:outline-none transition-all uppercase bg-white/5 border border-white/20 text-white shadow-inner focus:bg-white/10 focus:border-blue-400 focus:shadow-[0_0_15px_rgba(96,165,250,0.3)]"
            :class="chars[i-1] ? 'border-blue-400/50 text-blue-300' : 'text-white'"
            @input="handleInput(i-1, $event)"
            @keydown.backspace="handleBackspace(i-1)"
            @paste.prevent="handlePaste($event)"
            style="text-transform: uppercase;"
          />
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="text-red-300 text-sm text-center mb-5 bg-red-900/30 border border-red-500/30 rounded-xl py-2.5 px-3 backdrop-blur-sm">
          {{ error }}
        </div>

        <!-- 已有草稿提示 -->
        <div v-if="hasDraft" class="mb-5 p-3 bg-blue-900/40 rounded-xl border border-blue-400/30 text-sm text-blue-200 flex items-center gap-2 backdrop-blur-sm">
          <svg class="w-4 h-4 shrink-0 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
          <span class="flex-1">检测到未提交草稿（序号：<span class="font-mono font-medium text-white">{{ formStore.interviewNo }}</span>）</span>
        </div>
        <div v-if="hasDraft" class="flex gap-3 mb-6">
          <button @click="continueDraft" class="flex-1 py-3 bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-sm font-medium cursor-pointer transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]">继续填写</button>
          <button @click="formStore.clearDraft(); hasDraft = false" class="px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 rounded-xl text-sm cursor-pointer transition-all">忽略</button>
        </div>

        <button
          @click="handleVerify"
          :disabled="loading || noInput.length !== 5"
          class="relative w-full py-4 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-base font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
        >
          <!-- 按钮发光特效 -->
          <div class="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          
          <span v-if="loading" class="flex items-center justify-center gap-2 relative z-10">
            <svg class="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            验证中...
          </span>
          <span v-else class="relative z-10 tracking-wide">验证并开始登记</span>
        </button>
      </div>
      
      <!-- 底部感谢语与结果查询/入职登记入口 -->
      <div class="mt-8 text-center space-y-4 flex flex-col items-center">
        <button @click="router.push('/result')" class="text-blue-300 hover:text-blue-200 text-sm font-medium transition-colors border-b border-blue-400/30 pb-0.5 inline-flex items-center gap-1 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          已参加面试？点击查询面试结果
        </button>
        
        <button @click="router.push('/onboarding')" class="text-green-400 hover:text-green-300 text-sm font-medium transition-colors border-b border-green-500/30 pb-0.5 inline-flex items-center gap-1 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          收到录取通知？点击补录入职信息
        </button>

        <p class="text-blue-200/50 text-xs font-light tracking-wide mt-6">感谢您对千广传媒的关注，期待您的加入</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { candidateApi } from '../api/index'
import { useFormStore } from '../stores/form'

const router = useRouter()
const formStore = useFormStore()
const loading = ref(false)
const error = ref('')
const chars = ref<string[]>(['', '', '', '', ''])
const inputRefs = ref<HTMLInputElement[]>([])
const hasDraft = ref(false)

const noInput = computed(() => chars.value.join(''))

onMounted(() => {
  hasDraft.value = !!formStore.interviewNo && !!localStorage.getItem('interview_form_draft')
  if (inputRefs.value[0]) inputRefs.value[0].focus()
})

function handleInput(index: number, event: Event) {
  const input = event.target as HTMLInputElement
  const val = input.value.slice(-1)
  chars.value[index] = val
  error.value = ''
  if (val && index < 4) {
    inputRefs.value[index + 1]?.focus()
  }
}

function handleBackspace(index: number) {
  if (!chars.value[index] && index > 0) {
    chars.value[index - 1] = ''
    inputRefs.value[index - 1]?.focus()
  }
}

function handlePaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData('text')?.trim() || ''
  if (text.length === 5) {
    for (let i = 0; i < 5; i++) chars.value[i] = text[i] || ''
    inputRefs.value[4]?.focus()
  }
}

function continueDraft() {
  // 草稿恢复：直接跳转，不写假 token；FormLayout 会检测草稿模式并在提交前引导重新验证
  router.push('/form')
}

async function handleVerify() {
  if (noInput.value.length !== 5) return
  loading.value = true
  error.value = ''
  try {
    const res: any = await candidateApi.verify(noInput.value)
    if (res.code === 200) {
      sessionStorage.setItem('tempToken', res.data.tempToken)
      sessionStorage.setItem('interviewNo', res.data.interviewNo)
      formStore.setInterviewNo(res.data.interviewNo)
      formStore.setStep(1)
      showToast({ type: 'success', message: '验证成功！' })
      router.push('/form')
    } else {
      error.value = res.message || '验证失败'
    }
  } catch (err: any) {
    error.value = err.message || '验证失败，请检查网络或联系前台'
  } finally {
    loading.value = false
  }
}
</script>
