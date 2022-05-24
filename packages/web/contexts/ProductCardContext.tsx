import { Product } from "@/@types/api";
import React, { createContext, useContext } from "react";

interface IProductCardContext {
  product: Product;
  highlight?: boolean;
}

const ProductCardContext = createContext({} as IProductCardContext);

export const useProductCardContext = () => useContext(ProductCardContext);

interface ProductCardContextProviderProps extends IProductCardContext {
  children?: React.ReactNode;
}

export const ProductCardContextProvider: React.FC<
  ProductCardContextProviderProps
> = ({ children, ...props }) => (
  <ProductCardContext.Provider value={props}>
    {children}
  </ProductCardContext.Provider>
);
