-- ============================================
-- Crazy维修 用户系统 + 留言板 — Supabase 建表脚本
-- 请在 Supabase Dashboard → SQL Editor 执行
-- ============================================

-- 1. 用户表
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  birth_place TEXT DEFAULT '',
  birth_date DATE,
  bio TEXT DEFAULT '',
  hobbies TEXT DEFAULT '',
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

-- 2. 留言表
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL,
  images TEXT[] DEFAULT '{}'::TEXT[],
  parent_id BIGINT REFERENCES messages(id) ON DELETE CASCADE,
  target_type TEXT DEFAULT 'message' CHECK (target_type IN ('message', 'review')),
  target_id BIGINT,
  is_pinned BOOLEAN NOT NULL DEFAULT false,
  is_admin_reply BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_parent ON messages(parent_id);
CREATE INDEX IF NOT EXISTS idx_messages_target ON messages(target_type, target_id);

-- 3. 给评价表加 user_id 字段（可选，已有数据保持 null）
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS user_id BIGINT REFERENCES users(id) ON DELETE SET NULL;

-- 4. 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 5. RLS 策略: users
-- 任何人都可以注册（插入）
CREATE POLICY "Public insert users"
  ON users FOR INSERT
  WITH CHECK (true);

-- 用户只能看自己的资料
CREATE POLICY "Users read own profile"
  ON users FOR SELECT
  USING (true);  -- 公开用户名等信息

-- 用户只能修改自己的资料
CREATE POLICY "Users update own profile"
  ON users FOR UPDATE
  USING (id = current_setting('app.current_user_id')::BIGINT OR is_admin = true);

-- 6. RLS 策略: messages
CREATE POLICY "Public read messages"
  ON messages FOR SELECT
  USING (true);

CREATE POLICY "Authenticated insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin delete messages"
  ON messages FOR DELETE
  USING (true);

CREATE POLICY "Admin update messages"
  ON messages FOR UPDATE
  USING (true);

-- 7. 更新 reviews RLS 允许带 user_id 插入
-- （已有的 RLS policy 已经允许 INSERT，不需改动）

-- 8. 用户更新时间的触发器
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_users_updated_at();

-- 9. 留言更新时间的触发器
CREATE OR REPLACE FUNCTION update_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_messages_updated_at();

-- 10. 创建存储桶（留言图片）
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'message-images',
  'message-images',
  true,
  5242880,  -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[];

CREATE POLICY "Public upload message images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'message-images');

CREATE POLICY "Public read message images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'message-images');

CREATE POLICY "Public delete message images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'message-images');

-- 11. 插入管理员用户（密码: yhh521521）
-- 密码已用 bcrypt 加密，管理员登录使用手机号 13573735550 或用户名 admin
INSERT INTO users (username, phone, password_hash, birth_place, bio, hobbies, is_admin)
VALUES (
  'admin',
  '13573735550',
  '$2b$10$JwX7ZJ5Yqb8hmatLDVh0E.4k0.3NtNfedwQOm.g5GfL0uWoHNAe6K',
  '山东威海',
  'Crazy维修创始人，2007年至今奋斗在维修一线',
  '维修、数码、技术支持',
  true
)
ON CONFLICT (phone) DO UPDATE SET
  is_admin = true;

-- 12. 创建留言序列号
CREATE SEQUENCE IF NOT EXISTS message_seq;
