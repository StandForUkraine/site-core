import { Tag } from './tags'
import yaml from 'yaml'
import glob from 'glob'
import path from 'path'
import fs from 'fs'
import getConfig from 'next/config'
import { PayMethod } from './payMethods'
import { defaultLang } from 'core/texts'
const { serverRuntimeConfig } = getConfig()
const PRIORITY_DONATION_IDS = [1, 2, 8, 53, 52, 25, 33, 24, 16, 54, 7, 10]

export interface DonationItemBase {
  id: number
  logo: string
  logoAlt?: string
  title: string
  description: string
  tags: Tag[]
  donateLink: string
  link: string
  payMethods: PayMethod[]
  edrpou?: string
  ein?: string
  hidden?: boolean
}

export interface DonationItem extends DonationItemBase {
  id: number
  byLang: {
    [key: string]: DonationItemBase
  }
}

export const loadDonations = (lang = defaultLang) => {
  const files = glob.sync(
    path.join(serverRuntimeConfig.PROJECT_ROOT, `donations/**/${defaultLang}.yml`)
  )
  const data = files
    .map((file) => {
      const id = parseInt(path.basename(path.dirname(file)), 10)
      const logoSvgPath = path.join(serverRuntimeConfig.PROJECT_ROOT, `donations/${id}/logo.svg`)
      const logoPngPath = path.join(serverRuntimeConfig.PROJECT_ROOT, `donations/${id}/logo.png`)
      const logo = fs.existsSync(logoSvgPath)
        ? `/logos/${id}.svg`
        : fs.existsSync(logoPngPath)
        ? `/logos/${id}.png`
        : `/logos/${id}.png`
      const byLang: any = [lang, defaultLang]
        .filter((v, i, a) => a.indexOf(v) === i) // unique langs
        .reduce((obj, lng) => {
          try {
            const langFile = path.join(
              serverRuntimeConfig.PROJECT_ROOT,
              `donations/${id}/${lng}.yml`
            )

            return { ...obj, [lng]: yaml.parse(fs.readFileSync(langFile, 'utf-8')) }
          } catch (err) {
            console.error('Failed to load lang', lng, 'for', id, err)
            return { ...obj }
          }
        }, {})

      return {
        ...byLang[defaultLang],
        ...byLang[lang],
        logo,
        id,
        byLang,
      }
    })
    .filter((d) => !d.hidden)
    .sort((a, b) => {
      const aPriority = PRIORITY_DONATION_IDS.indexOf(a.id)
      const bPriority = PRIORITY_DONATION_IDS.indexOf(b.id)
      if (aPriority !== -1 || bPriority !== -1) {
        if (aPriority === -1) return 1
        if (bPriority === -1) return -1
        return aPriority - bPriority
      }
      return a.id - b.id
    })
  return data as DonationItem[]
}
