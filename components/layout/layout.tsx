import classNames from "classnames";
import styles from "./layout.module.css";
import { Attributes, PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      {children}
    </div>
  );
};

export default Layout;
