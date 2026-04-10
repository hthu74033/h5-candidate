<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a1128] via-[#102454] to-[#1565C0] flex flex-col items-center justify-center p-5 pb-16 relative">
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-8 w-48 h-48 bg-blue-500/20 rounded-full blur-[90px]"></div>
      <div class="absolute bottom-16 right-8 w-64 h-64 bg-indigo-600/20 rounded-full blur-[110px]"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px]"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgTCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
    </div>

    <div class="relative w-full max-w-sm">
      <!-- 品牌区 -->
      <div class="text-center mb-7">
        <div class="text-white/80 text-sm font-semibold tracking-widest mb-4">千广传媒</div>
        <div class="w-18 h-18 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(25,118,210,0.3)] border border-white/20" style="width:72px;height:72px">
          <svg class="w-9 h-9 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 class="text-[22px] font-bold text-white tracking-wide">面试结果查询</h1>
        <p class="text-blue-200/60 text-sm mt-2 font-light">输入面试序号与手机号查看您的面试结果</p>
      </div>

      <!-- ─────────── 验证卡片（未验证态） ─────────── -->
      <div v-if="!verified" class="bg-white/10 backdrop-blur-lg rounded-3xl p-7 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 relative overflow-hidden mb-5">
        <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>

        <!-- 序号输入 -->
        <div class="mb-5">
          <div class="text-white/80 text-sm font-medium mb-2">面试序号（5位）</div>
          <div class="flex justify-center gap-2">
            <input
              v-for="i in 5" :key="i"
              :ref="el => { if(el) noRefs[i-1] = el as HTMLInputElement }"
              v-model="noChars[i-1]"
              type="text" maxlength="1"
              class="w-12 h-14 text-center text-2xl font-bold rounded-xl focus:outline-none transition-all uppercase bg-white/5 border border-white/20 text-white shadow-inner focus:bg-white/10 focus:border-blue-400 focus:shadow-[0_0_15px_rgba(96,165,250,0.3)]"
              :class="noChars[i-1] ? 'border-blue-400/60 text-blue-300' : ''"
              @input="handleNoInput(i-1, $event)"
              @keydown.backspace="handleNoBackspace(i-1)"
              @paste.prevent="handleNoPaste($event)"
              style="text-transform: uppercase;"
            />
          </div>
        </div>

        <!-- 手机号输入 -->
        <div class="mb-6">
          <div class="text-white/80 text-sm font-medium mb-2">注册手机号</div>
          <input
            v-model="phone"
            type="tel" maxlength="11" placeholder="请输入报名时的手机号"
            class="w-full h-12 bg-white/5 border border-white/20 rounded-xl px-4 text-white placeholder-white/30 focus:outline-none focus:bg-white/10 focus:border-blue-400 focus:shadow-[0_0_12px_rgba(96,165,250,0.25)] transition-all text-base"
            @keydown.enter="handleQuery"
          />
        </div>

        <!-- 错误提示 -->
        <div v-if="queryError" class="mb-4 text-red-300 text-sm text-center bg-red-900/30 border border-red-500/30 rounded-xl py-2.5 px-3">
          {{ queryError }}
        </div>

        <!-- 查询按钮 -->
        <button
          @click="handleQuery"
          :disabled="queryLoading || noInput.length !== 5 || phone.length < 11"
          class="relative w-full py-4 overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl text-base font-medium transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
        >
          <div class="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          <span v-if="queryLoading" class="flex items-center justify-center gap-2 relative z-10">
            <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            查询中...
          </span>
          <span v-else class="relative z-10 tracking-wide">查询结果</span>
        </button>
      </div>

      <!-- ─────────── 结果展示区（验证后） ─────────── -->
      <template v-else>
        <!-- 序号标签 -->
        <div class="flex items-center justify-center gap-2 mb-4">
          <div class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-blue-200 text-xs font-mono">
            序号 {{ resultData.interviewNo }}
          </div>
          <button @click="resetQuery" class="text-white/40 text-xs hover:text-white/70 transition-colors">重新查询</button>
        </div>

        <!-- 结果卡片：等待态 -->
        <div v-if="!resultData.isSent" class="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 mb-4 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
          <div class="flex flex-col items-center py-4 text-center">
            <div class="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <svg class="w-8 h-8 text-blue-300 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div class="text-white font-semibold text-base mb-2">结果评估中</div>
            <div class="text-blue-200/70 text-sm leading-relaxed">
              您的面试结果正在评估中<br>
              <span class="text-blue-300 font-medium">预计 1-2 个工作日内</span>通知<br>
              请耐心等待，感谢您的配合
            </div>
            <div class="mt-4 px-4 py-2 bg-blue-500/10 border border-blue-400/20 rounded-xl text-blue-200/60 text-xs">
              结果发布后您可重新打开本页面查询
            </div>
          </div>
        </div>

        <!-- 结果卡片：录用态 -->
        <div v-else-if="resultData.isHired" class="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-emerald-400/30 mb-4 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70"></div>
          <div class="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div class="flex flex-col items-center py-2 text-center">
            <div class="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(16,185,129,0.35)]">
              <svg class="w-8 h-8 text-emerald-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <div class="text-emerald-300 font-bold text-lg mb-3">🎉 恭喜您通过面试！</div>
            <div class="text-blue-100/80 text-sm leading-relaxed mb-5 bg-white/5 rounded-2xl p-4 border border-white/10">
              您已顺利通过本次面试，我们期待您的加入！<br>
              HR 团队将尽快与您联系确认入职安排，<br>
              请填写您预计的入职时间，方便我们提前准备。
            </div>

            <!-- 已填写入职时间（显示当前值 + 可修改入口） -->
            <div v-if="(onboardSubmitted || resultData.expectedOnboardDate) && !onboardEditing" class="w-full">
              <div class="p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-2xl text-center mb-3">
                <div class="text-emerald-300 text-sm font-medium mb-1">预计入职时间</div>
                <div class="text-white text-lg font-bold">{{ (resultData.expectedOnboardDate || onboardDate).substring(0, 16) }}</div>
                <div class="text-emerald-300/60 text-xs mt-1">已登记，HR 将与您确认</div>
              </div>
              <button
                @click="onboardEditing = true"
                class="w-full py-2.5 bg-white/5 border border-white/20 hover:border-emerald-400/50 text-emerald-300/80 hover:text-emerald-300 rounded-xl text-sm font-medium transition-all cursor-pointer"
              >修改入职时间</button>
            </div>

            <!-- 填写 / 修改入职时间表单 -->
            <div v-else class="w-full">
              <div class="text-white/70 text-sm font-medium mb-2 text-left">选择预计入职日期和时间（13:30 - 20:00）</div>
              <div class="flex gap-2 mb-3">
                <input
                  v-model="onboardDate"
                  type="date"
                  :min="minDate"
                  class="flex-1 h-12 bg-white/5 border border-white/20 rounded-xl px-3 text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all"
                  style="color-scheme: dark;"
                />
                <select
                  v-model="onboardTime"
                  class="w-28 h-12 bg-white/5 border border-white/20 rounded-xl px-3 text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all appearance-none text-center"
                >
                  <option v-for="t in timeOptions" :key="t" :value="t" class="bg-gray-800 text-white">{{ t }}</option>
                </select>
              </div>
              <div v-if="onboardError" class="text-red-300 text-sm mb-3 text-center">{{ onboardError }}</div>
              <div class="flex gap-2">
                <button
                  v-if="onboardEditing"
                  @click="onboardEditing = false"
                  class="flex-1 py-3.5 bg-white/5 border border-white/20 text-white/60 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                >取消</button>
                <button
                  @click="submitOnboard"
                  :disabled="onboardLoading || !onboardDate || !onboardTime"
                  class="flex-1 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-sm font-semibold transition-all shadow-[0_0_16px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span v-if="onboardLoading" class="flex items-center justify-center gap-2">
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    提交中...
                  </span>
                  <span v-else>{{ onboardEditing ? '确认修改' : '确认入职时间' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 结果卡片：未录用态 -->
        <div v-else class="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-amber-400/20 mb-4 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50"></div>
          <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div class="flex flex-col items-center py-2 text-center">
            <div class="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <div class="text-amber-300 font-semibold text-base mb-3">感谢您的参与</div>
            <div class="text-blue-100/80 text-sm leading-relaxed bg-white/5 rounded-2xl p-4 border border-white/10">
              感谢您参加本次面试！经过综合评估，<br>
              您目前与岗位需求暂不匹配，非常抱歉。<br>
              <span class="text-blue-300/80 text-xs mt-2 block">感谢您对千广传媒的关注，祝您求职顺利，一切安好！</span>
            </div>
          </div>
        </div>

        <!-- ─────────── 满意度问卷（验证后始终显示） ─────────── -->
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/20 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>

          <!-- 问卷标题（可折叠） -->
          <button @click="surveyExpanded = !surveyExpanded" class="w-full flex items-center justify-between p-5 text-left cursor-pointer group">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center relative">
                <svg class="w-5 h-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
                <span v-if="!surveySubmitted && !surveyExpanded" class="absolute -top-1 -right-1 flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
              </div>
              <div>
                <div class="text-white font-bold text-base flex items-center gap-2">
                  匿名评价
                  <span v-if="!surveySubmitted" class="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">花1分钟帮我们改进</span>
                </div>
                <div class="text-white/50 text-xs mt-0.5">放心填写，此评价全程匿名且对面试结果无影响</div>
              </div>
            </div>
            <svg class="w-5 h-5 text-white/40 transition-transform duration-300 group-hover:text-white/70" :class="surveyExpanded ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- 问卷内容 -->
          <div v-show="surveyExpanded" class="px-5 pb-6 space-y-5">
            <!-- 总体评分 -->
            <div>
              <div class="text-white/80 text-sm font-semibold mb-2.5">总体满意度 <span class="text-rose-400">*</span></div>
              <div class="flex gap-2">
                <button
                  v-for="n in 5" :key="n"
                  @click="survey.overall_rating = n"
                  class="flex-1 h-12 rounded-xl text-lg font-semibold transition-all cursor-pointer border"
                  :class="survey.overall_rating && survey.overall_rating >= n
                    ? 'bg-amber-500/30 border-amber-400/60 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    : 'bg-white/5 border-white/15 text-white/20 hover:border-white/30'"
                >★</button>
              </div>
              <div class="flex justify-between mt-1.5 text-xs text-white/40 px-1">
                <span>很糟糕</span><span>超棒的体验</span>
              </div>
            </div>

            <!-- 服务态度 -->
            <div>
              <div class="text-white/70 text-sm font-medium mb-2">服务态度</div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="opt in ['非常热情', '友好专业', '一般', '待改进']" :key="opt"
                  @click="survey.service_attitude = opt"
                  class="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer"
                  :class="survey.service_attitude === opt ? 'bg-blue-500/30 border-blue-400/60 text-blue-300' : 'bg-white/5 border-white/15 text-white/50 hover:border-white/30'"
                >{{ opt }}</button>
              </div>
            </div>

            <!-- 环境满意度 -->
            <div>
              <div class="text-white/70 text-sm font-medium mb-2">面试环境</div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="opt in ['整洁舒适', '尚可', '一般', '较差']" :key="opt"
                  @click="survey.environment_rating = opt"
                  class="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer"
                  :class="survey.environment_rating === opt ? 'bg-blue-500/30 border-blue-400/60 text-blue-300' : 'bg-white/5 border-white/15 text-white/50 hover:border-white/30'"
                >{{ opt }}</button>
              </div>
            </div>

            <!-- 流程满意度 -->
            <div>
              <div class="text-white/70 text-sm font-medium mb-2">面试流程</div>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="opt in ['高效顺畅', '正常', '等待较长', '流程混乱']" :key="opt"
                  @click="survey.process_rating = opt"
                  class="px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer"
                  :class="survey.process_rating === opt ? 'bg-blue-500/30 border-blue-400/60 text-blue-300' : 'bg-white/5 border-white/15 text-white/50 hover:border-white/30'"
                >{{ opt }}</button>
              </div>
            </div>

            <!-- 建议文本 -->
            <div>
              <div class="text-white/70 text-sm font-medium mb-2">意见与建议</div>
              <textarea
                v-model="survey.suggestions"
                rows="3"
                placeholder="您觉得我们在哪些方面还可以做得更好？"
                class="w-full bg-white/5 border border-white/15 rounded-xl p-3.5 text-white/90 placeholder-white/20 text-sm focus:outline-none focus:border-purple-400/60 focus:bg-white/10 focus:shadow-[0_0_12px_rgba(147,51,234,0.2)] transition-all resize-none"
              ></textarea>
            </div>

            <!-- 提交成功 -->
            <div v-if="surveySubmitted" class="text-center py-4">
              <div class="text-emerald-300 font-semibold text-sm mb-1">✓ 评价已提交</div>
              <div class="text-white/40 text-xs">感谢您的宝贵反馈！</div>
            </div>

            <!-- 错误提示 -->
            <div v-if="surveyError" class="text-red-300 text-sm text-center bg-red-900/30 border border-red-500/30 rounded-xl py-2.5 px-3">
              {{ surveyError }}
            </div>

            <!-- 提交按钮 -->
            <button
              v-if="!surveySubmitted"
              @click="submitSurvey"
              :disabled="surveyLoading || !survey.overall_rating"
              class="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl text-base font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] disabled:opacity-50 disabled:grayscale cursor-pointer"
            >
              <span v-if="surveyLoading" class="flex items-center justify-center gap-2">
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                提交中...
              </span>
              <span v-else>提交评价</span>
            </button>
          </div>
        </div>
      </template>

      <!-- 底部 -->
      <div class="mt-8 text-center">
        <p class="text-blue-200/40 text-xs font-light tracking-wide">感谢您对千广传媒的关注</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { resultApi } from '../api/index'
import { useFormStore } from '../stores/form'

// ── 验证态 ───────────────────────────────────────
const verified = ref(false)
const noChars = ref<string[]>(['', '', '', '', ''])
const noRefs = ref<HTMLInputElement[]>([])
const phone = ref('')
const queryLoading = ref(false)
const queryError = ref('')
const resultToken = ref('')
const resultData = ref<{
  interviewNo: string
  isSent: boolean
  isHired: boolean | null
  rejectReason: string | null
  expectedOnboardDate: string | null
}>({
  interviewNo: '',
  isSent: false,
  isHired: null,
  rejectReason: null,
  expectedOnboardDate: null,
})

const noInput = computed(() => noChars.value.join(''))
const formStore = useFormStore()

onMounted(() => {
  // 自动填充序号和手机号，方便刚填完表的用户查询
  const savedNo = formStore.interviewNo || sessionStorage.getItem('interviewNo')
  const savedPhone = formStore.basic.phone

  if (savedNo && savedNo.length === 5) {
    for (let i = 0; i < 5; i++) {
      noChars.value[i] = savedNo[i]
    }
  }
  if (savedPhone) {
    phone.value = savedPhone
  }
  
  // 如果两个都没填，自动聚焦第一个格子
  if (!savedNo && noRefs.value[0]) {
    noRefs.value[0].focus()
  }
})

// 序号输入控制
function handleNoInput(index: number, event: Event) {
  const val = (event.target as HTMLInputElement).value.slice(-1)
  noChars.value[index] = val
  queryError.value = ''
  if (val && index < 4) noRefs.value[index + 1]?.focus()
}
function handleNoBackspace(index: number) {
  if (!noChars.value[index] && index > 0) {
    noChars.value[index - 1] = ''
    noRefs.value[index - 1]?.focus()
  }
}
function handleNoPaste(event: ClipboardEvent) {
  const text = event.clipboardData?.getData('text')?.trim() || ''
  if (text.length === 5) {
    for (let i = 0; i < 5; i++) noChars.value[i] = text[i] || ''
    noRefs.value[4]?.focus()
  }
}

async function handleQuery() {
  if (noInput.value.length !== 5 || phone.value.length < 11) return
  queryLoading.value = true
  queryError.value = ''
  try {
    const res: any = await resultApi.query(noInput.value, phone.value)
    resultToken.value = res.data.resultToken
    resultData.value = {
      interviewNo: res.data.interviewNo,
      isSent: res.data.isSent,
      isHired: res.data.isHired,
      rejectReason: res.data.rejectReason,
      expectedOnboardDate: res.data.expectedOnboardDate,
    }
    verified.value = true
  } catch (e: any) {
    queryError.value = e.message || '查询失败，请检查序号和手机号是否正确'
  } finally {
    queryLoading.value = false
  }
}

function resetQuery() {
  verified.value = false
  noChars.value = ['', '', '', '', '']
  phone.value = ''
  queryError.value = ''
  resultToken.value = ''
  surveySubmitted.value = false
}

// ── 入职时间提交 ───────────────────────────────────
const onboardDate = ref('')
const onboardTime = ref('13:30')
const onboardLoading = ref(false)
const onboardError = ref('')
const onboardSubmitted = ref(false)
const onboardEditing = ref(false)

// 点击"修改入职时间"时，回填当前已填写的值
watch(onboardEditing, (editing) => {
  if (editing) {
    const current = resultData.value.expectedOnboardDate || onboardDate.value
    if (current && current.length >= 16) {
      onboardDate.value = current.substring(0, 10)
      onboardTime.value = current.substring(11, 16)
    }
    onboardError.value = ''
  }
})

const minDate = computed(() => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
})

const timeOptions = computed(() => {
  const opts = []
  // 从 13:30 开始到 20:00，每 30 分钟一个选项
  let h = 13, m = 30
  while (h < 20 || (h === 20 && m === 0)) {
    const hh = String(h).padStart(2, '0')
    const mm = String(m).padStart(2, '0')
    opts.push(`${hh}:${mm}`)
    m += 30
    if (m === 60) { h++; m = 0 }
  }
  return opts
})

async function submitOnboard() {
  if (!onboardDate.value || !onboardTime.value) return
  onboardLoading.value = true
  onboardError.value = ''
  try {
    const dateTimeStr = `${onboardDate.value} ${onboardTime.value}:00`
    await resultApi.submitOnboard(resultToken.value, dateTimeStr)
    resultData.value.expectedOnboardDate = dateTimeStr
    onboardSubmitted.value = true
    onboardEditing.value = false
  } catch (e: any) {
    onboardError.value = e.message || '提交失败，请重试'
  } finally {
    onboardLoading.value = false
  }
}

// ── 问卷 ─────────────────────────────────────────
const surveyExpanded = ref(true) // 默认展开问卷
const surveySubmitted = ref(false)
const surveyLoading = ref(false)
const surveyError = ref('')
const survey = ref({
  overall_rating: null as number | null,
  service_attitude: '',
  environment_rating: '',
  process_rating: '',
  suggestions: '',
})

async function submitSurvey() {
  surveyLoading.value = true
  surveyError.value = ''
  try {
    await resultApi.submitSurvey(resultToken.value, {
      overall_rating: survey.value.overall_rating,
      service_attitude: survey.value.service_attitude,
      environment_rating: survey.value.environment_rating,
      process_rating: survey.value.process_rating,
      suggestions: survey.value.suggestions,
    })
    surveySubmitted.value = true
  } catch (e: any) {
    surveyError.value = e.message || '提交失败，请重试'
  } finally {
    surveyLoading.value = false
  }
}
</script>
