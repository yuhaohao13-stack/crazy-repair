import { generateServiceMetadata } from '../../../lib/service-metadata'

export async function generateMetadata({ params }) {
  const { service } = await params
  return generateServiceMetadata("xiaomi-repair", service)
}

export default function ServiceLayout({ children }) {
  return children
}
