import styled from 'styled-components'
import { DonationItem } from 'core/utils/donations'
import { useText } from 'core/utils/lang'
import LazyLoad from 'react-lazyload'
import Button from './Button'
import { useGtag } from 'core/utils/useGtag'
import InfoIcon from 'core/assets/info.svg'
import LegalPopup from './LegalPopup'
import { useState } from 'react'

export const DonationWidget = ({ donation }: { donation: DonationItem }) => {
  const [visibleLegalPopup, setVisibleLegalPopup] = useState(false)
  const t = useText()
  const gtag = useGtag()

  const showEin = !!donation.ein
  const showEdrpou = !!donation.edrpou && !showEin

  return (
    <DonationPost>
      <LazyLoad once offset={500}>
        <DonationLogo src={donation.logo} alt={donation.logoAlt || donation.title} />
      </LazyLoad>

      <DonationTitle
        href={donation.link}
        target="_blank"
        rel="noopener"
        onClick={() =>
          gtag('event', 'external_link_click', {
            event_category: 'home_page',
            event_label: donation.link,
          })
        }
      >
        {donation.title}
      </DonationTitle>

      <DonationTags>{donation.tags.join(', ')}</DonationTags>
      <DonationDescription>{donation.description}</DonationDescription>
      <DonationPayMethods>
        {donation.payMethods.map((method) => (
          <span key={method}>{method}</span>
        ))}
      </DonationPayMethods>

      <DonationFooter>
        <DonationButton
          as="a"
          href={donation.donateLink}
          target="_blank"
          rel="noopener"
          onClick={() =>
            gtag('event', 'external_link_click', {
              event_category: 'donate',
              event_label: donation.donateLink,
            })
          }
        >
          {t('donateButton')}
        </DonationButton>

        {showEdrpou && (
          <LegalNumber
            onClick={() => {
              gtag('event', 'legal_info_click', {
                event_category: 'edrpou',
                event_label: donation.edrpou,
              })
              setVisibleLegalPopup(true)
            }}
          >
            ЄДРПОУ: {donation.edrpou} <InfoIcon />
          </LegalNumber>
        )}

        {showEin && (
          <LegalNumber
            as="a"
            target="_blank"
            rel="noopener"
            href={`https://charitynavigator.org/ein/${donation.ein!.replace('-', '')}`}
            onClick={() =>
              gtag('event', 'legal_info_click', {
                event_category: 'ein',
                event_label: donation.ein,
              })
            }
          >
            EIN: {donation.ein} <InfoIcon />
          </LegalNumber>
        )}
      </DonationFooter>

      {visibleLegalPopup && (
        <LegalPopup donation={donation} onClose={() => setVisibleLegalPopup(false)} />
      )}
    </DonationPost>
  )
}

export default DonationWidget

const DonationPost = styled.div`
  padding: 20px;
  max-width: 556px;
  width: 100%;
  display: inline-block;

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 1280px) {
    width: calc(100% / 3);
  }
`

export const DonationLogo = styled.img``

export const DonationTitle = styled.a`
  display: block;
  color: #000;
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const DonationTags = styled.div`
  color: #777;
`

export const DonationPayMethods = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;

  span {
    border: 1px solid #aaa;
    border-radius: 15px;
    padding: 3px 5px;
    font-size: 13px;
    margin-right: 8px;
    margin-bottom: 5px;
    white-space: nowrap;
  }
`

export const DonationDescription = styled.p`
  margin: 10px 0 20px;
`

export const DonationFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const LegalNumber = styled.button`
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  background: none;
  font-size: 14px;
  color: #777;
  display: flex;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 4px;

  svg {
    margin-left: 5px;
  }

  &:hover {
    color: #555;
    text-decoration: underline;
  }

  &:focus {
    border-color: #2f80ed;
  }
`

export const DonationButton = styled(Button).attrs({
  color: 'dark',
})``
