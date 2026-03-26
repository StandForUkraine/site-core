import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import { useLang, useText } from 'core/utils/lang'
import Button from './Button'
import ShareIcon from './ShareIcon'
import SharePopup from './SharePopup'
import { defaultLang } from 'core/texts'

export const TopHeader = () => {
  const [visibleShare, setVisibleShare] = useState(false)
  const lang = useLang()
  const t = useText()

  const rootPathname = lang === defaultLang ? '/' : `/${lang}`

  return (
    <TopHeaderWrapper>
      <Link href={rootPathname} passHref>
        <TopNavLink>
          <TopHeaderFlag
            srcSet={`/ua-flag.png?v=20260323 1x,
            /ua-flag@2x.png?v=20260323`}
            width={78}
            height={72}
          />
        </TopNavLink>
      </Link>

      <TopHeaderTitle>
        <Link href={rootPathname} passHref>
          <TopNavLink>
            Stand <em>for</em> Ukraine
          </TopNavLink>
        </Link>
      </TopHeaderTitle>

      <ShareButton onClick={() => setVisibleShare(true)}>
        <span>{t('share')}</span>
        <ShareIcon />
      </ShareButton>

      {visibleShare && <SharePopup onClose={() => setVisibleShare(false)} />}
    </TopHeaderWrapper>
  )
}

export default TopHeader

const TopNavLink = styled.a`
  color: inherit;
  text-decoration: none;
`

const TopHeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 48px;
  background: #fff;
  display: flex;
  justify-content: center;
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.04);

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`

const TopHeaderFlag = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;

  @media (min-width: 768px) {
    width: 90px;
    height: 84px;
  }
`

const TopHeaderTitle = styled.h1`
  text-align: center;
  font-size: 16px;
  line-height: 26px;
  font-weight: 700;
  flex-grow: 1;

  em {
    font-style: italic;
    font-weight: 700;
  }

  @media (min-width: 375px) {
    font-size: 20px;
    line-height: 24px;
  }
`

const ShareButton = styled(Button)`
  position: absolute;
  top: 6px;
  right: 0;

  span {
    display: none;
    margin-right: 10px;
  }

  @media (min-width: 768px) {
    right: 9px;
    span {
      display: inline;
    }
  }

  @media (max-width: 768px) {
    background-color: #fff !important;
    border-color: #fff !important;
  }
`
