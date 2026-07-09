import bcrypt from 'bcryptjs'
import { supabase } from './supabase-server'

const SALT_ROUNDS = 10
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'crazy_repair_secret_2026'

/**
 * 密码加密
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS)
}

/**
 * 验证密码
 */
export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash)
}

/**
 * 生成用户Token
 */
export function generateUserToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    phone: user.phone,
    is_admin: user.is_admin || false,
    time: Date.now(),
    sig: `crazy_${user.id}_${TOKEN_SECRET}`,
  }
  return Buffer.from(JSON.stringify(payload)).toString('base64')
}

/**
 * 验证Token并返回用户信息
 */
export function verifyUserToken(token) {
  try {
    if (!token) return null
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    const expectedSig = `crazy_${decoded.id}_${TOKEN_SECRET}`
    if (decoded.sig !== expectedSig) return null
    // Token有效期：30天
    if (Date.now() - decoded.time > 30 * 24 * 60 * 60 * 1000) return null
    return decoded
  } catch {
    return null
  }
}

/**
 * 从请求头中获取用户
 */
export function getUserFromRequest(req) {
  const auth = req.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) return null
  const token = auth.slice(7)
  return verifyUserToken(token)
}

/**
 * 用用户名或手机号查找用户
 */
export async function findUserByLogin(login) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`username.eq.${login},phone.eq.${login}`)
    .single()

  if (error || !data) return null
  return data
}

/**
 * 用ID查用户
 */
export async function findUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data
}

/**
 * 检查用户名或手机号是否已存在
 */
export async function checkUserExists(username, phone) {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .or(`username.eq.${username},phone.eq.${phone}`)
    .maybeSingle()

  if (error) throw error
  return data ? { exists: true, field: data.username === username ? 'username' : 'phone' } : { exists: false }
}
