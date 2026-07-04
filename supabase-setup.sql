-- ============================================
-- Crazy维修 客户评价系统 — Supabase 建表脚本
-- 请在 Supabase Dashboard → SQL Editor 执行
-- ============================================

-- 1. Captcha 表（防垃圾评论）
CREATE TABLE IF NOT EXISTS captchas (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '5 minutes',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 自动清理过期 captcha（5分钟自动删除）
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
  approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 按时间排序用
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);

-- 3. 启用 RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE captchas ENABLE ROW LEVEL SECURITY;

-- 4. RLS 策略
-- 任何人都可以读评价
CREATE POLICY "Public read reviews"
  ON reviews FOR SELECT
  USING (true);

-- 任何人都可以写评价（captcha验证由API负责）
CREATE POLICY "Public insert reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- 任何人都可以删评价（实际权限由API校验，RLS只是辅助）
CREATE POLICY "Public delete reviews"
  ON reviews FOR DELETE
  USING (true);

-- Captcha: 任何人都可以读（API验证用）
CREATE POLICY "Public read captchas"
  ON captchas FOR SELECT
  USING (true);

-- Captcha: 任何人都可以插入/删除
CREATE POLICY "Public insert captchas"
  ON captchas FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public delete captchas"
  ON captchas FOR DELETE
  USING (true);

-- 5. 存储桶（评价图片）
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'review-images',
  'review-images',
  true,
  5242880,  -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[];

-- 存储桶访问策略
CREATE POLICY "Public upload review images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'review-images');

CREATE POLICY "Public read review images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'review-images');

CREATE POLICY "Public delete review images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'review-images');

-- 6. 清理过期captcha的定时任务
-- 删除5分钟前的captcha
CREATE OR REPLACE FUNCTION cleanup_expired_captchas()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM captchas WHERE expires_at < NOW();
END;
$$;

-- 可选：pg_cron 调度（如果 Supabase 支持）
-- SELECT cron.schedule('cleanup-captchas', '* * * * *', 'SELECT cleanup_expired_captchas()');
