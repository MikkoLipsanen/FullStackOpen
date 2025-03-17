import { useMutation } from '@apollo/client';
import { REVIEW } from '../graphql/mutations';

const useReview = () => {
    const [mutate, result] = useMutation(REVIEW);
  
    const addReview = async ({ ownerName, repositoryName, rating, text }) => {
      const { data } = await mutate({ variables: { ownerName: ownerName, repositoryName: repositoryName, rating: rating, text: text } });
      return data;
    };
  
    return [addReview, result];
};

export default useReview;