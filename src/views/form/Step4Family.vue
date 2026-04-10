<template>
  <div class="space-y-5">
    <div class="bg-amber-50/80 border border-amber-200/50 rounded-3xl p-4 text-sm text-amber-700 flex items-start gap-3 shadow-sm">
      <div class="w-8 h-8 rounded-full bg-amber-100/80 flex items-center justify-center shrink-0 mt-0.5">
        <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>
      </div>
      <span class="leading-relaxed text-amber-800/80"><strong class="font-semibold text-amber-600">面试结果紧急联系人</strong>（*当面试结果无法通知/送达到您本人时，才会通知您的紧急联系人。）</span>
    </div>

    <div v-for="(f, index) in formStore.family" :key="index" class="bg-white rounded-3xl shadow-soft overflow-hidden border border-gray-100 transition-all hover:shadow-float">
      <div class="px-5 py-4 bg-amber-50/50 border-b border-amber-100/50 flex items-center justify-between">
        <h3 class="font-semibold text-amber-700 text-sm flex items-center gap-2">
          <div class="w-1.5 h-4 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
          家庭成员 {{ index + 1 }}
        </h3>
        <button @click="formStore.removeFamily(index)" class="text-rose-400 hover:text-rose-600 active:scale-95 transition-all text-xs flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          删除
        </button>
      </div>
      <div class="divide-y divide-gray-50 px-2">
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">姓名</label>
          <input v-model="f.name" type="text" placeholder="家庭成员姓名" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">关系</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="rel in relationships" :key="rel"
              @click="f.relationship = rel"
              class="px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border"
              :class="f.relationship === rel ? 'bg-amber-500 border-amber-500 text-white shadow-md' : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'">
              {{ rel }}
            </button>
            <input v-if="!relationships.includes(f.relationship) && f.relationship"
              v-model="f.relationship" type="text" placeholder="其他关系"
              class="flex-1 min-w-[80px] text-sm border border-gray-200 rounded-full px-3 py-1 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-gray-50" />
          </div>
        </div>
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">年龄</label>
          <input v-model="f.age" type="number" placeholder="年龄" min="1" max="120" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">工作单位</label>
          <input v-model="f.company" type="text" placeholder="工作单位或退休" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">职务</label>
          <input v-model="f.position" type="text" placeholder="职位/职称" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
        <div class="flex items-center px-3 py-3.5">
          <label class="w-20 text-sm text-gray-500 font-medium shrink-0">紧急电话</label>
          <input v-model="f.emergencyPhone" type="tel" placeholder="紧急联系电话" class="flex-1 text-sm text-gray-800 placeholder-gray-300 border-none outline-none bg-transparent focus:ring-0" />
        </div>
      </div>
    </div>

    <button v-if="formStore.family.length < 3"
      @click="formStore.addFamily()"
      class="w-full py-4 bg-white border-2 border-dashed border-amber-300 rounded-3xl text-amber-600 text-sm font-semibold hover:bg-amber-50 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-sm">
      <div class="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
        <svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
      </div>
      添加家庭成员（{{ formStore.family.length }}/3）
    </button>
    <div v-else class="text-center text-xs font-medium text-amber-500 py-3 bg-amber-50 rounded-2xl border border-amber-100">
      已达到最多 3 位家庭成员限制
    </div>

      <div v-if="formStore.family.length === 0" class="text-center py-8 text-gray-400 text-sm">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
      </div>
      可点击上方按钮添加家庭成员信息（选填）
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormStore } from '../../stores/form'
const formStore = useFormStore()
const relationships = ['父亲', '母亲', '配偶', '子女', '兄弟', '姐妹']
</script>
