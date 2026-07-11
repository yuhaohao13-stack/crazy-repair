'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Star, ChevronLeft, ChevronRight, MessageCircle, User, Shield, Sparkles } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Breadcrumb from '../../components/Breadcrumb'
import { useSite } from '../../lib/SiteContext'

export default function ReviewsPage() {
  const { lang } = useSite()
  const t = (zh, en) => lang === 'zh' ? zh : en

  const [reviews, setReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const loadReviews = useCallback(async (p) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/reviews/list?page=${p}&pageSize=10`)
      const data = await res.json()
      if (!data.error) {
        setReviews(data.reviews || [])
        setTotal(data.total || 0)
        setTotalPages(data.totalPages || 1)
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  useEffect(() => { loadReviews(page) }, [page, loadReviews])

  const renderStars = (rating) => (
    <div className="flex text-amber-400">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={14} fill={s <= rating ? 'currentColor' : 'none'}
          className={s <= rating ? 'text-amber-400' : 'text-gray-200'} />
      ))}
    </div>
  )

  const formatDate = (d) => {
    const date = new Date(d)
    return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb items={[
        { label: '客户评价', labelEn: 'Customer Reviews' },
      ]} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Star size={24} className="text-amber-400" />
            {t('客户评价', 'Customer Reviews')}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {t(`共 ${total} 条评价`, `${total} reviews total`)}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">{t('加载中...', 'Loading...')}</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 text-gray-400">{t('暂无评价', 'No reviews yet')}</div>
        ) : (
          <>
            {/* 评价列表 */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <Link key={review.id} href={`/reviews/${review.id}`}
                  className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-blue-200 transition-all">
                  <div className="flex items-start gap-3">
                    {/* 头像 */}
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                      {(review.name || '?')[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* 第一行：名字 + 评分 + 日期 */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-gray-900 text-sm">{review.name}</span>
                        {renderStars(review.rating)}
                        <span className="text-xs text-gray-400 ml-auto">{formatDate(review.created_at)}</span>
                      </div>
                      {/* 标题 */}
                      {review.title && (
                        <h3 className="font-semibold text-gray-800 text-base mt-1 line-clamp-1">{review.title}</h3>
                      )}
                      {/* 内容摘要 */}
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{review.content}</p>
                      {/* 回复/助手标记 */}
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        {review.replyCount > 0 && (
                          <span className="flex items-center gap-0.5">
                            <MessageCircle size={12} />
                            {review.replyCount}
                          </span>
                        )}
                        {review.replies?.some(r => r.is_admin_reply) && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                            <Shield size={10} />
                            {t('已回复', 'Replied')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 分页 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                      p === page ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
