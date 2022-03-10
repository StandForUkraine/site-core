import { useState, useMemo, useCallback } from 'react'
import { DonationItem } from 'core/utils/donations'
import { useLang, useText } from 'core/utils/lang'
import { allTags, Tag } from 'core/utils/tags'
import { payMethods, PayMethod } from 'core/utils/payMethods'
import MultipleSelection from './MultipleSelection'
import DonationWidget from './DonationWidget'
import styled from 'styled-components'
import TextButton from './TextButton'
import { useGtag } from 'core/utils/useGtag'

export const Donations = ({ donations }: { donations: DonationItem[] }) => {
  const t = useText()
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [selectedMethods, setSelectedMethods] = useState<PayMethod[]>([])
  const [slice, setSlice] = useState(9)
  const { lang } = useLang()
  const gtag = useGtag()

  const shouldBeSliced = slice > 0 && selectedTags.length === 0 && selectedMethods.length === 0;

  const filteredDonations = useMemo(
    () =>
      donations
        .filter((donation) => {
          const tagResult =
            selectedTags.length > 0
              ? !!donation.tags.find((tag) => selectedTags.indexOf(tag) >= 0)
              : true

          const methodResult =
            selectedMethods.length > 0
              ? !!donation.payMethods.find((method) => selectedMethods.indexOf(method) >= 0)
              : true

          return tagResult && methodResult
        })
        .map((donation) => ({ ...donation, ...donation.byLang[lang] })),
    [donations, selectedTags, selectedMethods, lang]
  )

  const onTagClick = useCallback(
    (tag: Tag) => {
      const newTags =
        selectedTags.indexOf(tag) >= 0
          ? selectedTags.filter((_t) => _t !== tag)
          : [...selectedTags, tag]
      setSelectedTags(newTags)
    },
    [selectedTags, setSelectedTags]
  )

  const onMethodClick = useCallback(
    (method: PayMethod) => {
      const newMethods =
        selectedMethods.indexOf(method) >= 0
          ? selectedMethods.filter((m) => m !== method)
          : [...selectedMethods, method]
      setSelectedMethods(newMethods)
    },
    [selectedMethods, setSelectedMethods]
  )

  return (
    <>
      <MultipleSelection
        title={t('filterTo')}
        allOptions={[...allTags]}
        selectedOptions={selectedTags}
        onOptionClick={onTagClick}
      />

      <MultipleSelection
        title={t('filterPayVia')}
        allOptions={payMethods.filter((m) => m !== 'Western Union')}
        selectedOptions={selectedMethods}
        onOptionClick={onMethodClick}
      />

      {filteredDonations.length < 1 && <h1>Nothing found.</h1>}

      <DonationWrapper>
        {
          (shouldBeSliced ? filteredDonations.slice(0, slice) : filteredDonations).map((donation) => (
            <DonationWidget key={donation.id} donation={donation} />
          ))
        }
        {
          shouldBeSliced && (
            <ButtonWrapper>
              <TextButton
                onClick={() => {
                  gtag('event', 'show_all_orgs_click', { event_category: 'home_page' });
                  setSlice(0)
                }}
              >
                {t('browseAll1')} {filteredDonations.length} {t('browseAll2')}
              </TextButton>
            </ButtonWrapper>
          )
        }
      </DonationWrapper>
    </>
  )
}

export default Donations

const DonationWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding-top: 16px;
  padding-bottom: 52px;
  border-bottom: 1px solid #E0E0E0;

  @media (min-width: 1280px) {
    padding-top: 28px;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  padding-top: 9px;
  width: 100%;
`;
