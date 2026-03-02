import { useState } from "react";
import "./Congratulations.css";
import Accordion from "./Accordion";
import CopyIcon from "./svg/CopyIcon";

interface AccountItem {
  name: string;
  bank: string;
  account: string;
  role: string;
  description?: string;
}

interface CongratulationsProps {
  items: {
    title: string;
    accounts: AccountItem[];
  }[];
  copyMessage?: string;
  title?: string;
  message?: string[];
  copyAriaLabel?: string;
}

function Congratulations({
  items,
  copyMessage = "계좌번호가 복사되었습니다.",
  title = "축하의 마음 전하기",
  message = [
    "축하의 마음을 담아 축의금을 전달해 보세요.",
    "감사한 마음 간직하겠습니다.",
  ],
  copyAriaLabel = "계좌번호 복사",
}: CongratulationsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (item: { account: string; bank: string }) => {
    const rawAccount = `${item.bank} ${item.account.replace(/-/g, "")}`;
    navigator.clipboard.writeText(rawAccount).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="congratulations-container">
      <h1 className="congratulations-title">{title}</h1>
      <p className="congratulations-message">
        {message.map((line, index) => (
          <span key={index}>
            {line}
            {index < message.length - 1 && <br />}
          </span>
        ))}
      </p>
      <div className="accounts-wrapper">
        {items.map(({ title, accounts }) => (
          <Congratulation
            key={title}
            title={title}
            accounts={accounts}
            onCopy={handleCopy}
            copyAriaLabel={copyAriaLabel}
          />
        ))}
      </div>
      <div className={`copied-message ${copied ? "visible" : ""}`}>
        {copyMessage}
      </div>
    </div>
  );
}

interface CongratulationProps {
  title: string;
  accounts: AccountItem[];
  onCopy: (item: AccountItem) => void;
  copyAriaLabel: string;
}

function Congratulation({
  title,
  accounts,
  onCopy,
  copyAriaLabel,
}: CongratulationProps) {
  return (
    <Accordion title={title}>
      <ul className="contact-list">
        {accounts.map((item, index) => (
          <li key={index} className="contact-row">
            <div className="contact-info">
              <div className="contact-role-name">
                <span className="contact-role">{item.role}</span>
                <span className="contact-name">{item.name}</span>
              </div>
              <div className="account-details">
                <span className="account-bank">{item.bank}</span>
                <span className="account-number">{item.account}</span>
              </div>
              {item.description && (
                <span className="account-description">{item.description}</span>
              )}
            </div>
            <button
              className="copy-button"
              onClick={() => onCopy(item)}
              aria-label={copyAriaLabel}
            >
              <CopyIcon />
            </button>
          </li>
        ))}
      </ul>
    </Accordion>
  );
}

export default Congratulations;
