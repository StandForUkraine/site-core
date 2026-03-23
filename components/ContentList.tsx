import { useState, useMemo, useCallback, ReactElement, ReactNode } from 'react'
import { useText } from 'core/utils/lang'
import MultipleSelection from './MultipleSelection'
import { FilterChip } from './MultipleSelection'
import styled from 'styled-components'
import TextButton from './TextButton'

const PINNED_TAGS = ['Military', 'Humanitarian', 'Medical']
const PINNED_PAYMENTS = ['Credit Card', 'Crypto']

interface Item {
  id: string | number
  tags: string[]
  hidden?: boolean
  [key: string]: any
}

export interface ContentListProps<I extends Item, F1 extends string, F2 extends string> {
  list: I[]
  filter1: F1[]
  filter2: F2[]
  filter2Field: string
  itemBuilder: (item: I) => ReactElement
  filter1Title: string | false
  filter2Title: string | false
  onResetFilterClick: () => void
  onShowAllClick: () => void
  showAllButtonChildren: ReactNode
  sliceAmount?: number
  filter1ToLabel?: (value: F1) => string
  filter2ToLabel?: (value: F2) => string
}

export const ContentList = <I extends Item, F1 extends string, F2 extends string>({
  list,
  filter1,
  filter2,
  sliceAmount,
  filter2Field,
  itemBuilder,
  filter1Title,
  filter2Title,
  onResetFilterClick,
  onShowAllClick,
  showAllButtonChildren,
  filter1ToLabel,
  filter2ToLabel,
}: ContentListProps<I, F1, F2>) => {
  const t: any = useText()
  const [selectedFilter1, setSelectedFilter1] = useState<F1[]>([])
  const [selectedFilter2, setSelectedFilter2] = useState<F2[]>([])
  const [slice, setSlice] = useState(sliceAmount as number)
  const [expanded, setExpanded] = useState(false)

  const isFiltered = selectedFilter1.length > 0 || selectedFilter2.length > 0
  const shouldBeSliced = slice > 0 && !isFiltered && list.length > (sliceAmount as number);
  const showExpanded = expanded || isFiltered

  const filteredList = useMemo(
    () =>
      list.filter((item) => {
        const tags = item.tags || []
        const tagResult =
          selectedFilter1.length > 0
            ? !!(tags as F1[]).find((tag) => selectedFilter1.indexOf(tag) >= 0)
            : true

        const fieldValue = item[filter2Field]
        const fieldArray = fieldValue
          ? (typeof fieldValue === 'string' ? [fieldValue] : fieldValue) as F2[]
          : []
        const methodResult =
          selectedFilter2.length > 0
            ? !!fieldArray.find((method) => selectedFilter2.indexOf(method) >= 0)
            : true

        return tagResult && methodResult && !item.hidden
      }),
    [list, selectedFilter1, selectedFilter2]
  )

  const onFilter1ItemClick = useCallback(
    (item: F1) => {
      setExpanded(true)
      const newTags =
        selectedFilter1.indexOf(item) >= 0
          ? selectedFilter1.filter((_t) => _t !== item)
          : [...selectedFilter1, item]
      setSelectedFilter1(newTags)
    },
    [selectedFilter1, setSelectedFilter1]
  )

  const onFilter2ItemClick = useCallback(
    (item: F2) => {
      setExpanded(true)
      const newMethods =
        selectedFilter2.indexOf(item) >= 0
          ? selectedFilter2.filter((m) => m !== item)
          : [...selectedFilter2, item]
      setSelectedFilter2(newMethods)
    },
    [selectedFilter2, setSelectedFilter2]
  )

  const tLabel: any = filter1ToLabel || t

  const pinnedTagChips = PINNED_TAGS.filter(tag => filter1.includes(tag as F1)) as F1[]
  const pinnedPayChips = PINNED_PAYMENTS.filter(pm => filter2.includes(pm as F2)) as F2[]

  return (
    <>
      {/* Collapsed: desktop only, single row with pinned chips */}
      {!showExpanded && (
        <CollapsedRow>
          {pinnedTagChips.map((option) => (
            <FilterChip
              key={option}
              isActive={false}
              onClick={() => onFilter1ItemClick(option)}
            >
              {tLabel(option)}
            </FilterChip>
          ))}

          <CollapsedSeparator />

          {pinnedPayChips.map((option) => (
            <FilterChip
              key={option}
              isActive={false}
              onClick={() => onFilter2ItemClick(option)}
            >
              {t(option)}
            </FilterChip>
          ))}

          <MoreFiltersButton onClick={() => setExpanded(true)}>
            More filters
          </MoreFiltersButton>
        </CollapsedRow>
      )}

      {/* Expanded: full 2-row layout with labels */}
      <ExpandedWrapper show={showExpanded}>
        <MultipleSelection
          title={filter1Title}
          allOptions={filter1}
          selectedOptions={selectedFilter1}
          onOptionClick={onFilter1ItemClick}
          toLabel={filter1ToLabel}
        />

        <MultipleSelection
          title={filter2Title}
          allOptions={filter2}
          selectedOptions={selectedFilter2}
          onOptionClick={onFilter2ItemClick}
          toLabel={filter2ToLabel}
        />

        {isFiltered && (
          <ResetFilterButton
            onClick={() => {
              onResetFilterClick()
              setSelectedFilter1([])
              setSelectedFilter2([])
            }}
          >
            {t('resetFilter')}
          </ResetFilterButton>
        )}
      </ExpandedWrapper>

      {/* Mobile: always show 2-row layout */}
      <MobileFilterWrapper>
        <MultipleSelection
          title={filter1Title}
          allOptions={filter1}
          selectedOptions={selectedFilter1}
          onOptionClick={onFilter1ItemClick}
          toLabel={filter1ToLabel}
        />

        <MultipleSelection
          title={filter2Title}
          allOptions={filter2}
          selectedOptions={selectedFilter2}
          onOptionClick={onFilter2ItemClick}
          toLabel={filter2ToLabel}
        />

        {isFiltered && (
          <ResetFilterButton
            onClick={() => {
              onResetFilterClick()
              setSelectedFilter1([])
              setSelectedFilter2([])
            }}
          >
            {t('resetFilter')}
          </ResetFilterButton>
        )}
      </MobileFilterWrapper>

      {filteredList.length < 1 && <NotFound>Nothing found.</NotFound>}

      <ListWrapper>
        {(shouldBeSliced ? filteredList.slice(0, slice) : filteredList).map(itemBuilder)}
        {shouldBeSliced && (
          <ButtonWrapper>
            <TextButton
              onClick={() => {
                onShowAllClick()
                setSlice(0)
              }}
            >
              {showAllButtonChildren}
            </TextButton>
          </ButtonWrapper>
        )}
      </ListWrapper>
    </>
  )
}

ContentList.defaultProps = {
  sliceAmount: 9,
}

export default ContentList

/* Collapsed row: desktop only */
const CollapsedRow = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    padding: 0 16px;
    margin-top: 15px;
  }

  @media (min-width: 1280px) {
    padding: 0;
  }
`

const CollapsedSeparator = styled.div`
  width: 1px;
  height: 24px;
  background: #e0e0e0;
  margin: 0 12px;
  flex-shrink: 0;
`

const MoreFiltersButton = styled.button`
  background: none;
  border: none;
  color: #2F80ED;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  padding: 6px 12px;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }
`

/* Expanded: desktop only when expanded */
const ExpandedWrapper = styled.div<{ show: boolean }>`
  display: none;
  position: relative;

  @media (min-width: 768px) {
    display: ${(props) => props.show ? 'block' : 'none'};
    padding: 0 16px;
    margin-top: 15px;
  }

  @media (min-width: 1280px) {
    padding: 0;
  }
`

/* Mobile: always visible below 768px */
const MobileFilterWrapper = styled.div`
  position: relative;

  @media (min-width: 768px) {
    display: none;
  }
`

const ListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding-top: 16px;
  padding-bottom: 52px;
  border-bottom: 1px solid #e0e0e0;

  @media (min-width: 1280px) {
    padding-top: 28px;
  }
`

const ButtonWrapper = styled.div`
  text-align: center;
  padding-top: 9px;
  width: 100%;
`

const ResetFilterButton = styled(TextButton).attrs({
  variant: 'external-link',
  size: 'small',
})`
  position: absolute;
  bottom: -12px;
  right: 20px;

  @media (min-width: 768px) {
    position: static;
    margin-top: 8px;
    display: inline-flex;
  }

  @media (min-width: 1280px) {
    right: 0;
  }
`

const NotFound = styled.h1`
  text-align: center;
`
