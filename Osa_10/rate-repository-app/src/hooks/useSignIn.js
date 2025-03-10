import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE);
    const authStorage = useAuthStorage();
    const client = useApolloClient();
  
    const signIn = async ({ username, password }) => {
      const { data } = await mutate({ variables: { username: username, password: password } });
      const accessToken = data.authenticate.accessToken
      await authStorage.setAccessToken(accessToken);
      client.resetStore();
      return accessToken;
    };
  
    return [signIn, result];
};

export default useSignIn;