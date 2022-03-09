import useMountedRef from 'core/utils/useMountedRef'
import { ReactNode, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import styled from 'styled-components'
import { useText } from 'core/utils/lang'
import Button from './Button'

export interface CopyButtonProps {
  content: string;
  buttonChildren?: ReactNode;
}

export const CopyButton = ({ content, buttonChildren }: CopyButtonProps) => {
  const t = useText()
  const mountedRef = useMountedRef()
  const [copied, setCopied] = useState(false)

  return !copied ? (
    <CopyToClipboard
      text={content}
      onCopy={() => {
        setCopied(true)
        setTimeout(() => {
          if (!mountedRef.current) {
            return
          }

          setCopied(false)
        }, 2000)
      }}
    >
      <CopyBtn color="default">
        {buttonChildren ?? t('copyLink')}
      </CopyBtn>
    </CopyToClipboard>
  ) : (
    <CopyBtn color="success">{t('copyLinkDone')}</CopyBtn>
  )
}

export default CopyButton

const CopyBtn = styled(Button).attrs({
  fullWidth: true,
})`
  margin-top: 16px;
`
