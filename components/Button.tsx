import styled from 'styled-components'

export interface ButtonProps {
  color?: 'default' | 'dark' | 'success' | 'white'
  fullWidth?: boolean
  borderRadius?: string | number;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  text-decoration: none;
  padding: 6px 16px;
  border: 2px solid #ffffff;
  color: ${(props) =>
    props.color === 'dark' ? '#fff' : props.color === 'success' ? '#219653' : '#000'};
  font-size: 16px;
  border-radius: ${(props) => typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius};
  font-weight: 600;
  outline: none;
  height: 36px;
  justify-content: center;

  ${(props) => (props.fullWidth ? 'width: 100%;' : '')}

  ${(props) => props.color === 'dark' ? `
    /* dark hover/focus */
    background-color: #000;
    
    &:hover {
      color: #FFE600;
    }
    &:focus {
      border-color: #2F80ED;
    }
  ` : ''}

  ${(props) => props.color === 'success' ? `
    /* success hover/focus */
    background-color: #d0f1d5;
    
    &:hover {
      background-color: #D0F1D5;
    }
    &:focus {
      border-color: #2F80ED;
    }
  ` : ''}

  ${(props) => props.color === 'white' ? `
    /* white hover/focus */
    background-color: #fff;

    /* dirty */
    border-color: #f2f2f2;
    
    &:hover {
      background-color: #FFE600;
    }
    &:focus {
      border-color: #2F80ED;
    }
  ` : ''}

  ${(props) => props.color === 'default' ? `
    /* default hover/focus */
    background-color: #f2f2f2;
    
    &:hover {
      background-color: #FFE600;
    }
    &:focus {
      border-color: #2F80ED;
    }
  ` : ''}
`

Button.defaultProps = {
  color: 'default',
  fullWidth: false,
  borderRadius: 4,
}

export default Button
