import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'interview_form_draft'

export interface BasicInfo {
  name: string; gender: string; birthDate: string; phone: string;
  wechatName: string; wechatId: string; hometown: string; ethnicity: string;
  maritalStatus: string; address: string; commuteType: string; estimatedCommuteTime: string;
  diseaseHistory: string; expectedSalary: string; interviewPosition: string;
  expectedStart: string; hobbies: string; selfEvaluation: string;
  recruitmentSource: string; recruitmentDetail: string;
}

export interface EducationItem {
  degree: string; startDate: string; endDate: string; school: string; major: string; isFreshGraduate: boolean;
}
export interface WorkItem {
  company: string; startDate: string; endDate: string; jobContent: string; leaveReason: string;
}
export interface FamilyItem {
  name: string; relationship: string; age: number | string; company: string; position: string; emergencyPhone: string;
}

function loadDraft() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      const data = JSON.parse(raw)
      // 检查草稿日期是否为今天
      const today = new Date().toISOString().split('T')[0]
      if (data.date !== today) {
        localStorage.removeItem(STORAGE_KEY)
        return null
      }
      return data
    } catch (e) {
      return null
    }
  }
  return null
}

export const useFormStore = defineStore('form', () => {
  const draft = loadDraft()

  const interviewNo = ref<string>(draft?.interviewNo || '')
  const step = ref<number>(draft?.step || 1)
  const basic = ref<BasicInfo>(draft?.basic || {
    name: '', gender: 'male', birthDate: '', phone: '',
    wechatName: '', wechatId: '', hometown: '', ethnicity: '',
    maritalStatus: 'single', address: '', commuteType: '', estimatedCommuteTime: '',
    diseaseHistory: '', expectedSalary: '', interviewPosition: '',
    expectedStart: '', hobbies: '', selfEvaluation: '',
    recruitmentSource: '', recruitmentDetail: ''
  })
  const education = ref<EducationItem[]>(draft?.education || [])
  const work = ref<WorkItem[]>(draft?.work || [])
  const family = ref<FamilyItem[]>(draft?.family || [{ name: '', relationship: '', age: '', company: '', position: '', emergencyPhone: '' }])
  const hasNoWorkExp = ref<boolean>(draft?.hasNoWorkExp || false)

  // 实时缓存到localStorage，防数据丢失
  function saveDraft() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      interviewNo: interviewNo.value, step: step.value,
      basic: basic.value, education: education.value,
      work: work.value, family: family.value,
      hasNoWorkExp: hasNoWorkExp.value,
      date: new Date().toISOString().split('T')[0]
    }))
  }

  watch([interviewNo, step, basic, education, work, family, hasNoWorkExp], saveDraft, { deep: true })

  function clearDraft() {
    localStorage.removeItem(STORAGE_KEY)
  }

  function setInterviewNo(no: string) { interviewNo.value = no }
  function setStep(s: number) { step.value = s }

  function addEducation() {
    education.value.push({ degree: '', startDate: '', endDate: '', school: '', major: '', isFreshGraduate: false })
  }
  function removeEducation(i: number) { education.value.splice(i, 1) }

  function addWork() {
    work.value.push({ company: '', startDate: '', endDate: '', jobContent: '', leaveReason: '' })
  }
  function removeWork(i: number) { work.value.splice(i, 1) }

  function addFamily() {
    if (family.value.length >= 3) return
    family.value.push({ name: '', relationship: '', age: '', company: '', position: '', emergencyPhone: '' })
  }
  function removeFamily(i: number) { family.value.splice(i, 1) }

  return {
    interviewNo, step, basic, education, work, family, hasNoWorkExp,
    setInterviewNo, setStep, addEducation, removeEducation,
    addWork, removeWork, addFamily, removeFamily, clearDraft, saveDraft
  }
})
