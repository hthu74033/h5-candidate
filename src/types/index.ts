// ===================== 面试状态 =====================
export type InterviewStatus = 'pending' | 'filling' | 'waiting' | 'interviewing' | 'completed'

// ===================== 面试结果 =====================
export type HireResult = 'hired' | 'rejected' | null

// ===================== 候选人基础信息 =====================
export interface PersonalInfo {
  name?: string
  gender?: string
  birth_date?: string
  phone?: string
  wechat_id?: string
  wechat_name?: string
  hometown?: string
  ethnicity?: string
  marital_status?: string
  address?: string
  commute_type?: string
  estimated_commute_time?: string
  interview_position?: string
  expected_salary?: string
  expected_start?: string
  recruitment_source?: string
  recruitment_detail?: string
  disease_history?: string
  hobbies?: string
  self_evaluation?: string
}

export interface EducationItem {
  school?: string
  major?: string
  degree?: string
  is_fresh_graduate?: boolean
  start_date?: string
  end_date?: string
}

export interface WorkItem {
  company?: string
  position?: string
  start_date?: string
  end_date?: string
  job_content?: string
  leave_reason?: string
}

export interface FamilyItem {
  name?: string
  relationship?: string
  age?: string | number
  emergency_phone?: string
  company?: string
  position?: string
}
