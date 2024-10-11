import classNames from "classnames";
import styles from "./tag.module.css";

interface TagPropsType {
  color?: "red" | "gray";
  tag?: "link";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

const Tag = ({ children, color, tag, href, className }: TagPropsType) => {
  if (tag === "link") {
    return (
      <a
        className={classNames(styles.tag, styles[color], className)}
        href={href}
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <strong className={classNames(styles.tag, styles[color], className)}>
      {children}
    </strong>
  );
};

export default Tag;
