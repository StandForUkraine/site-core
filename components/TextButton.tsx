import styled from 'styled-components';

export interface TextButtonProps {
  size?: 'small' | 'regular' | 'large';
  variant?: 'default' | 'external-link';
}

export const TextButton = styled.button<TextButtonProps>`
  background: none;
  border-radius: 4px;
  text-decoration: underline;
  border: 2px solid transparent;
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  padding: 0 4px;
  
  ${(props) => props.variant === 'default' ? `
    color: #2F80ED;

    &:hover {
      color: #2D9CDB;
    }

    &:focus {
      border-color: #2F80ED;
      text-decoration: none;
    }

    &:visited {
      color: #9B51E0;
    }
  ` : ''}

  ${(props) => props.variant === 'external-link' ? `
    color: #828282;

    &:hover {
      color: #2F80ED;
    }

    &:focus {
      border-color: #2F80ED;
      color: #828282;
      text-decoration: none;
    }

    &:visited {
      color: #BB6BD9;
    }
  ` : ''}

  ${(props) => props.size === 'small' ? `
    font-size: 14px;
    line-height: 20px;
    height: 22px;
  ` : ''}

  ${(props) => props.size === 'regular' ? `
    font-size: 16px;
    line-height: 22px;
    height: 24px;
  ` : ''}

  ${(props) => props.size === 'large' ? `
    font-size: 18px;
    line-height: 22px;
    height: 24px;
  ` : ''}
`;

TextButton.defaultProps = {
  size: 'regular',
  variant: 'default',
};

export default TextButton;
