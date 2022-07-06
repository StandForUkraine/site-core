import * as React from 'react';
import styled from 'styled-components';
import { useText } from '../utils/lang';
import CopyButton from './CopyButton';

export type WidgetItemProps = {
  params: string
};

export const WidgetItem = (props: WidgetItemProps) => {
  const t = useText();
  const content = `<script id="sfuw" type="text/javascript" async="true" src="https://cdn.jsdelivr.net/gh/StandForUkraine/site-widget@1.0/artifacts/index.iife.min.js${props.params}"></script>`;

  return (
    <ContainerWrapper>
      <Container>
        <Iframe
          sandbox="allow-scripts allow-same-origin allow-popups"
          src={`/codesandbox${props.params}`}
        />
        <ButtonWrapper>
          <CopyButton
            content={content}
            buttonChildren={t('widgetCopyCode')}
          />
        </ButtonWrapper>
        <Textarea
          readOnly={true}
          value={content}
          rows={8}
        />
      </Container>
    </ContainerWrapper>
  )
};

const ContainerWrapper = styled.div`
  padding: 8px 0;
`;

const Container = styled.div`
  display: 'flex';
  border-radius: 16px;
  border: 1px solid #f2f2f2;
  overflow: hidden;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 300px;
  border-style: none;
  background-color: #f2f2f2;
`

const Textarea = styled.textarea`
  appearance: none;
  outline: none;
  resize: none;
  display: block;
  font-family: Roboto Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
  width: 100%;
  padding: 16px 24px;
  font-size: 14px;
  border: none;
`;

const ButtonWrapper = styled.div`
  padding-left: 24px;
  padding-right: 24px;
`;
