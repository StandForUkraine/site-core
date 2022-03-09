import Link from 'next/link'
import styled from 'styled-components'
import { defaultLang, flagsMap, langs } from 'core/texts'
import { useLang } from 'core/utils/lang'
import Chip from './Chip'

export const Langs = () => {
  const { lang } = useLang()
  return (
    <LangsWrapper>
      {langs.map((langKey) => (
        <Link
          key={langKey}
          href={langKey === defaultLang ? '/' : '/[lang]/'}
          as={langKey === defaultLang ? '/' : `/${langKey}/`}
        >
          <Lang as="a" href={langKey === defaultLang ? '/' : `/${langKey}/`} isActive={langKey === lang}>
            {flagsMap[langKey]}
            <span>{langKey.toUpperCase()}</span>
          </Lang>
        </Link>
      ))}
    </LangsWrapper>
  )
}

export default Langs

const LangsWrapper = styled.div`
  overflow-x: auto;
  padding: 14px 16px;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: flex-start;

  @media (min-width: 600px) {
    justify-content: center;
    padding-top: 38px;
  }
`

const Lang = styled(Chip)`
  display: inline-flex;
  justify-content: center;
  width: 63px;
  heigth: 33px;
  align-items: center;
  cursor: pointer;
  // color: #000;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;

  span {
    margin-left: 5px;
  }
`
