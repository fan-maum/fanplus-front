import { deleteBookmark, postBookmark } from '@/api/Community';
import { useMutation, useQueryClient } from 'react-query';

type BookmarkProps = {
  identity: string;
  menuId: number;
};

export function useBookmarkOnClick() {
  const queryClient = useQueryClient();

  const useAddBookmark = useMutation({
    mutationFn: async ({ identity, menuId }: BookmarkProps) => await postBookmark(identity, menuId),
    onSuccess: () => {
      queryClient.invalidateQueries('bookmarks');
      queryClient.invalidateQueries('sideMenu');
      queryClient.invalidateQueries('communityBoardData');
      queryClient.invalidateQueries('communityTypeBoardData');
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
  });

  const useRemoveBookmark = useMutation({
    mutationFn: async ({ identity, menuId }: BookmarkProps) =>
      await deleteBookmark(identity, menuId),
    onSuccess: () => {
      queryClient.invalidateQueries('bookmarks');
      queryClient.invalidateQueries('sideMenu');
      queryClient.invalidateQueries('communityBoardData');
      queryClient.invalidateQueries('communityTypeBoardData');
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
  });

  return { useAddBookmark, useRemoveBookmark };
}
