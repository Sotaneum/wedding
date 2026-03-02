import "./Story.css";
import { Fragment } from "react/jsx-runtime";

interface StoryProps {
  title: string;
  description: string[];
  card?: string;
  hero: {
    names?: string[];
    relation: string;
    targetName: string;
  }[];
}

function Story({ title, description, card, hero }: StoryProps) {
  return (
    <div className="story-container">
      <h1 className="story-title">{title}</h1>
      {card && (
        <img
          src={card}
          style={{ width: "75%", maxWidth: "384px", paddingBottom: "1rem" }}
        />
      )}
      {description.map((line) => (
        <p className="story-text" key={line}>
          {line}
        </p>
      ))}
      <div className="story-parents-area">
        {hero.map(({ names = [], relation, targetName }) => (
          <div className="story-parents-row" key={targetName}>
            <div className="story-parents-names">
              {names.map((name, index) => (
                <Fragment key={name}>
                  <span>{name}</span>
                  {index < names.length - 1 && " · "}
                </Fragment>
              ))}
            </div>
            <span className="story-parents-relation">{relation}</span>
            <span className="story-target-name">{targetName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Story;
