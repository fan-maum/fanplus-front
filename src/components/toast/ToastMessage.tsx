import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

type ToastMessageProps = {
  message: string;
};

const ToastMessage: React.FC<ToastMessageProps> = ({ message }) => (
  <ToastWrapper>{message}</ToastWrapper>
);

export default ToastMessage;

const slideDown = keyframes`
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 30px;
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    top: 30px;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
`;

const ToastWrapper = styled.div`
  position: fixed;
  top: 30px;
  z-index: 999999;

  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  margin-top: 8px;
  padding: 10px 30px;

  background-color: #ffffff;
  align-items: center;
  color: #000;

  animation: ${slideDown} 300ms, ${slideUp} 300ms 2.9s;

  border-radius: 30px;
  box-shadow: -1px -1px 5px -1px rgb(255 255 255 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%),
    0px 1px 18px 0px rgb(135 135 135 / 12%);
`;
