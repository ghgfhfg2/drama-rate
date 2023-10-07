import React from "react";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Select,
  Button,
  Flex,
  Checkbox,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import styled from "styled-components";
export const CommonPopup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  animation: fadeIn 0.2s forwards;
  opacity: 0;
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.25);
  }
  .con_box {
    h2.title {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      margin-bottom: 10px;
    }
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    transform: translateY(30px);
    z-index: 10;
    animation: fadeUp 0.2s forwards;
  }
  @keyframes fadeUp {
    to {
      transform: translateY(0);
    }
  }
`;

export default function CommonPop({ closePop }) {
  return (
    <CommonPopup>
      <div className="con_box"></div>
      <div className="bg" onClick={closePop}></div>
    </CommonPopup>
  );
}
