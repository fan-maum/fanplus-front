import { deleteBlockUser } from '@/api/Community';
import ToastModal from '@/components/toast/ToastModal';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useMutation, useQueryClient } from 'react-query';
import { useUrlLanguage } from './useLanguage';

type UnblockUserProps = {
  user_id: string;
  user_idx: string;
  targetUserIdx: number;
};

export function useUnblockUserOnClick() {
  const queryClient = useQueryClient();
  const urlLang = useUrlLanguage();
  const boardTexts = communityBoardTexts[urlLang];

  const useUnblockUser = useMutation({
    mutationFn: async ({ user_id, user_idx, targetUserIdx }: UnblockUserProps) =>
      await deleteBlockUser(user_id, user_idx, targetUserIdx),
    onSuccess: async (data) => {
      data.status === 200 &&
        (ToastModal.alert(boardTexts.blockUser.unBlocked),
        queryClient.invalidateQueries('blockUsers'));
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    },
  });

  return { useUnblockUser };
}
