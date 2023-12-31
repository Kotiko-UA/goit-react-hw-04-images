import { styled } from 'styled-components';

export const Div = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid #3f51b5;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  left: 50%;
  animation: pulse 1s linear infinite;

  &:after {
    content: '';
    position: absolute;
    width: 48px;
    height: 48px;
    border: 5px solid #3f51b5;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: scaleUp 1s linear infinite;
  }

  @keyframes scaleUp {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    60%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @keyframes pulse {
    0%,
    60%,
    100% {
      transform: scale(1);
    }
    80% {
      transform: scale(1.2);
    }
  }
`;
