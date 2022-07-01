import { useState, useEffect } from 'react';
import { useProduct } from "vtex.product-context";

export const useNewProduct = () => {
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [preSale, setPreSale] = useState(false);
    const [productApiData, setProductApiData] = useState<any[]>([]);
    const productContext = useProduct();
    const productId = productContext?.product?.productId;

    useEffect(() => {
        const apiUrl = '/api/catalog_system/pub/products/search?fq=productId:' + productId;
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data: any) => setProductApiData(data));
    }, []);

    useEffect(() => {
        const dateToCompare = productApiData[0]?.releaseDate.split('T')[0];
        const skus = productApiData[0]?.items;

        itsOnPreSale(skus);
        isMoreThan30DaysAgo(dateToCompare);
        
    }, [productApiData]);
    
    const isMoreThan30DaysAgo = (date: any) => {
      if (!date) {
        return;
      }
      const releaseDate = new Date(date).getTime();

      //                   days  hours min  sec  ms
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      const timestampThirtyDaysAgo = new Date().getTime() - thirtyDaysInMs;
      
      if (timestampThirtyDaysAgo > releaseDate) {
        setIsNewProduct(false);
      } else {
        setIsNewProduct(true);
      }
    }

    const itsOnPreSale = (skus: any) => {
      const today = new Date().getTime();

      if(skus) {
        skus.forEach((sku: any) => {
          if(sku.estimatedDateArrival !== null) {
            let dateFormatted = sku.estimatedDateArrival.split('T')[0];
            let dateToCompare = new Date(dateFormatted).getTime();
            
            if(dateToCompare > today) {
              setPreSale(true)
            }
          }
        })
      }
    }

    return {
        isNewProduct,
        preSale
    }
}
