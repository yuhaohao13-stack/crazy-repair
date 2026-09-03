import { generateServiceMetadata } from '../../../lib/service-metadata'

export async function generateMetadata({ params }) {
  const { service } = await params
  return generateServiceMetadata("lenovo-repair", service)
}

export default function ServiceLayout({ children }) {
  return children
}
