import * as React from 'react'
import styled from 'styled-components'
import { useText } from '../utils/lang'
import { WidgetItem } from './WidgetItem'

export default function Widget() {
  const t = useText()

  return (
    <>
      <HeroWrapper>
        <HeroHeader>{t('widgetPageTitle')}</HeroHeader>
      </HeroWrapper>
      <Container>
        <SubTitle>{t('widgetPageHowInstall')}</SubTitle>
        <ol>
          <Li>{t('widgetInstallStep1')}</Li>
          <Li>{t('widgetInstallStep2')}</Li>
          <Li>{t('widgetInstallStep3')}</Li>
        </ol>
        <SizedBox height={16} />
        <strong>{t('widgetVariant1')}</strong>
        <WidgetItem params="variant=button&button-position=bottom-left" />
        <SizedBox height={16} />
        <strong>{t('widgetVariant2')}</strong>
        <WidgetItem params="variant=strip&strip-color=ua-colors" />
        <SizedBox height={16} />
        <strong>{t('widgetVariant3')}</strong>
        <WidgetItem params="variant=strip&strip-color=black" />
        <SizedBox height={16} />
        <SubTitle>{t('widgetGTagManager')}</SubTitle>
        <ol>
          <Li>{t('widgetGTagStep1')}</Li>
          <Li>{t('widgetGTagStep2')}</Li>
          <Li>{t('widgetGTagStep3')}</Li>
          <Li>{t('widgetGTagStep4')}</Li>
          <Li>{t('widgetGTagStep5')}</Li>
          <Li>{t('widgetGTagStep6')}</Li>
          <Li>{t('widgetGTagStep7')}</Li>
        </ol>
        <SizedBox height={16} />
        <SubTitle>{t('widgetWordPress')}</SubTitle>
        <ol>
          <Li>{t('widgetWordPressSoon')}</Li>
        </ol>
        <SizedBox height={40} />
      </Container>
    </>
  )
}

const HeroWrapper = styled.div`
  padding: 20px;
  padding-top: 0;
`

const HeroHeader = styled.h1`
  font-size: 36px;
  font-weight: 900;
  line-height: 44px;
  text-align: center;
  margin: 0;
`

const Container = styled.div`
  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const SubTitle = styled.h3`

`

const Li = styled.li`
  padding: 4px 0;
`;

const SizedBox = styled.div<{ width?: number; height?: number; }>`
  ${(props) => typeof props.width == 'number' ? `
    padding-left: ${props.width}px;
  ` : ''}
  ${(props) => typeof props.height === 'number' ? `
    padding-top: ${props.height}px;
  ` : ''}
`;
