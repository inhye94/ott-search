import classNames from "classnames";
import styles from "./layout.module.css";
import { HTMLAttributes, ReactElement } from "react";

type NativeDivProps = HTMLAttributes<HTMLDivElement>;

export interface LayoutPropsType extends NativeDivProps {
  className?: string;
  children: React.ReactNode;
}

const Layout = ({ children, className, ...props }: LayoutPropsType) => {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      {children}
    </div>
  );
};

export default Layout;
