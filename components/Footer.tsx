import styled from 'styled-components'
import { useText } from 'core/utils/lang'
import InstagramIcon from 'core/assets/instagram.svg'
import FacebookIcon from 'core/assets/facebook.svg'
import TwitterIcon from 'core/assets/twitter.svg'
import TextButton from './TextButton'
import LinkIcon from './LinkIcon'
import Link from 'next/link'

const email = process.env.NEXT_PUBLIC_EMAIL
const instagramLink = process.env.NEXT_PUBLIC_INSTAGRAM_LINK
const facebookLink = process.env.NEXT_PUBLIC_FACEBOOK_LINK
const twitterLink = 'https://twitter.com/' + process.env.NEXT_PUBLIC_TWITTER_USER

export const Hero = () => {
  const t = useText()

  return (
    <FooterWrapper>
      <Column>
        <FirstColumnText>{t('footerHeader')}.</FirstColumnText>
        <Displaimler>{t('disclaimler')}</Displaimler>
      </Column>
      <Column>
        <SecondColumnTitle>{t('footerGoals')}</SecondColumnTitle>
        <SecondColumnList>
          <li>{t('goal1')}</li>
          <li>{t('goal2')}</li>
          <li>{t('goal3')}</li>
          <li>{t('goal4')}</li>
          <li>{t('goal5')}</li>
        </SecondColumnList>
      </Column>
      <Column>
        <p>{t('footerCreds')}</p>
        <br />
        <Flags>🇺🇦 🇬🇧 🇫🇷 🇩🇪 🇦🇹 🇵🇱 🇷🇴 🇹🇷</Flags>
        <br />
        <p>
          {t('footerContact')}: <a href={`mailto:${email}`}>{email}</a>
        </p>
        <br />
        <SocialIcons>
          <span>{t('joinUs')}:</span>
          <a href={twitterLink} target="_blank" rel="noopener">
            <TwitterIcon />
          </a>
          <a href={facebookLink} target="_blank" rel="noopener">
            <FacebookIcon />
          </a>
          <a href={instagramLink} target="_blank" rel="noopener">
            <InstagramIcon />
          </a>
        </SocialIcons>
      </Column>
      <FooterExtLinksWrapper>
        <Link href="/about">
          <AboutProjButton as="a" href="/about">
            {t('aboutProject')}
          </AboutProjButton>
        </Link>
        <Spacer />
        <ExtLinkButton
          as="a"
          href="https://forms.gle/2F5S4A52EVWPJym56"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{t('suggestOrgLink')}</span>
          <LinkIcon />
        </ExtLinkButton>
        <ExtLinkButton
          as="a"
          href="https://forms.gle/4rifrxcQ2AVY7v987"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{t('sharedFeedbackLink')}</span>
          <LinkIcon />
        </ExtLinkButton>
        <ExtLinkButton
          as="a"
          href="https://forms.gle/EtBp1wrt4vU3zXE7A"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{t('joinFormLink')}</span>
          <LinkIcon />
        </ExtLinkButton>
      </FooterExtLinksWrapper>
    </FooterWrapper>
  )
}

export default Hero

const FooterWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  line-height: 1.3;
  flex-wrap: wrap;

  p {
    margin: 0;
  }

  @media (min-width: 768px) {
    padding: 30px 0;
  }
`

const Column = styled.div`
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    width: 30%;
    margin-bottom: 0;
  }
`

const FirstColumnText = styled.p`
  font-size: 20px;
`

const Displaimler = styled.div`
  margin-top: 12px;
  font-size: 14px;
  line-height: 20px;
`

const SecondColumnTitle = styled.h3`
  margin: 0;
  font-weight: 400;
  font-size: 20px;
`

const SecondColumnList = styled.ul`
  li {
    margin-bottom: 5px;
  }
`

const Flags = styled.p`
  font-size: 20px;
`

const SocialIcons = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 12px;
  }

  svg {
    margin-right: 10px;

    &:hover path {
      fill: #666;
    }
  }
`

const AboutProjButton = styled(TextButton)`
  display: none;

  @media (min-width: 768px) {
    display: inline-flex;
  }
`

const ExtLinkButton = styled(TextButton).attrs({
  variant: 'external-link',
  size: 'small',
})`
  margin-left: 8px;
  margin-bottom: 24px;

  span {
    display: inline-block;
    margin-right: 4px;
  }

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`

const FooterExtLinksWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  flex-flow: column nowrap;
  margin-top: 26px;

  @media (min-width: 768px) {
    align-items: center;
    flex-direction: row;
    margin-top: 36px;
  }
`

const Spacer = styled.div`
  flex-grow: 1;
`
