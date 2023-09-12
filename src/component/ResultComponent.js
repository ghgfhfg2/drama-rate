import React, { useState, useEffect } from "react";
import { peoples } from "../peopleDb";
import styled from "styled-components";
import ResultInfo from "./ResultInfo/ResultInfo";
import KaKaoShare from "./KaKaoShare";
import { useRouter } from "next/router";
const ResultBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  padding-top: 3rem;
  h2 {
    font-size: 28px;
    span {
      font-size: 40px;
      color: #4a63e9;
    }
  }
  .same_people {
    margin-top: 20px;
    span {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

export default function ResultComponent({ resId }) {
  const [samePeople, setSamePeople] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const selectPeoples = peoples.filter((el) => {
      return el.number == resId;
    });
    setSamePeople(selectPeoples);
  }, [resId]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="loading loading03">
            <span>탄</span>
            <span>생</span>
            <span>수</span>
            <span>계</span>
            <span>산</span>
            <span>중</span>
          </div>
        </>
      ) : (
        <>
          <ResultBox>
            <h2>
              당신의 탄생수는 <span>{resId}</span> 입니다.
            </h2>
            <ResultInfo uid={resId} />
            <div className="same_people">
              당신과 같은 탄생수를 가진 유명인으로는
              <br />
              {samePeople &&
                samePeople.map((el, idx) => {
                  return samePeople.length - 1 == idx ? (
                    <>
                      <span>{el.name} </span>
                    </>
                  ) : (
                    <>
                      <span>{el.name}, </span>
                    </>
                  );
                })}
              가(이) 있어요.
            </div>
            <KaKaoShare url={`https://soul-number.sooyadev.com`} id={resId} />
          </ResultBox>
        </>
      )}
    </>
  );
}
