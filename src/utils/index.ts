// ===================== 日期格式化 =====================

/** 格式化为 YYYY-MM-DD */
export function formatDate(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** 格式化为 YYYY年MM月DD日 */
export function formatDateCN(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

/** 格式化为 MM-DD HH:mm */
export function formatTime(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${mm}-${dd} ${hh}:${min}`
}

// ===================== 字段映射 =====================

/** 性别中文 */
export function genderLabel(val?: string): string {
  if (val === 'male') return '男'
  if (val === 'female') return '女'
  return val || ''
}

/** 婚姻状况中文 */
export function maritalLabel(val?: string): string {
  const map: Record<string, string> = { married: '已婚', single: '未婚', divorced: '离异', widowed: '丧偶' }
  return val ? (map[val] || val) : ''
}
