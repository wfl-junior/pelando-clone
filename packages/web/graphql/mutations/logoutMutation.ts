import { gql } from "@apollo/client";

export const logoutMutation = gql`
  mutation LogoutMutation {
    logout {
      ok
    }
  }
`;
