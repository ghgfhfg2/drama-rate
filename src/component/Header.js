import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { Image, useToast } from "@chakra-ui/react";
import GoogleAd from "./GoogleAd";
import { AiOutlineCalculator } from "react-icons/ai";

const HeaderTop = styled.div`
  width: 100%;
  background: #fff;
  padding-top: 5px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 15%);
  font-size: 12px;
  height: 60px;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 100;
  justify-content: center;
  .left {
    display: flex;
    align-items: center;
  }
  .logo_box {
    width: 100%;
  }
  .logo {
    font-family: "Tenada", "NanumGothic", sans-serif;
    cursor: pointer;
    display: flex;
    width: auto;
    color: #fff;
    background: #4a63e9;
    padding: 0 1rem;
    border-radius: 5px;
    padding-top: 8px;
    font-size: 24px;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    .icon {
      margin-left: 7px;
      font-size: 33px;
      position: relative;
      bottom: 4px;
    }
    img {
      max-height: 30px;
    }
  }
  .menu {
    display: flex;
    align-items: center;
    height: 100%;
  }
  li {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 0.5rem;
    a {
      padding: 0.5rem 1rem;
      font-size: 14px;
      color: var(--m-color);
    }
    &.on {
      color: var(--m-color);
      a {
        font-weight: 600;
        border-radius: 6px;
        background: var(--m-color);
        color: #fff;
      }
    }
  }
  .hidden {
    width: 0;
    height: 0;
    position: absolute;
    z-index: -1;
  }
  .right {
    display: flex;
    margin-right: 1rem;
    align-items: center;
    height: 100%;
    li a {
      padding: 0.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    .menu {
      display: none;
    }
  }
`;

function Header({ logoImg }) {
  const router = useRouter();
  const toast = useToast();

  return (
    <>
      <HeaderTop>
        <div className="left">
          <div className="logo_box">
            <div className="logo">
              <Link href="/">탄생수 계산기</Link>
              <AiOutlineCalculator className="icon" />
              <h1 className="hidden">탄생수로 알아보는 나의 유형</h1>
            </div>
          </div>
          {/* <ul className="menu">
            <li className={router.route.indexOf("/add") > -1 ? "on" : ""}>
              <Link href="/add">메뉴</Link>
            </li>
          </ul> */}
        </div>
      </HeaderTop>
    </>
  );
}

export default Header;
