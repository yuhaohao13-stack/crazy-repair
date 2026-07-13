-- ============================================
-- 确保 board 留言 / reviews 的 content 列为 TEXT 类型
-- 避免 VARCHAR(n) 导致的长度限制
-- Supabase SQL Editor 运行
-- ============================================

-- messages.content → TEXT（已创建时就是 TEXT，但以防被误改）
DO $$
BEGIN
  -- 检查 messages.content 的列类型
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'messages' AND column_name = 'content'
    AND character_maximum_length IS NOT NULL
  ) THEN
    ALTER TABLE messages ALTER COLUMN content TYPE TEXT;
    RAISE NOTICE 'messages.content 已从 VARCHAR 改为 TEXT';
  ELSE
    RAISE NOTICE 'messages.content 已经是 TEXT 类型，无需修改';
  END IF;
END $$;

-- reviews.content → TEXT
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'reviews' AND column_name = 'content'
    AND character_maximum_length IS NOT NULL
  ) THEN
    ALTER TABLE reviews ALTER COLUMN content TYPE TEXT;
    RAISE NOTICE 'reviews.content 已从 VARCHAR 改为 TEXT';
  ELSE
    RAISE NOTICE 'reviews.content 已经是 TEXT 类型，无需修改';
  END IF;
END $$;
