import { generateServiceMetadata } from '../../../lib/service-metadata'

export async function generateMetadata({ params }) {
  return generateServiceMetadata("xiaomi-repair", params.service)
}

export default function ServiceLayout({ children }) {
  return children
}
