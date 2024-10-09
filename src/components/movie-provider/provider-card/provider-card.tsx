import styles from "./provider-card.module.css";

interface ProviderCardProps {
  logo_path: string;
  provider_name: string;
}

const LOGO_PREFIX = "https://image.tmdb.org/t/p/w300";

const ProviderCard = ({ logo_path, provider_name }: ProviderCardProps) => {
  return (
    <article className={styles.card}>
      <img
        src={
          logo_path.includes(LOGO_PREFIX) ? logo_path : LOGO_PREFIX + logo_path
        }
        alt={provider_name}
      />
      <p>{provider_name}</p>
    </article>
  );
};

export default ProviderCard;
