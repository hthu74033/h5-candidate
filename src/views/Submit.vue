<template>
  <div class="min-h-screen bg-surface flex flex-col items-center justify-center px-6 py-12 font-sans selection:bg-brand-200 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-20 -right-20 w-80 h-80 bg-brand-400/10 rounded-full blur-[80px]"></div>
      <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-400/10 rounded-full blur-[80px]"></div>
    </div>

    <!-- 成功动画 -->
    <div class="relative mb-8 z-10">
      <div class="w-28 h-28 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-[2rem] flex items-center justify-center shadow-[0_20px_40px_rgba(16,185,129,0.3)] animate-bounce shadow-emerald-500/30">
        <svg class="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-emerald-500/20 rounded-full blur-xl"></div>
    </div>

    <div class="text-center z-10 mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 tracking-wide">登记完成！</h1>
      <p class="text-gray-500 text-sm font-medium">面试信息已成功提交，请在候客区等待叫号</p>
    </div>

    <!-- 序号展示 -->
    <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-soft border border-white p-8 w-full max-w-xs text-center mb-8 relative z-10 hover:shadow-float transition-all">
      <p class="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">您的面试序号</p>
      <div class="text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400 mb-4 font-mono">{{ interviewNo }}</div>
      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50/80 border border-emerald-100 text-emerald-600 rounded-full text-sm font-semibold shadow-sm mb-4">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        等待叫号
      </div>
      <div class="text-xs text-rose-500 bg-rose-50 rounded-xl px-3 py-2.5 border border-rose-100/50 flex items-center justify-center gap-1.5 font-medium">
        <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        <span>请截图保留该序号</span>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="w-full max-w-xs space-y-3 z-10">
      <div class="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm">
        <div class="w-7 h-7 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold shrink-0 shadow-inner-soft">1</div>
        <p class="text-sm text-gray-600 font-medium leading-relaxed">请在候客区落座，保持手机畅通</p>
      </div>
      <div class="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm">
        <div class="w-7 h-7 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold shrink-0 shadow-inner-soft">2</div>
        <p class="text-sm text-gray-600 font-medium leading-relaxed">工作人员将按登记完成先后顺序叫号，登记越早排队越靠前</p>
      </div>
      <div class="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm">
        <div class="w-7 h-7 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-bold shrink-0 shadow-inner-soft">3</div>
        <p class="text-sm text-gray-600 font-medium leading-relaxed">等候过程中如有问题，可向前台工作人员咨询</p>
      </div>
    </div>

    <!-- 结果查询入口 -->
    <div class="mt-8 z-10 w-full max-w-xs">
      <button @click="$router.push('/result')" class="w-full py-3.5 bg-brand-50 hover:bg-brand-100 text-brand-600 rounded-xl text-sm font-semibold transition-colors border border-brand-200/50 shadow-sm flex items-center justify-center gap-2 cursor-pointer">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        查询面试结果与评价
      </button>
    </div>

    <!-- 祝福语 -->
    <div class="mt-10 text-center z-10">
      <p class="text-brand-600 font-semibold tracking-wide">千广传媒祝您面试顺利！</p>
      <p class="text-gray-400 text-xs mt-2 font-medium">{{ currentTime }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormStore } from '../stores/form'

const formStore = useFormStore()
const interviewNo = computed(() => formStore.interviewNo || sessionStorage.getItem('interviewNo') || '-----')
const currentTime = computed(() =>
  new Date().toLocaleString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
)
</script>
