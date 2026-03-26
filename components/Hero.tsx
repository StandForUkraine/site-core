import styled from 'styled-components'
import { useText } from 'core/utils/lang'

export const Hero = () => {
  const t = useText()

  return (
    <HeroWrapper>
      {/* Temporary hide/comment per request: tagline under the header */}
      {/* <HeroTagline>{t('heroTagline')}</HeroTagline> */}
      <HeroTitle>{t('heroTitle')}</HeroTitle>
      <HeroSubtitle>{t('heroSubtitle')}</HeroSubtitle>
    </HeroWrapper>
  )
}

export default Hero

const HeroWrapper = styled.div`
  padding: 20px;
  padding-top: 0;
`

const HeroTagline = styled.p`
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #2f80ed;
  font-weight: 600;
  margin: 0 auto 12px;

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 900;
  line-height: 44px;
  text-align: center;
  margin: 0;
  word-wrap: break-word;

  @media (min-width: 768px) {
    font-size: 52px;
    line-height: 62px;
  }
`

const HeroSubtitle = styled.p`
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #333;
  max-width: 640px;
  margin: 16px auto 0;

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }
`
