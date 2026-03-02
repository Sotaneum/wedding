import { useEffect, useRef } from "react";
import "./Share.css";
import KakaoTalk from "./svg/KakaoTalk";

interface ShareProps {
  title?: string;
  templateId: number;
}

const Share = ({ templateId, title = "카카오톡으로 공유하기" }: ShareProps) => {
  const kakaoShareBtnRef = useRef<HTMLButtonElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!window?.Kakao || !kakaoShareBtnRef.current || isInitialized.current) {
      return;
    }

    try {
      window.Kakao.Share.createCustomButton({
        container: kakaoShareBtnRef.current,
        templateId,
      });
      isInitialized.current = true;
    } catch (error) {
      console.error("Failed to initialize Kakao Share button", error);
    }
  }, [templateId]);
  return (
    <div className="share-container">
      <button ref={kakaoShareBtnRef} className="kakao-share-button">
        <KakaoTalk />
        {title}
      </button>
    </div>
  );
};
export default Share;
