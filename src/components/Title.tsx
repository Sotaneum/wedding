import { Fragment } from "react/jsx-runtime";
import "./Title.css";

interface TitleProps {
  weddingDate: Date;
  hero: {
    targetName: string;
    names?: string[];
    relation: string;
  }[];
  info: string;
  location: string;
  showParent?: boolean;
}

function Title({
  weddingDate,
  hero,
  info,
  location,
  showParent = false,
}: TitleProps) {
  return (
    <div className="title-overlay">
      <h1 className="title-date">
        {weddingDate.toLocaleDateString("ko-KR", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </h1>
      <div className="title-name-group">
        {showParent ? (
          <div className="title-parents-area">
            {hero.map(({ names = [], relation, targetName }) => (
              <div className="title-parents-row" key={targetName}>
                <div className="title-names">
                  {names.map((name, index) => (
                    <Fragment key={name}>
                      <span>{name}</span>
                      {index < names.length - 1 && " · "}
                    </Fragment>
                  ))}
                </div>
                <span className="title-parents-relation">{relation}</span>
                <span className="title-names">{targetName}</span>
              </div>
            ))}
          </div>
        ) : (
          hero.map(({ targetName }, index) => (
            <Fragment key={targetName}>
              <h1>{targetName}</h1>
              {index < hero.length - 1 && (
                <span className="title-divider">|</span>
              )}
            </Fragment>
          ))
        )}
      </div>
      <p className="title-info">{info}</p>
      <p className="title-location">{location}</p>
    </div>
  );
}

export default Title;
