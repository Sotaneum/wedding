import { useState } from "react";
import "./Accordion.css";

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleAccordion = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  return (
    <div className="accordion-item">
      <div
        className="accordion-header"
        onClick={() => toggleAccordion("bride")}
      >
        <span>{title}</span>
        <span
          className={`accordion-icon ${expanded === "bride" ? "open" : ""}`}
        >
          ▼
        </span>
      </div>
      <div
        className={`accordion-content ${expanded === "bride" ? "open" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
