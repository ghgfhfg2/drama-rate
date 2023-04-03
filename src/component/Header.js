import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { Image, useToast } from "@chakra-ui/react";
import GoogleAd from "./GoogleAd";

const HeaderTop = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 0 0 / 15%);
  font-size: 12px;
  padding-right: 1rem;
  height: 60px;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 100;
  justify-content: space-between;
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
    height: 40px;
    width: auto;
    font-size: 24px;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
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
              <Link href="/">시주풀이 AI</Link>
              <h1 className="hidden">시로 풀어보는 ai 사주풀이</h1>
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
