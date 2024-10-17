import classNames from "classnames";
import styles from "./flip-card.module.css";

export interface FlipCardPropsType {
  path: string;
  title: string;
  overview: string;
  variant?: "square" | "normal";
  round?: boolean;
}

const FlipCard = ({
  path,
  title,
  overview,
  variant,
  round,
}: FlipCardPropsType) => {
  return (
    <div
      className={classNames(
        styles.card,
        variant && styles[variant],
        round && styles.round
      )}
    >
      <div className={styles["card-inner"]}>
        <div className={styles.front}>
          <img src={path} alt={title} />
        </div>

        <div className={styles.back}>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
