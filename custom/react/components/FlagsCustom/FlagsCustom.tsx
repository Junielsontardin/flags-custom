import React, { useEffect, useState } from "react";
import { useProduct } from "vtex.product-context";
import { canUseDOM } from "vtex.render-runtime";
import styles from "./styles.css";
import { useNewProduct } from "./hook/useNewProduct";

interface FlagsToShow {
    flags: CollectionColor[]
}

interface CollectionColor {
    collectionId: string
    color: string
}

interface FlagCollection {
    id: string
    name: string
    color: string
}

const FlagsCustom = ({ flags }: FlagsToShow) => {
    const productContext = useProduct();
    
    if (!canUseDOM) {
        return <> </>;
    };

    if (!productContext) {
        return <></>;
    };

    const [collectionsFlag, setCollectionsFlag] = useState<FlagCollection[]>();
    const [discountPercentage, setDiscountPercentage] = useState(0);
    
    const { isNewProduct, preSale } = useNewProduct();
    
    const collections = productContext.product?.clusterHighlights;
    const listPrice = productContext.product?.priceRange.listPrice.lowPrice;
    const sellingPrice = productContext.product?.priceRange?.sellingPrice.lowPrice;

    const calculateDiscountPercentage = (listPrice: number, sellingPrice: number) => {
        let discountPercentage = (100 * (listPrice - sellingPrice)) / listPrice;
        setDiscountPercentage(discountPercentage);
    }

    const getCollectionsToShow = () => {
        let collectionsToShow: FlagCollection[] = [];

        collections?.forEach((collection) => {
            flags.forEach((flag) => {
                if(flag.collectionId === collection.id) {
                    const collectionColor: FlagCollection = {
                        id: collection.id,
                        name: collection.name,
                        color: flag.color
                    }
                    collectionsToShow.push(collectionColor);
                }
            })
        });

        setCollectionsFlag(collectionsToShow);
    };

    useEffect(() => {
        if(listPrice && sellingPrice) {
            calculateDiscountPercentage(listPrice, sellingPrice);
        }
        getCollectionsToShow();
    },[]);

    return (
        <div className={styles.containerFlags}>
            {discountPercentage !== 0 &&
                <div className={styles.flagDiscount}>
                    <span className={styles.titleFlag}>
                        {Math.round(discountPercentage)}%OFF
                    </span>
                </div>
            }
            {collectionsFlag && collectionsFlag.map((item) => {
                return (
                    <div 
                        key={item.id} 
                        className={styles.flagCollection}
                        style={{
                            background: item.color
                        }}
                    >
                        <span className={styles.titleFlag}>
                            {item.name}
                        </span>
                    </div>
                );
            }
            )}
            {isNewProduct &&
                <div className={styles.flagNewProduct}>
                    <span className={styles.titleFlag}>
                        novo
                    </span>
                </div>
            }
            {preSale &&
                <div className={styles.flagPreSale}>
                    <span className={styles.titleFlag}>
                        Pré-venda
                    </span>
                </div>
            }
        </div>
    );

};

export default FlagsCustom;

FlagsCustom.schema = {
    title: "Flags"
}