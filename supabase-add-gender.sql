-- Crazy-Repair — 用户表添加性别字段
-- 在 Supabase SQL Editor 运行

ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT DEFAULT 'male';
