import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
        repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
            edges {
                node {
                    id
                    ownerAvatarUrl
                    fullName
                    description
                    language
                    stargazersCount
                    forksCount
                    reviewCount
                    ratingAverage
                }
            }
        }
    }
`;

export const GET_REPOSITORY =  gql`
    query repository($id: ID!){
        repository(id: $id) {
            id
            ownerAvatarUrl
            fullName
            description
            language
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            url
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const GET_USER = gql`
    query {
        me {
            id
            username
            }
    }
`;