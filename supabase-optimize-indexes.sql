-- ═══════════════════════════════════════════════
-- 性能优化：复合索引
-- ═══════════════════════════════════════════════

-- 留言列表查询优化（parent_id IS NULL 是最常见的查询条件）
-- board page 分页查询：WHERE parent_id IS NULL AND target_id IS NULL AND target_type='message' AND is_pinned=false ORDER BY created_at DESC
DROP INDEX IF EXISTS idx_messages_list;
CREATE INDEX idx_messages_list ON messages(parent_id, target_id, target_type, is_pinned, created_at DESC);

-- 回复查询优化（按 parent_id 查回复，按 is_pinned + created_at 排序）
-- detail page & board list 二次查询：WHERE parent_id IN (...) ORDER BY is_pinned DESC, created_at ASC
DROP INDEX IF EXISTS idx_messages_reply;
CREATE INDEX idx_messages_reply ON messages(parent_id, is_pinned, created_at ASC);

-- 置顶查询优化
DROP INDEX IF EXISTS idx_messages_pinned_list;
CREATE INDEX idx_messages_pinned_list ON messages(parent_id, target_id, target_type, is_pinned, created_at DESC);

-- 清理旧索引（已被复合索引覆盖）
DROP INDEX IF EXISTS idx_messages_created;
DROP INDEX IF EXISTS idx_messages_parent;
