/** @type {import('next').NextConfig} */
const nextConfig = {
  // ═══════════════════════════════════════════════
  // 安全响应头
  // ═══════════════════════════════════════════════
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // HSTS — 强制 HTTPS
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },

          // 禁止 MIME 嗅探
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // 禁止嵌入 iframe
          { key: 'X-Frame-Options', value: 'DENY' },

          // XSS 过滤
          { key: 'X-XSS-Protection', value: '1; mode=block' },

          // 防盗链
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

          // 权限控制
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },

          // ─── 内容安全策略（CSP）───
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://rsndnhdimruisysacujg.supabase.co",
              "font-src 'self' data:",
              "connect-src 'self' blob: https://rsndnhdimruisysacujg.supabase.co",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },

          // 禁止 IE 下载时自动打开
          { key: 'X-Download-Options', value: 'noopen' },
        ],
      },

      // ─── 静态资源长缓存 ───
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  // ═══════════════════════════════════════════════
  // 图片优化安全配置
  // ═══════════════════════════════════════════════
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'rsndnhdimruisysacujg.supabase.co',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
