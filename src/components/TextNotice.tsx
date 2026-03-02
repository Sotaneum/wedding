import "./Notice.css";

interface TextNoticeProps {
  title?: string;
  message?: string[];
}

function TextNotice({
  title = "주차 안내",
  message = [
    "주차가 어려울 수 있어 30분정도 미리 도착해주시면 감사드리겠습니다.",
  ],
}: TextNoticeProps) {
  return (
    <div className="notice-container">
      <h2 className="notice-title">{title}</h2>
      <p className="notice-message">
        {message.map((msg) => (
          <span key={msg}>{msg}</span>
        ))}
      </p>
    </div>
  );
}

export default TextNotice;
