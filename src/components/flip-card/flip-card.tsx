import classNames from "classnames";
import styles from "./flip-card.module.css";

const FlipCard = ({
  path,
  title,
  overview,
  variant,
  round,
}: {
  path: string;
  title: string;
  overview: string;
  variant?: "square" | "normal";
  round?: boolean;
}) => {
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
