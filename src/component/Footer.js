import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const FooterBox = styled.div`
  border-top: 1px solid #ddd;
  .content_box {
    width: 100%;
    padding-top: 1rem;
    max-width: 1400px;
    margin: 0 auto;
    .logo {
      width: 100px;
      margin-right: 80px;
    }
    .footer_con {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #999;
    }
  }
`;

export default function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <FooterBox>
      <div className="content_box">
        <div className="footer_con">
          © Copyright 2023 All rights reserved by sy_dev
        </div>
      </div>
    </FooterBox>
  );
}
