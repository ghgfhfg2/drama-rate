import React, { useEffect } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import styled from "styled-components";
const KaKaoShareComponent = styled.div`
  background: #fee500;
  padding: 7px 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 5px;
  margin: 20px auto;
  margin-top: 30px;
  cursor: pointer;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
  svg {
    font-size: 18px;
  }
`;

export default function KaKaoShare({ url, id }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const shareKakao = (route, id) => {
    console.log(
      "process.env.NEXT_PUBLIC_SHARE_KAKAO_LINK_KEY",
      process.env.NEXT_PUBLIC_SHARE_KAKAO_LINK_KEY
    );
    // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_SHARE_KAKAO_LINK_KEY); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
      }

      kakao.Link.sendDefault({
        objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
        content: {
          title: `탄생수 테스트`, // 인자값으로 받은 title
          description: `나의 탄생수의 컬러, 이미지, 특징에 대해 알아보세요.`, // 인자값으로 받은 title
          imageUrl: "이미지 url",
          link: {
            mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
            webUrl: route,
          },
        },
        buttons: [
          {
            title: `탄생수 테스트 하러가기`,
            link: {
              mobileWebUrl: route,
              webUrl: route,
            },
          },
        ],
      });
    }
  };
  return (
    <>
      <KaKaoShareComponent onClick={() => shareKakao(url, id)}>
        <button>
          <RiKakaoTalkFill />
        </button>
        카카오톡 공유하기
      </KaKaoShareComponent>
    </>
  );
}
