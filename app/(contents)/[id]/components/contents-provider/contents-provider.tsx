import styles from "./contents-provider.module.css";

const ContentsProvider = ({ providers }) => {
  if (!providers) {
    return (
      <p className={styles.empty}>아쉽지만 콘텐츠를 제공하는 곳이 없습니다.</p>
    );
  }

  return (
    <>
      {Object.keys(providers)
        .filter((key) => typeof providers[key] === "object")
        .map((type) => (
          <article className={styles.provider} key={type}>
            <h4 className={styles.title}>
              <span aria-hidden>✨</span>
              {getProviderType(type)}
            </h4>

            <ul className={styles.list}>
              {providers[type].map((provider) => (
                <li key={provider.provider_id} className={styles.item}>
                  <div className={styles.card}>
                    <img
                      src={
                        process.env.NEXT_PUBLIC_TMDB_IMAGE_URL +
                        provider.logo_path
                      }
                      alt={provider.provider_name}
                    />
                    <strong>{provider.provider_name}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
    </>
  );
};

const getProviderType = (type: string) => {
  const object = {
    flatrate: "OTT",
    buy: "구매처",
    rent: "대여",
  };

  return object[type];
};

export default ContentsProvider;
