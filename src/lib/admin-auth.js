/**
 * 管理员认证工具
 */

export function verifyAdminToken(token) {
  try {
    if (!token) return false

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    // 验证签名
    const expectedSig = `crazy_${decoded.email}_${adminPassword}`
    if (decoded.sig !== expectedSig) return false
    if (decoded.email !== adminEmail) return false

    // Token有效期：24小时
    if (Date.now() - decoded.time > 24 * 60 * 60 * 1000) return false

    return true
  } catch {
    return false
  }
}
