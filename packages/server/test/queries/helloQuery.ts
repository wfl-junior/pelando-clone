import { gql } from "apollo-server-express";

export const helloQuery = gql`
  query {
    hello
  }
`;
