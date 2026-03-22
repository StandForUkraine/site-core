import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { defaultLang, flagsMap, langs, Lang as LangType } from 'core/texts'
import { useLang } from 'core/utils/lang'
import Chip from './Chip'
import { useRouter } from 'next/router'

const VISIBLE_COUNT = 5

function useLangLink(langKey: LangType) {
  const lang = useLang()
  const router = useRouter()
  const rootForDefLang = router.route.replace(/\[lang\]\/?/, '')

  const href = langKey === defaultLang
    ? rootForDefLang
    : lang === defaultLang
      ? `/[lang]${router.route}`
      : router.route

  const as = langKey === defaultLang
    ? rootForDefLang
    : lang === defaultLang
      ? `/${langKey}${router.route}`
      : router.route.replace(/^\/\[lang\]/, `/${langKey}`)

  return { href, as }
}

function LangChip({ langKey, isActive }: { langKey: LangType; isActive: boolean }) {
  const { href, as } = useLangLink(langKey)
  return (
    <Link key={langKey} href={href} as={as}>
      <LangButton isActive={isActive}>
        {flagsMap[langKey]}
        <span>{langKey.toUpperCase()}</span>
      </LangButton>
    </Link>
  )
}

export const Langs = () => {
  const lang = useLang()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const visibleLangs = langs.slice(0, VISIBLE_COUNT)
  const overflowLangs = langs.slice(VISIBLE_COUNT)
  const activeInOverflow = overflowLangs.includes(lang)

  useEffect(() => {
    if (!dropdownOpen) return
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [dropdownOpen])

  return (
    <LangsWrapper ref={wrapperRef}>
      <LangsInner>
        {visibleLangs.map((langKey) => (
          <LangChip key={langKey} langKey={langKey} isActive={langKey === lang} />
        ))}

        {activeInOverflow && (
          <LangChip langKey={lang} isActive={true} />
        )}

        {overflowLangs.length > 0 && (
          <MoreWrapper>
            <MoreButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              More languages...
            </MoreButton>
            {dropdownOpen && (
              <Dropdown>
                {overflowLangs.map((langKey) => (
                  <LangChip key={langKey} langKey={langKey} isActive={langKey === lang} />
                ))}
              </Dropdown>
            )}
          </MoreWrapper>
        )}
      </LangsInner>
    </LangsWrapper>
  )
}

export default Langs

const LangsWrapper = styled.div`
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 14px 10px;
  margin: auto;
  width: 100vw;
  max-width: 100vw;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  @media (min-width: 600px) {
    padding-top: 38px;
    overflow: visible;
    width: auto;
    max-width: none;
    left: auto;
    transform: none;
  }
`

const LangsInner = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;

  @media (min-width: 600px) {
    justify-content: center;
  }
`

const LangButton = styled(Chip)`
  display: inline-flex;
  justify-content: center;
  width: 63px;
  height: 33px;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;

  span {
    margin-left: 5px;
  }
`

const MoreWrapper = styled.div`
  position: relative;
  display: none;

  @media (min-width: 600px) {
    display: inline-flex;
  }
`

const MoreButton = styled.button`
  background: none;
  border: none;
  color: #2F80ED;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  padding: 6px 10px;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }
`

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 200;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  min-width: 240px;
  justify-content: center;
`
