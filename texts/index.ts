import en from './en'
import fr from './fr'
import pl from './pl'
import it from './it'
import nl from './nl'
import sw from './sw'
import es from './es'
import de from './de'
import tr from './tr'
import ru from './ru'
import el from './el'
import lv from './lv'
import ro from './ro'
import ja from './ja'
import ua from './ua'

export const defaultLang = process.env.NEXT_PUBLIC_DEFAULT_LANG as Lang

export const byLang = {
  en,
  ua,
  de,
  fr,
  it,
  es,
  el,
  nl,
  sw,
  tr,
  lv,
  pl,
  ja,
  ro,
  ru,
} as const

export const flagsMap: Record<Lang, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
  es: '🇪🇸',
  fr: '🇫🇷',
  nl: '🇳🇱',
  sw: '🇸🇪',
  it: '🇮🇹',
  el: '🇬🇷',
  lv: '🇱🇻',
  ro: '🇷🇴',
  tr: '🇹🇷',
  pl: '🇵🇱',
  ua: '🇺🇦',
  ja: '🇯🇵',
  ru: '🏳',
}

export type Lang = keyof typeof byLang

export const langs = Object.keys(byLang) as Lang[]

const defaultLangTexts = byLang[defaultLang]

export type Texts = typeof defaultLangTexts

export type TextKeys = keyof Texts

export default {
  ...byLang,
  default: defaultLangTexts,
}
