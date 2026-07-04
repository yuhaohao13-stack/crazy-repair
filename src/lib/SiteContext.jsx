'use client'
import { createContext, useContext, useState } from 'react'

const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  const [showContact, setShowContact] = useState(false)
  const [lang, setLang] = useState('zh')

  return (
    <SiteContext.Provider value={{ showContact, setShowContact, lang, setLang }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
