import styles from "./flip-card.module.css";

const FlipCard = ({ path, title, overview }) => {
  return (
    <div className={styles.card}>
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
