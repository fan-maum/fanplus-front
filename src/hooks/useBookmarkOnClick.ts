import { deleteBookmark, postBookmark } from '@/api/Community';
import { useMutation, useQueryClient } from 'react-query';

type BookmarkProps = {
  identity: string;
  boardIndex: string;
};

export function useBookmarkOnClick() {
  const queryClient = useQueryClient();

  const useAddBookmark = useMutation({
    mutationFn: async ({ identity, boardIndex }: BookmarkProps) =>
      await postBookmark(identity, boardIndex),
    onSuccess: () => {
      queryClient.invalidateQueries('bookmarks');
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
  });

  const useRemoveBookmark = useMutation({
    mutationFn: ({ identity, boardIndex }: BookmarkProps) => deleteBookmark(identity, boardIndex),
    onSuccess: () => {
      queryClient.invalidateQueries('bookmarks');
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
  });

  return { useAddBookmark, useRemoveBookmark };
}
