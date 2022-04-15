import { useState, useMemo, useCallback, ReactElement, ReactNode } from 'react'
import { useText } from 'core/utils/lang'
import MultipleSelection from './MultipleSelection'
import styled from 'styled-components'
import TextButton from './TextButton'

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
  const t = useText()
  const [selectedFilter1, setSelectedFilter1] = useState<F1[]>([])
  const [selectedFilter2, setSelectedFilter2] = useState<F2[]>([])
  const [slice, setSlice] = useState(sliceAmount as number)

  const isFiltered = selectedFilter1.length > 0 || selectedFilter2.length > 0
  const shouldBeSliced = slice > 0 && !isFiltered && list.length > (sliceAmount as number);

  const filteredList = useMemo(
    () =>
      list.filter((item) => {
        const tagResult =
          selectedFilter1.length > 0
            ? !!(item.tags as F1[]).find((tag) => selectedFilter1.indexOf(tag) >= 0)
            : true

        const methodResult =
          selectedFilter2.length > 0
            ? !!((typeof item[filter2Field] === 'string'
              ? [item[filter2Field]]
              : item[filter2Field]) as F2[]).find((method) => selectedFilter2.indexOf(method) >= 0)
            : true

        return tagResult && methodResult && !item.hidden
      }),
    [list, selectedFilter1, selectedFilter2]
  )

  const onFilter1ItemClick = useCallback(
    (item: F1) => {
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
      const newMethods =
        selectedFilter2.indexOf(item) >= 0
          ? selectedFilter2.filter((m) => m !== item)
          : [...selectedFilter2, item]
      setSelectedFilter2(newMethods)
    },
    [selectedFilter2, setSelectedFilter2]
  )

  return (
    <>
      <FilterWrapper isFiltered={isFiltered}>
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

        {(selectedFilter1.length > 0 || selectedFilter2.length > 0) && (
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
      </FilterWrapper>

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

const FilterWrapper = styled.div<{ isFiltered?: boolean }>`
  position: relative;

  ${(props) =>
    props.isFiltered
      ? `
    padding-bottom: 24px;

    @media (min-width: 768px) {
      padding-bottom: 0;
    }
  `
      : ''}
`

const ResetFilterButton = styled(TextButton).attrs({
  variant: 'external-link',
  size: 'small',
})`
  position: absolute;
  bottom: -12px;
  right: 20px;

  @media (min-width: 768px) {
    bottom: 6px;
  }

  @media (min-width: 1280px) {
    right: 0;
  }
`

const NotFound = styled.h1`
  text-align: center;
`
