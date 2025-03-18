import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDelete = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);
  
    const deleteReview = async ({ id }) => {
        console.log('id: ' + id)
        const { data } = await mutate({ variables: { id } });
        return data;
    };
  
    return [deleteReview, result];
};

export default useDelete;