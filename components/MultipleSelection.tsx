import { useState } from 'react'
import styled from 'styled-components'
import { useText } from 'core/utils/lang'
import Chip from './Chip'
import ChipsWrapper from './ChipsWrapper'
import FilterLabel from './FilterLabel'

export interface MultipleSelectionProps<T extends string> {
  title: string | false
  allOptions: T[]
  selectedOptions: T[]
  onOptionClick: (value: T) => any
  toLabel?: (value: T) => string
  collapsedCount?: number
}

export default function MultipleSelection<T extends string>({
  title,
  allOptions,
  selectedOptions,
  onOptionClick,
  toLabel,
  collapsedCount,
}: MultipleSelectionProps<T>) {
  const t: any = toLabel || useText()
  const [expanded, setExpanded] = useState(false)

  const hasSelection = selectedOptions.length > 0
  const shouldCollapse = collapsedCount !== undefined && collapsedCount < allOptions.length && !expanded && !hasSelection
  const visibleOptions = shouldCollapse ? allOptions.slice(0, collapsedCount) : allOptions
  const hasMore = shouldCollapse && allOptions.length > collapsedCount

  return (
    <ChipsWrapper>
      {
        title !== false && (
          <FilterLabel>{title}</FilterLabel>
        )
      }
      {visibleOptions.map((option) => (
        <Chip
          key={option}
          isActive={selectedOptions.indexOf(option) >= 0}
          onClick={() => onOptionClick(option)}
        >
          {t(option)}
        </Chip>
      ))}
      {hasMore && (
        <MoreLink onClick={() => setExpanded(true)}>More</MoreLink>
      )}
    </ChipsWrapper>
  )
}

const MoreLink = styled.button`
  background: none;
  border: none;
  color: #2F80ED;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  padding: 6px 8px;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 767px) {
    display: none;
  }
`
