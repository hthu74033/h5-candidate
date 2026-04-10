import axios from 'axios'

const baseURL = import.meta.env.PROD
  ? `${import.meta.env.VITE_API_BASE_URL}/api`
  : '/api'

const http = axios.create({ baseURL, timeout: 15000 })

http.interceptors.request.use((config) => {
  const tempToken = sessionStorage.getItem('tempToken')
  if (tempToken) config.headers['Authorization'] = `Bearer ${tempToken}`
  return config
})

http.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error('API错误:', err.response?.data || err.message)
    return Promise.reject(err.response?.data || { message: '网络错误，请重试' })
  }
)

export default http

export const candidateApi = {
  verify: (interviewNo: string) => http.post('/interview/verify', { interviewNo }),
  submit: (data: any) => http.post('/candidate/submit', data),
  getStatus: (no: string) => http.get(`/candidate/${no}/status`),
}

// 面试结果查询 API（不依赖 tempToken，使用 resultToken）
export const resultApi = {
  query: (interviewNo: string, phone: string) =>
    http.post('/candidate/result/query', { interviewNo, phone }),
  submitOnboard: (resultToken: string, expectedOnboardDate: string) =>
    http.post('/candidate/result/onboard', { resultToken, expectedOnboardDate }),
  submitSurvey: (resultToken: string, surveyData: {
    overall_rating?: number | null;
    service_attitude?: string;
    environment_rating?: string;
    process_rating?: string;
    suggestions?: string;
  }) => http.post('/candidate/survey', { resultToken, ...surveyData }),
}

export const onboardingApi = {
  verify: (data: { interviewNo: string; phone: string }) => http.post('/onboarding/candidate/verify', data),
  getBaseInfo: (interviewNo: string, phone: string) => http.get(`/onboarding/candidate/base-info/${interviewNo}`, { params: { phone } }),
  submit: (data: any) => http.post('/onboarding/candidate/submit', data)
}

