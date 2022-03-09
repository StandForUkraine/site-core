import styled from 'styled-components'

export const Chip = styled.button<{ isActive?: boolean }>`
  background-color: #f2f2f2;
  border-radius: 40px;
  padding: 6px 10px;
  height: 33px;
  border: 2px solid #ffffff;
  outline: none;
  font-weight: 500;
  white-space: nowrap;
  margin-right: 5px;

  &:hover {
    background-color: #FFE600;
  }

  &:focus {
    border-color: #2F80ED;
  }

  ${({ isActive }) => isActive ? `
    background-color: #000;
    color: #fff;
    &:hover {
      background-color: #000;
      color: #FFE600;
    }
  ` : `
    color: #333333;
  `}
`

export default Chip
