import { Tag } from './tags'
import yaml from 'yaml'
import glob from 'glob'
import path from 'path'
import fs from 'fs'
import getConfig from 'next/config'
import { PayMethod } from './payMethods'
import { defaultLang } from 'core/texts'
const { serverRuntimeConfig } = getConfig()

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
        logo: `/logos/${id}.png`,
        id,
        byLang,
      }
    })
    .sort((a, b) => a.id - b.id)
  return data as DonationItem[]
}
