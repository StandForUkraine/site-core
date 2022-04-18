import styled from 'styled-components'
import { useText } from 'core/utils/lang'
import Link from 'next/link'
import useLangLinkPrefix from 'core/utils/useLangLinkPrefix'

export type Tab = 'donate' | 'inform'

export const PageTabs = ({
  currentTab,
}: {
  currentTab: Tab
}) => {
  const t = useText()
  const linkPrefix = useLangLinkPrefix();

  return (
    <TabsWrapper>
      <Link href={linkPrefix}>
        <Tab isActive={currentTab === 'donate'}>
          {t('donate')}
        </Tab>
      </Link>
      <Link href={`${linkPrefix}spread-the-word`}>
        <Tab isActive={currentTab === 'inform'}>
          {t('spreadTheWorld')}
        </Tab>
      </Link>
    </TabsWrapper>
  )
}

export default PageTabs

const TabsWrapper = styled.div`
  width: 100%;
  background: #ffe600;
  height: 64px;
  display: flex;
`

const Tab = styled.button<{ isActive?: boolean }>`
  text-decoration: underline;
  font-size: 18px;
  width: 50%;
  background: transparent;
  border: none;
  border-top: 4px solid #ffe600;

  ${({ isActive }) =>
    isActive
      ? `
        background: #fff !important;
        cursor: auto;
        text-decoration: none;`
      : ''}

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  @media (min-width: 430px) {
    font-size: 24px;
  }

  @media (min-width: 768px) {
    font-size: 32px;
  }
`
