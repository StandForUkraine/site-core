import styled from 'styled-components'
import { useText } from 'core/utils/lang'
import InstagramIcon from 'core/assets/instagram.svg'
import FacebookIcon from 'core/assets/facebook.svg'
import TwitterIcon from 'core/assets/twitter.svg'
import LinkIcon from './LinkIcon'
import Button from './Button'
import { FOOTER_BRAND_MARK, FOOTER_BRAND_COLOR } from 'core/utils/branding'

/** Splits FOOTER_BRAND_MARK; middle word is italicized in the lockup. */
function getFooterBrandParts(): string[] {
  const parts = FOOTER_BRAND_MARK.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 3) {
    return [parts[0], parts[1], parts.slice(2).join(' ')]
  }
  return ['Stand', 'for', 'Ukraine']
}

const email = process.env.NEXT_PUBLIC_EMAIL
const instagramLink = process.env.NEXT_PUBLIC_INSTAGRAM_LINK
const facebookLink = process.env.NEXT_PUBLIC_FACEBOOK_LINK
const twitterLink = 'https://twitter.com/' + process.env.NEXT_PUBLIC_TWITTER_USER

const YOUCONTROL_FOOTER_URL = 'https://youcontrol.com.ua/en/'

/** Brand lockup (English) + localized mission line; brand is not translated. */
const FooterMission = () => {
  const t = useText()
  const [w1, w2, w3] = getFooterBrandParts()

  return (
    <MissionIntro>
      <BrandMark lang="en">
        {w1} <BrandItalicFor>{w2}</BrandItalicFor> {w3}
      </BrandMark>{' '}
      <MissionLead>{t('footerMissionLead')}</MissionLead>
    </MissionIntro>
  )
}

export const Footer = () => {
  const t = useText()

  return (
    <FooterOuter>
      <FooterInner>
        <FooterTop>
          <Column>
            <FooterMission />
            <Disclaimer>{t('disclaimer')}</Disclaimer>
            <AboutWrap>
              <AboutButton as="a" href="/about" color="white">
                {t('aboutProject')}
              </AboutButton>
            </AboutWrap>
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
            <Flags aria-hidden>🇺🇦 🇬🇧 🇪🇸 🇫🇷 🇩🇪 🇯🇵🇦🇹 🇵🇱 🇷🇴 🇹🇷 🇱🇻 🇱🇹 🇪🇪 🇬🇷 🇮🇱</Flags>
            <Credits>{t('footerCreds')}</Credits>
            <ContactLine>
              {t('footerContact')}: <MailtoLink href={`mailto:${email}`}>{email}</MailtoLink>
            </ContactLine>

            {/* Hidden by request — links kept for easy restore; remove HiddenSocial wrapper to show */}
            <HiddenSocial aria-hidden="true">
              <span>{t('joinUs')}:</span>
              <a href={twitterLink} target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </a>
              <a href={facebookLink} target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </a>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
            </HiddenSocial>
          </Column>
        </FooterTop>

        <FooterBottomBar>
          <LastReviewed>{t('footerLastReviewed')}</LastReviewed>
          <UtilityLinks>
            <FooterUtilityLink
              as="a"
              href="https://forms.gle/2F5S4A52EVWPJym56"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('suggestOrgLink')}</span>
              <LinkIcon />
            </FooterUtilityLink>
            <FooterUtilityLink
              as="a"
              href="https://forms.gle/4rifrxcQ2AVY7v987"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('sharedFeedbackLink')}</span>
              <LinkIcon />
            </FooterUtilityLink>
            <FooterUtilityLink
              as="a"
              href={YOUCONTROL_FOOTER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('footerVerifyYouControl')}</span>
              <LinkIcon />
            </FooterUtilityLink>
          </UtilityLinks>
        </FooterBottomBar>
      </FooterInner>
    </FooterOuter>
  )
}

export default Footer

const FooterOuter = styled.footer`
  width: 100%;
  background: #000000;
  color: #e0e0e0;
  line-height: 1.45;
`

const FooterInner = styled.div`
  max-width: 1112px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 20px 28px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 32px 20px 36px;
  }
`

const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
  }
`

const Column = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 31%;
    flex: 0 1 31%;
    max-width: 31%;
  }
`

const MissionIntro = styled.div`
  margin: 0;
  font-size: 18px;
  line-height: 1.35;
  font-weight: 600;
  color: #ffffff;
`

/** Full phrase in brand yellow (logo-style lockup). “for” stays italic for recognition. */
const BrandMark = styled.span`
  color: ${FOOTER_BRAND_COLOR};
  font-weight: 700;
  letter-spacing: -0.02em;
`

const BrandItalicFor = styled.em`
  font-style: italic;
  font-weight: 700;
  color: inherit;
`

const MissionLead = styled.span`
  color: #ffffff;
  font-weight: 600;
`

export const Disclaimer = styled.div`
  margin-top: 14px;
  font-size: 14px;
  line-height: 1.5;
  color: #b0b0b0;
`

const AboutWrap = styled.div`
  margin-top: 18px;
`

const AboutButton = styled(Button)`
  text-decoration: none;
  display: inline-flex;
  color: #000000;
  border-color: #ffffff;

  &:hover {
    color: #000000;
  }
`

export const SecondColumnTitle = styled.h3`
  margin: 0 0 12px;
  font-weight: 700;
  font-size: 18px;
  line-height: 1.35;
  color: #ffffff;
`

export const SecondColumnList = styled.ul`
  margin: 0;
  padding-left: 1.1em;
  font-size: 14px;
  line-height: 1.45;
  color: #e8e8e8;

  li {
    margin-bottom: 8px;
  }
`

const Flags = styled.p`
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 1.4;
  letter-spacing: 0;
  word-spacing: -0.15em;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
`

const Credits = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.5;
  color: #e0e0e0;
`

const ContactLine = styled.p`
  margin: 0;
  font-size: 14px;
  color: #e0e0e0;
`

const MailtoLink = styled.a`
  color: #ffe600;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: #fff0a0;
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid #2f80ed;
    outline-offset: 2px;
    border-radius: 2px;
  }
`

const HiddenSocial = styled.div`
  display: none;
`

const FooterBottomBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #333333;

  @media (min-width: 640px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 12px 20px;
  }
`

const LastReviewed = styled.div`
  font-size: 12px;
  line-height: 1.4;
  color: #888888;
`

const UtilityLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 640px) {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px 20px;
  }
`

export const FooterUtilityLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  padding: 4px 2px;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffe600;
  text-decoration: none;
  cursor: pointer;
  border-radius: 4px;

  span {
    display: inline-block;
    text-decoration: none;
  }

  svg {
    width: 14px;
    height: 14px;
    opacity: 0.5;
    transition: opacity 120ms ease;
    flex-shrink: 0;
  }

  svg path {
    fill: #ffe600;
  }

  &:hover {
    color: #fff0a0;

    span {
      text-decoration: underline;
    }

    svg {
      opacity: 1;
    }

    svg path {
      fill: #fff0a0;
    }
  }

  &:focus-visible {
    outline: 2px solid #2f80ed;
    outline-offset: 3px;
  }

  &:visited {
    color: #e6d000;
  }
`

/** @deprecated Use FooterUtilityLink — kept for DesignSystem imports */
export const ExtLinkButton = FooterUtilityLink
