import { useState, useMemo, useCallback, ReactElement, ReactNode } from 'react'
import { useText } from 'core/utils/lang'
import MultipleSelection from './MultipleSelection'
import { FilterChip } from './MultipleSelection'
import Chip from './Chip'
import styled from 'styled-components'
import TextButton from './TextButton'

const PINNED_TAGS = ['Military', 'Humanitarian', 'Medical']
const PINNED_PAYMENTS = ['Credit Card', 'Crypto', 'IBAN']

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
  const shouldBeSliced = slice > 0 && !isFiltered && list.length > (sliceAmount as number)
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
          ? ((typeof fieldValue === 'string' ? [fieldValue] : fieldValue) as F2[])
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

  const pinnedTagChips = PINNED_TAGS.filter((tag) => filter1.includes(tag as F1)) as F1[]
  const pinnedPayChips = PINNED_PAYMENTS.filter((pm) => filter2.includes(pm as F2)) as F2[]

  return (
    <>
      {/* Collapsed: desktop only, single row with pinned chips */}
      {!showExpanded && (
        <CollapsedRow>
          {pinnedTagChips.map((option) => (
            <FilterChip key={option} isActive={false} onClick={() => onFilter1ItemClick(option)}>
              {tLabel(option)}
            </FilterChip>
          ))}

          <CollapsedSeparator />

          {pinnedPayChips.map((option) => (
            <FilterChip key={option} isActive={false} onClick={() => onFilter2ItemClick(option)}>
              {t(option)}
            </FilterChip>
          ))}

          <MoreFiltersButton type="button" onClick={() => setExpanded(true)}>
            {t('moreFilters')}
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

        <ResetToolbar>
          <ResetFilterButton
            $hidden={!isFiltered}
            aria-hidden={!isFiltered}
            tabIndex={isFiltered ? 0 : -1}
            onClick={() => {
              onResetFilterClick()
              setSelectedFilter1([])
              setSelectedFilter2([])
            }}
          >
            <ResetIcon viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 3.2a6.8 6.8 0 1 1-5.29 11.08.9.9 0 0 1 1.4-1.12A5 5 0 1 0 5.2 8H8a.9.9 0 1 1 0 1.8H3.2a.9.9 0 0 1-.9-.9V4.1a.9.9 0 0 1 1.8 0v2.1A6.78 6.78 0 0 1 10 3.2Z" />
            </ResetIcon>
            <span>{t('resetFilter')}</span>
          </ResetFilterButton>
        </ResetToolbar>
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

        <ResetToolbar>
          <ResetFilterButton
            $hidden={!isFiltered}
            aria-hidden={!isFiltered}
            tabIndex={isFiltered ? 0 : -1}
            onClick={() => {
              onResetFilterClick()
              setSelectedFilter1([])
              setSelectedFilter2([])
            }}
          >
            <ResetIcon viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 3.2a6.8 6.8 0 1 1-5.29 11.08.9.9 0 0 1 1.4-1.12A5 5 0 1 0 5.2 8H8a.9.9 0 1 1 0 1.8H3.2a.9.9 0 0 1-.9-.9V4.1a.9.9 0 0 1 1.8 0v2.1A6.78 6.78 0 0 1 10 3.2Z" />
            </ResetIcon>
            <span>{t('resetFilter')}</span>
          </ResetFilterButton>
        </ResetToolbar>
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

/* Expanded: desktop only when expanded */
const ExpandedWrapper = styled.div<{ show: boolean }>`
  display: none;
  position: relative;

  @media (min-width: 768px) {
    display: ${(props) => (props.show ? 'block' : 'none')};
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

/** Fixed-height row so “Reset filter” does not shift the org list when it becomes visible */
const ResetToolbar = styled.div`
  width: 100%;
  min-height: 33px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
  padding-right: 16px;
  box-sizing: border-box;

  @media (min-width: 1280px) {
    padding-right: 0;
  }
`

const ResetFilterButton = styled(Chip).attrs({
  type: 'button',
})<{ $hidden: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  margin-right: 0;
  font-size: 14px;
  visibility: ${(p) => (p.$hidden ? 'hidden' : 'visible')};
  pointer-events: ${(p) => (p.$hidden ? 'none' : 'auto')};
`

const ResetIcon = styled.svg`
  width: 14px;
  height: 14px;
  fill: currentColor;
`

const NotFound = styled.h1`
  text-align: center;
`
