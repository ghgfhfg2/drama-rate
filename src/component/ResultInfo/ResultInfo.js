import React, { useEffect, useState } from "react";
import { birthInfo } from "./birthDb";
import styled from "styled-components";
import Image from "next/image";
const ResultInfoBox = styled.div`
  .img_box {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 3px 3px 17px rgba(0, 0, 0, 0.4);
    margin: 20px auto;
    max-width: 70%;
  }
  .info_box {
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 28px;
      text-align: center;
    }
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-top: 35px;
    dl {
      margin-top: 10px;
      dt {
        font-size: 17px;
        font-weight: 600;
      }
    }
  }
`;

export default function ResultInfo({ uid }) {
  const [infoData, setInfoData] = useState();
  useEffect(() => {
    setInfoData(birthInfo[1 * uid - 1]);
  }, [uid]);

  return (
    <>
      <ResultInfoBox>
        <div className="img_box">
          <img src={`/images/card/${uid}.png`} alt="" />
        </div>
        <div className="info_box">
          <h3>탄생수 {uid}의 특징은 다음과 같아요.</h3>
          {infoData &&
            infoData.map((el) => (
              <>
                <dl>
                  <dt>{el.title}</dt>
                  <dd>{el.info}</dd>
                </dl>
              </>
            ))}
        </div>
      </ResultInfoBox>
    </>
  );
}
