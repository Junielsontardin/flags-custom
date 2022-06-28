import React from "react";
import { Link } from "vtex.render-runtime";
import { canUseDOM } from "vtex.render-runtime";
import { InstitucionalNav, InstuticionalLink } from "../../typings/global";
import styles from "./InstitucionalNav.css";

const InstitucionalNav: StorefrontFunctionComponent<InstitucionalNav> = (
    props: InstitucionalNav
) => {
    const links = props.links;
    const pathName = canUseDOM ? window.location?.pathname : "";

    return (
        <div className={styles.navContainer}>
            {canUseDOM &&
                links.map((link: InstuticionalLink, idx: number) => (
                    <Link
                        key={idx}
                        to={link.href}
                        className={
                            link.href === pathName
                                ? `${styles["link--ativo"]} ${styles.link}`
                                : `${styles.link}`
                        }
                    >
                        {link.label}
                    </Link>
                ))}
        </div>
    );
};

export default InstitucionalNav;
