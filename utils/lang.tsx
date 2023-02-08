import { createContext, useContext, useEffect } from 'react'
import { defaultLang, Lang, byLang, TextKeys, rtlLangs } from 'core/texts'
import { useRouter } from 'next/router'

export interface LangContextValue {
  lang: Lang
}

export const LangContext = createContext<Lang>(defaultLang)

export const LangContextProvider = ({
  children,
  injectedDefaultLang,
}: {
  children: React.ReactElement
  injectedDefaultLang?: Lang // now possible to redefine defaultLang
}) => {
  const router = useRouter()
  const lang = (router.query.lang || injectedDefaultLang || defaultLang) as Lang

  useEffect(() => {
    /**
     * Not an ideal solution, but... (we don't have `router.query.lang` in _app)
     */
    document.body.setAttribute('dir', rtlLangs.includes(lang) ? 'rtl' : 'ltr')
  }, [lang])

  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

export function useText() {
  const lang = useLang()
  return (key: TextKeys) => {
    const t = byLang[lang][key] || byLang[defaultLang][key]
    if (!t) console.warn('Wrong translation key:', key)
    return t || key
  }
}
