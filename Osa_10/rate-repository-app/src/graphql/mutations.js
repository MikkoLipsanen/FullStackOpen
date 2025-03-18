import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
    mutation authenticate($username: String!, $password: String!){
        authenticate(
            credentials: { 
                username: $username, 
                password: $password 
            }
        ) {
        accessToken
        }
}
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!){
        createUser(
            user: { 
                username: $username, 
                password: $password 
            }
        ) {
        username
        }
    }
`;

export const REVIEW = gql`
    mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String){
        createReview (
            review: {
                repositoryName: $repositoryName,
                ownerName: $ownerName,
                rating: $rating,
                text: $text
            }
        ) {
            id
            text
            rating
            createdAt
            repositoryId
            user {
                id
                username
            }
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!){
        deleteReview (id: $id)
    }
`;