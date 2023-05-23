import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
    mutation LoginMutation($loginData: LoginInput) {
        login(data: $loginData) {
            accessToken
            user {
                tokenVersion
                id
                name
                email
                role {
                    id
                    name
                    label
                }
                appTheme {
                    id
                    name
                    themeJSON
                }
            }
        }
    }

`;
/* 
 {
  "loginData": {
    "name": "bob",
    "password": "bob",
    "roleId": null,
    "themeId": null
  }
 */

const LOGOUT_MUTATION = gql`
    mutation LogoutMutation {
        logout
    }
`;

const UPDATE_DISPACH_GROUPS_MUTATION = gql`
    mutation UserUpdateManyDispatchGroupsMutation($userId: ID!, $dispatchGroupsData: [DispatchGroupInput]) {
        userUpdateManyDispatchGroups(userId: $userId, data: $dispatchGroupsData) {
            userId
            agencyId
            manage
            monitor
        }
    }   
`;

/*
{
  "userId": null,
  "dispatchGroupsData": [
    {
      "agencyId": null,
      "manage": null,
      "monitor": null
    }
  ]
}
*/

export {
    LOGIN_MUTATION,
    LOGOUT_MUTATION,
    UPDATE_DISPACH_GROUPS_MUTATION,
};