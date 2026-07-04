/**
 * 管理员认证工具
 * 生产环境请在 Vercel 设置 ADMIN_EMAIL / ADMIN_PASSWORD
 */

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'yuhaohao13@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'yhh521521'

export function verifyAdminToken(token) {
  try {
    if (!token) return false

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))

    // 验证签名
    const expectedSig = `crazy_${decoded.email}_${ADMIN_PASSWORD}`
    if (decoded.sig !== expectedSig) return false
    if (decoded.email !== ADMIN_EMAIL) return false

    // Token有效期：24小时
    if (Date.now() - decoded.time > 24 * 60 * 60 * 1000) return false

    return true
  } catch {
    return false
  }
}

export { ADMIN_EMAIL, ADMIN_PASSWORD }
