import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
    const { data, loading } = useQuery(GET_REPOSITORIES, { variables: variables, fetchPolicy: 'cache-and-network'});
    return { repositories: data?.repositories, loading: loading }
};

export default useRepositories;