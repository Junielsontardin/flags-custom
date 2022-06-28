import React, { useState } from "react";
import styles from "./styles.css";
import ArrowRight from "../Svgs/ArrowRight";
import MenuHam from "../Svgs/MenuHam";
import CloseIcon from "../Svgs/CloseIcon";

interface Categorias {
    categorias: Categoria[],
    children: React.ReactNode[]
}

interface Categoria {
    nome: string,
    subCategorias: subCategoria[],
    imagem: string,
    href: string
}

interface subCategoria {
    nome: string,
    href: string,
}

const CustomMenu = ({ categorias, children }: Categorias) => {

    const [categoriaHover, setCategoriaHover] = useState("");
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [arrayCategorias, setArrayCategorias] = useState<string[]>([]);

    const showSubCategorias = (title: string) => {
        setArrayCategorias([...arrayCategorias, title]);
    };

    const hideSubCategorias = (title: string) => {
        const array = arrayCategorias.filter((item) => item !== title);
        setArrayCategorias(array);
    };

    // console.log(categorias);
    return (
        <div className={styles.containerMenu}>
            <div className={styles.menuHam} onClick={() => setShowMenuMobile(true)}>
                <MenuHam />
            </div>
            <div className={`${styles.width} ${showMenuMobile && styles.backgroundMenuOpacity}`}>
                <div className={`${styles.subContainerMenu} ${showMenuMobile && styles.showMenu}`}>
                    <div className={styles.containerClose}>
                        <div className={styles.clickClose} onClick={() => setShowMenuMobile(false)}>
                            <CloseIcon />
                        </div>
                    </div>
                    {window.innerWidth <= 1025 ? <div>
                        {children}
                        <div className={styles.containerDivisao}>
                            <div className={styles.divisaoMenu}>
                            </div>
                        </div>
                    </div> :
                        <></>}
                    <ul className={styles.containerCategorias}>
                        {categorias.map((categoria, index) =>
                            <li key={index} className={styles.categoria} onMouseEnter={() => setCategoriaHover(categoria.nome)} onMouseLeave={() => setCategoriaHover("")}>
                                <div className={`${styles.titleCategorias} ${arrayCategorias.includes(categoria.nome) && styles.colorWhite}`}>
                                    <a href={categoria.href} className={styles.linkCategoria}>{categoria.nome}</a>
                                    {
                                        arrayCategorias.includes(categoria.nome) ?
                                            <span onClick={() => hideSubCategorias(categoria.nome)}>-</span>
                                            : <span onClick={() => showSubCategorias(categoria.nome)}>+</span>
                                    }
                                </div>
                                {((window.innerWidth > 1025 && categoriaHover === categoria.nome) || arrayCategorias.includes(categoria.nome)) &&
                                    <div className={styles.subMenu}>
                                        <div className={styles.containerSubCategorias}>
                                            <ul className={styles.subCategorias}>
                                                {categoria.subCategorias && categoria.subCategorias.map((subCategoria, index) =>
                                                    <li key={index} className={styles.linkSubCategorias}>
                                                        <a href={subCategoria.href}>{subCategoria.nome}</a>
                                                    </li>
                                                )}
                                            </ul>
                                            <div className={styles.imgSubCategoria}>
                                                <img src={categoria.imagem} />
                                            </div>
                                        </div>
                                        <div className={styles.containerVerTodos}>
                                            <div className={styles.divVerTodos}>
                                                <a href={categoria.href} className={styles.spanVerTodos}>Ver todos</a>
                                                <ArrowRight />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export { CustomMenu };

CustomMenu.schema = {
    title: "Custom Menu",
};
