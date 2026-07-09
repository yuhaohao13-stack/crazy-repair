-- ============================================
-- Crazy维修 完整建表脚本（新项目）
-- ============================================

-- 1. 验证码表
CREATE TABLE IF NOT EXISTS captchas (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '5 minutes',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_captchas_expires ON captchas(expires_at);

-- 2. 评价表
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  images TEXT[] DEFAULT '{}'::TEXT[],
  user_id BIGINT,
  approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);

-- 3. 用户表
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

-- 4. 留言表
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

-- 5. RLS 策略
ALTER TABLE captchas ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Public insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete reviews" ON reviews FOR DELETE USING (true);
CREATE POLICY "Public read captchas" ON captchas FOR SELECT USING (true);
CREATE POLICY "Public insert captchas" ON captchas FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete captchas" ON captchas FOR DELETE USING (true);
CREATE POLICY "Public insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users read own profile" ON users FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON users FOR UPDATE USING (true);
CREATE POLICY "Public read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Authenticated insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin delete messages" ON messages FOR DELETE USING (true);
CREATE POLICY "Admin update messages" ON messages FOR UPDATE USING (true);

-- 6. 自动更新时间的触发器
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trigger_users_updated_at ON users;
CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_users_updated_at();

CREATE OR REPLACE FUNCTION update_messages_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS trigger_messages_updated_at ON messages;
CREATE TRIGGER trigger_messages_updated_at BEFORE UPDATE ON messages FOR EACH ROW EXECUTE FUNCTION update_messages_updated_at();

-- 7. 管理员用户（密码 yhh521521）
INSERT INTO users (username, phone, password_hash, birth_place, bio, hobbies, is_admin)
VALUES ('admin', '13573735550', '$2b$10$JwX7ZJ5Yqb8hmatLDVh0E.4k0.3NtNfedwQOm.g5GfL0uWoHNAe6K', '山东威海', 'Crazy维修创始人', '维修、数码', true)
ON CONFLICT (phone) DO NOTHING;

-- 8. 图片存储桶
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('review-images', 'review-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[])
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('message-images', 'message-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[])
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public upload review images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'review-images');
CREATE POLICY "Public read review images" ON storage.objects FOR SELECT USING (bucket_id = 'review-images');
CREATE POLICY "Public delete review images" ON storage.objects FOR DELETE USING (bucket_id = 'review-images');
CREATE POLICY "Public upload message images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'message-images');
CREATE POLICY "Public read message images" ON storage.objects FOR SELECT USING (bucket_id = 'message-images');
CREATE POLICY "Public delete message images" ON storage.objects FOR DELETE USING (bucket_id = 'message-images');
