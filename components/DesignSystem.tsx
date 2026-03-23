import { useState } from 'react'
import type { MouseEvent } from 'react'
import styled from 'styled-components'
import Button from './Button'
import TextButton from './TextButton'
import Chip from './Chip'
import { FilterChip } from './MultipleSelection'
import FilterLabel from './FilterLabel'
import MultipleSelection from './MultipleSelection'
import CopyButton from './CopyButton'
import LinkIcon from './LinkIcon'
import { FooterUtilityLink } from './Footer'
import { FOOTER_BRAND_COLOR } from 'core/utils/branding'
import { allTags } from 'core/utils/tags'
import type { Tag } from 'core/utils/tags'
import { payMethods } from 'core/utils/payMethods'
import type { PayMethod } from 'core/utils/payMethods'

/** Tokens specific to the site footer (see Footer.tsx). */
const FOOTER_DS_TOKENS: { hex: string; token: string; label: string }[] = [
  { hex: '#000000', token: 'footer-bg', label: 'Full-bleed background' },
  { hex: '#FFE600', token: 'footer-accent', label: 'Utility links, mail accent' },
  { hex: '#E8E8E8', token: 'footer-body', label: 'Goals / body on dark' },
  { hex: '#888888', token: 'footer-meta', label: 'Last reviewed' },
]

const COLOR_TOKENS: { hex: string; token: string; label: string }[] = [
  { hex: '#2F80ED', token: 'blue', label: 'Primary, links, focus' },
  { hex: '#000000', token: 'black', label: 'Text, active chip' },
  { hex: '#333333', token: 'gray-333', label: 'Body' },
  { hex: '#4F4F4F', token: 'gray-4f', label: 'Filter labels' },
  { hex: '#828282', token: 'gray-82', label: 'Muted' },
  { hex: '#F2F2F2', token: 'gray-f2', label: 'Chip, default button' },
  { hex: '#E0E0E0', token: 'border', label: 'Hairlines' },
  { hex: '#FFE600', token: 'yellow', label: 'Hover' },
  { hex: '#219653', token: 'green', label: 'Success text' },
  { hex: '#D0F1D5', token: 'green-bg', label: 'Success fill' },
  { hex: '#1A1A1A', token: 'footer-bg', label: 'Footer' },
  { hex: '#6BAAEE', token: 'footer-link', label: 'Footer links' },
]

/** Internal UI reference — `/ds`. */
export default function DesignSystem() {
  const [chipActive, setChipActive] = useState(false)
  const [filterTags, setFilterTags] = useState<Tag[]>([])
  const [filterPay, setFilterPay] = useState<PayMethod[]>([])

  const toggleTag = (tag: Tag) => {
    setFilterTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }
  const togglePay = (m: PayMethod) => {
    setFilterPay((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]))
  }

  const sampleFilterTags = allTags.slice(0, 5)
  const samplePay = [...payMethods]

  return (
    <Wrap>
      <Banner>
        <BannerTitle>Design system</BannerTitle>
        <BannerText>
          Live patterns for Stand For Ukraine. Not linked in navigation; uses <code>noindex</code>{' '}
          on deploy.
        </BannerText>
      </Banner>

      <Section>
        <SectionTitle>Color</SectionTitle>
        <SwatchGrid>
          {COLOR_TOKENS.map((c) => (
            <SwatchCard key={c.token} $hex={c.hex}>
              <SwatchMeta>
                <SwatchToken>{c.token}</SwatchToken>
                <SwatchHex>{c.hex}</SwatchHex>
                <SwatchLabel>{c.label}</SwatchLabel>
              </SwatchMeta>
            </SwatchCard>
          ))}
        </SwatchGrid>
      </Section>

      <Section>
        <SectionTitle>Typography</SectionTitle>
        <TypeBlock>
          <TypeLabel>Tagline · 14px → 16px (md) · semibold · #2F80ED</TypeLabel>
          <HeroTaglineSample>Supporting line above the hero</HeroTaglineSample>
        </TypeBlock>

        <TypeBlock>
          <TypeLabel>Hero title · Montserrat 900 · breakpoint 768px</TypeLabel>
          <TitleCompare>
            <TitleCol>
              <TitleSizeBadge>Smaller · &lt;768px</TitleSizeBadge>
              <HeroTitleSm>Donate with confidence</HeroTitleSm>
              <TypeSpec>36px / 44px</TypeSpec>
            </TitleCol>
            <TitleCol>
              <TitleSizeBadge>Larger · ≥768px</TitleSizeBadge>
              <HeroTitleLg>Donate with confidence</HeroTitleLg>
              <TypeSpec>52px / 62px</TypeSpec>
            </TitleCol>
          </TitleCompare>
        </TypeBlock>

        <TypeBlock>
          <TypeLabel>Subtitle · 16px → 18px (md) · #333</TypeLabel>
          <HeroSubtitleSample>
            Browse vetted organizations. Same family as body, tighter line length on the real hero.
          </HeroSubtitleSample>
        </TypeBlock>

        <TypeBlock>
          <FilterLabel>Filter label · 14px bold · #4F4F4F</FilterLabel>
          <BodySample>
            Body copy uses regular weight, default tracking. Use for paragraphs and lists.
          </BodySample>
        </TypeBlock>
      </Section>

      <Section>
        <SectionTitle>Buttons</SectionTitle>
        <SubBlock>
          <SubLabel>Button · 36px · 16px semibold</SubLabel>
          <Row>
            <Button type="button" color="default">
              Default
            </Button>
            <Button type="button" color="white">
              White
            </Button>
            <Button type="button" color="dark">
              Dark
            </Button>
            <Button type="button" color="success">
              Success
            </Button>
            <Button type="button" color="default" disabled>
              Disabled
            </Button>
          </Row>
        </SubBlock>
        <SubBlock>
          <SubLabel>TextButton</SubLabel>
          <Row>
            <TextButton type="button" variant="default" size="regular">
              Default
            </TextButton>
            <TextButton type="button" variant="external-link" size="small">
              External link
            </TextButton>
          </Row>
        </SubBlock>
      </Section>

      <Section>
        <SectionTitle>Chips</SectionTitle>
        <SectionHint>
          Same interaction model; large size matches desktop filter chips (≥768px).
        </SectionHint>

        <ChipBlock>
          <SubLabel>Default · Chip</SubLabel>
          <Hint>33px height · language switcher</Hint>
          <Row>
            <Chip type="button" isActive={chipActive} onClick={() => setChipActive((v) => !v)}>
              Toggle
            </Chip>
            <Chip type="button" isActive={false}>
              Off
            </Chip>
            <Chip type="button" isActive>
              On
            </Chip>
          </Row>
        </ChipBlock>

        <ChipBlock>
          <SubLabel>Large · FilterChip</SubLabel>
          <Hint>40px on desktop · home filters</Hint>
          <Row>
            <FilterChip type="button" isActive={false}>
              Military
            </FilterChip>
            <FilterChip type="button" isActive>
              Selected
            </FilterChip>
          </Row>
        </ChipBlock>
      </Section>

      <Section>
        <SectionTitle>Filters</SectionTitle>
        <SectionHint>
          Full rows use FilterLabel + chips; scroll horizontally on narrow viewports.
        </SectionHint>

        <DemoPad>
          <MultipleSelection<Tag>
            title="Donate to"
            allOptions={sampleFilterTags}
            selectedOptions={filterTags}
            onOptionClick={toggleTag}
          />
          <MultipleSelection<PayMethod>
            title="Via"
            allOptions={samplePay}
            selectedOptions={filterPay}
            onOptionClick={togglePay}
          />
          <ResetRow>
            <ResetFilterChipDemo type="button">
              <ResetFilterIconDemo viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 3.2a6.8 6.8 0 1 1-5.29 11.08.9.9 0 0 1 1.4-1.12A5 5 0 1 0 5.2 8H8a.9.9 0 1 1 0 1.8H3.2a.9.9 0 0 1-.9-.9V4.1a.9.9 0 0 1 1.8 0v2.1A6.78 6.78 0 0 1 10 3.2Z" />
              </ResetFilterIconDemo>
              <span>Reset filter</span>
            </ResetFilterChipDemo>
          </ResetRow>
        </DemoPad>

        <SubBlock>
          <SubLabel>Collapsed row (desktop home)</SubLabel>
          <CollapsedRow>
            <FilterChip type="button" isActive={false}>
              Military
            </FilterChip>
            <FilterChip type="button" isActive={false}>
              Humanitarian
            </FilterChip>
            <ThinSep />
            <FilterChip type="button" isActive={false}>
              Credit Card
            </FilterChip>
            <FilterChip type="button" isActive={false}>
              Crypto
            </FilterChip>
            <FilterChip type="button" isActive={false}>
              IBAN
            </FilterChip>
            <MoreFiltersButtonDemo type="button">More filters</MoreFiltersButtonDemo>
          </CollapsedRow>
        </SubBlock>
      </Section>

      <Section>
        <SectionTitle>Footer</SectionTitle>
        <SectionHint>
          Production footer: black full-bleed band, content capped at 1112px. English brand lockup
          is fully #FFE600 (italic “for”); mission line is white. Utility links and mailto use the
          same accent.
        </SectionHint>
        <SwatchGrid>
          {FOOTER_DS_TOKENS.map((c) => (
            <SwatchCard key={c.token} $hex={c.hex}>
              <SwatchMeta>
                <SwatchToken>{c.token}</SwatchToken>
                <SwatchHex>{c.hex}</SwatchHex>
                <SwatchLabel>{c.label}</SwatchLabel>
              </SwatchMeta>
            </SwatchCard>
          ))}
        </SwatchGrid>

        <SubBlock>
          <SubLabel>Layout preview (scaled)</SubLabel>
          <FooterPreviewShell>
            <FooterPreviewInner>
              <FooterPreviewTop>
                <FooterPreviewCol>
                  <FPMockBrand>
                    Stand <em>for</em> Ukraine
                  </FPMockBrand>
                  <FPMockSmall>Mission + disclaimer + white About button in live site.</FPMockSmall>
                  <FPMockBtn>About the project</FPMockBtn>
                </FooterPreviewCol>
                <FooterPreviewCol>
                  <FPMockH>Our Goals</FPMockH>
                  <FPMockUl>
                    <li>Goal one</li>
                    <li>Goal two</li>
                  </FPMockUl>
                </FooterPreviewCol>
                <FooterPreviewCol>
                  <FPMockFlags>🇺🇦 🇬🇧 🇪🇸 🇫🇷 🇩🇪 🇯🇵🇦🇹 🇵🇱 🇷🇴 🇹🇷 🇱🇻 🇱🇹 🇪🇪 🇬🇷 🇮🇱</FPMockFlags>
                  <FPMockSmall>Credits line</FPMockSmall>
                  <FPMockMail>team@example.com</FPMockMail>
                </FooterPreviewCol>
              </FooterPreviewTop>
              <FooterPreviewBottom>
                <FPMockMeta>Last reviewed: March 2026</FPMockMeta>
                <FPMockUtils>
                  <FooterUtilityLink
                    href="#"
                    onClick={(e: MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
                  >
                    <span>Suggest</span>
                    <LinkIcon />
                  </FooterUtilityLink>
                  <FooterUtilityLink
                    href="#"
                    onClick={(e: MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
                  >
                    <span>Feedback</span>
                    <LinkIcon />
                  </FooterUtilityLink>
                  <FooterUtilityLink
                    href="#"
                    onClick={(e: MouseEvent<HTMLAnchorElement>) => e.preventDefault()}
                  >
                    <span>Verify</span>
                    <LinkIcon />
                  </FooterUtilityLink>
                </FPMockUtils>
              </FooterPreviewBottom>
            </FooterPreviewInner>
          </FooterPreviewShell>
        </SubBlock>
      </Section>

      <Section>
        <SectionTitle>Misc</SectionTitle>
        <SubBlock>
          <SubLabel>CopyButton</SubLabel>
          <CopyNarrow>
            <CopyButton content="https://standforukraine.com" />
          </CopyNarrow>
        </SubBlock>
        <DividerSample>Section divider · 1px #E0E0E0</DividerSample>
      </Section>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding-bottom: 40px;
`

const Banner = styled.div`
  background: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 16px 18px;
  margin-bottom: 28px;
`

const BannerTitle = styled.h1`
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.02em;
`

const BannerText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #666;

  code {
    font-size: 12px;
    background: #eee;
    padding: 1px 5px;
    border-radius: 3px;
  }
`

const Section = styled.section`
  margin-bottom: 32px;
`

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #111;
`

const SectionHint = styled.p`
  margin: -4px 0 14px;
  font-size: 13px;
  line-height: 1.45;
  color: #666;
  max-width: 560px;
`

const SubBlock = styled.div`
  margin-bottom: 18px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SubLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #666;
  margin-bottom: 8px;
`

const Hint = styled.span`
  display: block;
  font-size: 12px;
  color: #999;
  margin: -2px 0 8px;
`

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`

const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
  gap: 10px;
`

const SwatchCard = styled.div<{ $hex: string }>`
  border-radius: 6px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
  font-size: 11px;
  line-height: 1.35;

  &::before {
    content: '';
    display: block;
    height: 48px;
    background: ${(p) => p.$hex};
  }
`

const SwatchMeta = styled.div`
  padding: 8px 8px 10px;
  background: #fff;
`

const SwatchToken = styled.div`
  font-weight: 700;
  color: #111;
`

const SwatchHex = styled.div`
  font-family: ui-monospace, monospace;
  color: #555;
  margin-top: 2px;
`

const SwatchLabel = styled.div`
  color: #777;
  margin-top: 4px;
`

const TypeBlock = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const TypeLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #888;
  margin-bottom: 8px;
`

const HeroTaglineSample = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #2f80ed;
  font-weight: 600;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`

/** Fixed “mobile” hero title — does not use breakpoint (shown beside large). */
const HeroTitleSm = styled.div`
  font-size: 36px;
  font-weight: 900;
  line-height: 44px;
  color: #000;
  letter-spacing: -0.02em;
`

/** Fixed “desktop” hero title */
const HeroTitleLg = styled.div`
  font-size: 52px;
  font-weight: 900;
  line-height: 62px;
  color: #000;
  letter-spacing: -0.03em;
`

const TitleCompare = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    align-items: start;
  }
`

const TitleCol = styled.div`
  padding: 14px 16px;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 6px;
`

const TitleSizeBadge = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #2f80ed;
  margin-bottom: 10px;
`

const TypeSpec = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #888;
  font-family: ui-monospace, monospace;
`

const HeroSubtitleSample = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #333;
  margin: 0;
  max-width: 560px;

  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 28px;
  }
`

const BodySample = styled.p`
  margin: 10px 0 0;
  font-size: 16px;
  line-height: 24px;
  max-width: 560px;
  color: #000;
`

const ChipBlock = styled.div`
  margin-bottom: 20px;
  padding: 14px 16px;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`

const DemoPad = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 4px 0 12px;
  margin-bottom: 16px;
  background: #fff;
`

const ResetRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 4px 16px 0;
  min-height: 28px;
  align-items: center;
`

const ResetFilterChipDemo = styled(Chip).attrs({
  type: 'button',
})`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-right: 0;
  font-size: 14px;
`

const ResetFilterIconDemo = styled.svg`
  width: 14px;
  height: 14px;
  fill: currentColor;
  flex-shrink: 0;
`

const CollapsedRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 14px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  background: #fff;
`

const ThinSep = styled.div`
  width: 1px;
  height: 24px;
  background: #e0e0e0;
  margin: 0 4px;
`

const MoreFiltersButtonDemo = styled.button`
  background: none;
  border: none;
  color: #2f80ed;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  padding: 6px 10px;
  font-family: inherit;
  margin-left: 4px;

  &:hover {
    text-decoration: underline;
  }
`

const CopyNarrow = styled.div`
  max-width: 300px;
`

const FooterPreviewShell = styled.div`
  background: #000;
  border-radius: 6px;
  padding: 16px 12px;
  overflow: hidden;
`

const FooterPreviewInner = styled.div`
  max-width: 100%;
  font-size: 11px;
  line-height: 1.35;
  color: #e8e8e8;
`

const FooterPreviewTop = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 520px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
`

const FooterPreviewCol = styled.div`
  min-width: 0;
`

const FPMockBrand = styled.div`
  font-weight: 700;
  color: ${FOOTER_BRAND_COLOR};
  font-size: 12px;
  margin-bottom: 6px;
  letter-spacing: -0.02em;

  em {
    font-style: italic;
    font-weight: 700;
    color: inherit;
  }
`

const FPMockSmall = styled.p`
  margin: 0 0 8px;
  color: #b0b0b0;
  font-size: 10px;
`

const FPMockBtn = styled.div`
  display: inline-block;
  margin-top: 4px;
  padding: 4px 10px;
  background: #fff;
  color: #000;
  font-weight: 600;
  font-size: 10px;
  border-radius: 4px;
  border: 2px solid #fff;
`

const FPMockH = styled.div`
  font-weight: 700;
  color: #fff;
  font-size: 11px;
  margin-bottom: 6px;
`

const FPMockUl = styled.ul`
  margin: 0;
  padding-left: 1.2em;
  color: #e0e0e0;
  font-size: 10px;
`

const FPMockFlags = styled.div`
  font-size: 15px;
  margin-bottom: 6px;
  letter-spacing: 0;
  word-spacing: -0.15em;
  white-space: nowrap;
`

const FPMockMail = styled.div`
  color: #ffe600;
  font-size: 10px;
  font-weight: 600;
`

const FooterPreviewBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #333;

  @media (min-width: 520px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
`

const FPMockMeta = styled.span`
  color: #888;
  font-size: 10px;
`

const FPMockUtils = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;

  a {
    font-size: 11px;
  }
`

const DividerSample = styled.div`
  margin-top: 8px;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 13px;
  color: #666;
`
