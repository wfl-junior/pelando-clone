import { gql } from "@apollo/client";
import { categoryFieldsFragment } from "./categoryFieldsFragment";
import { storeFieldsFragment } from "./storeFieldsFragment";

export const productFieldsFragment = gql`
  fragment ProductFieldsFragment on Product {
    id
    createdAt
    body
    couponCode
    price
    sourceUrl
    title
    image
    temperature
    store {
      ...StoreFieldsFragment
    }
    category {
      ...CategoryFieldsFragment
    }
  }

  ${storeFieldsFragment}
  ${categoryFieldsFragment}
`;
