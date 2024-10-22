import {
  ProviderInfoType,
  ProviderItemType,
} from "../../../../../src/model/contents";
import { fullImagePath } from "../../../../../src/utils/format";
import styles from "./contents-provider.module.css";

export interface ContentsProviderPropsType {
  providers?: ProviderItemType;
}

const ContentsProvider = ({ providers }: ContentsProviderPropsType) => {
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
              {providers[type].map((provider: ProviderInfoType) => (
                <li key={provider.provider_id} className={styles.item}>
                  <div className={styles.card}>
                    <img
                      src={fullImagePath(provider.logo_path)}
                      alt={`${provider.provider_name}의 로고`}
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
