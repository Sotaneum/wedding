import { Fragment } from "react/jsx-runtime";
import "./Notice.css";
import toImageUrl from "../utils/toImageUrl";
import ASSETS_IMAGES from "../assets";

interface Info {
  label: string;
  time: string;
  note?: string;
  desc?: string;
}

interface BusNoticeProps {
  title?: string;
  steps: Info[];
  qr?: {
    description?: string[];
    link?: string;
    img: string;
    imgAlt?: string;
  };
}

function BusNotice({ title = "대절 버스 안내", steps, qr }: BusNoticeProps) {
  const image = qr ? toImageUrl(ASSETS_IMAGES, qr.img) : "";

  return (
    <div className="notice-container">
      <h2 className="notice-title">{title}</h2>
      <div className="notice-message">
        <div className="bus-timeline">
          {steps.map((step, index) => (
            <Fragment key={step.label}>
              <Step {...step} />
              {index < steps.length - 1 && (
                <div className="timeline-connector">
                  <div className="connector-line" />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {!!qr && (
          <div className="notice-footer">
            {!!qr.description && (
              <p className="notice-footer-text">
                {qr.description.map((desc, index, arr) => (
                  <Fragment key={desc}>
                    {desc}
                    {index < arr.length - 1 && <br />}
                  </Fragment>
                ))}
              </p>
            )}
            {qr.link ? (
              <a
                href={qr.link}
                target="_blank"
                rel="noreferrer"
                className="bus-qr-link"
              >
                <img src={image} alt={qr.imgAlt} className="bus-qr-img" />
              </a>
            ) : (
              <img src={image} alt={qr.imgAlt} className="bus-qr-img" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Step({ label, time, note, desc }: Info) {
  return (
    <div className="timeline-step">
      <div className="step-box">
        <div className="step-info">
          <span className="step-label">{label}</span>
          <span className="step-time">{time}</span>
          {note && <span className="step-note">{note}</span>}
        </div>
        {desc && <div className="step-desc">{desc}</div>}
      </div>
    </div>
  );
}

export default BusNotice;
