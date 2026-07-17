// 联系数据统一配置

// 微信号
export const WECHAT_ID = 'crazy-repair'

// 邮箱地址
export const EMAIL_QQ = '994730969@qq.com'
export const EMAIL_GMAIL = 'yuhaohao13@gmail.com'

// 微信复制 + 跳转
export function copyAndOpenWechat(callback) {
  const val = WECHAT_ID
  // 复制到剪贴板
  const doCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(val)
    }
    // fallback
    return new Promise((resolve, reject) => {
      try {
        const ta = document.createElement('textarea')
        ta.value = val
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        resolve()
      } catch(e) {
        reject(e)
      }
    })
  }

  doCopy().then(() => {
    callback && callback(true)
    // 尝试跳转微信
    try {
      window.location.href = 'weixin://'
    } catch(e) {}
  }).catch(() => {
    callback && callback(false)
  })
}
