import styled from 'styled-components'
import { useText } from 'core/utils/lang'
import Chip from './Chip'
import FilterLabel from './FilterLabel'

export interface MultipleSelectionProps<T extends string> {
  title: string | false
  allOptions: T[]
  selectedOptions: T[]
  onOptionClick: (value: T) => any
  toLabel?: (value: T) => string
}

export default function MultipleSelection<T extends string>({
  title,
  allOptions,
  selectedOptions,
  onOptionClick,
  toLabel,
}: MultipleSelectionProps<T>) {
  const t: any = toLabel || useText()

  return (
    <FilterGroup>
      {title !== false && <FilterLabel>{title}</FilterLabel>}
      {allOptions.map((option) => (
        <FilterChip
          key={option}
          isActive={selectedOptions.indexOf(option) >= 0}
          onClick={() => onOptionClick(option)}
        >
          {t(option)}
        </FilterChip>
      ))}
    </FilterGroup>
  )
}

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0 16px;
  margin-top: 15px;

  @media (min-width: 768px) {
    overflow: visible;
    margin-top: 8px;
    padding: 0;
  }
`

export const FilterChip = styled(Chip)`
  @media (min-width: 768px) {
    height: 40px;
    font-size: 16px;
    padding: 8px 14px;
  }
`
