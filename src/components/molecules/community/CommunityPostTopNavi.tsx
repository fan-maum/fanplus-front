import { useRouter } from 'next/router';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import IconVerticalMore from '@/components/atoms/IconVerticalMore';
import IconFilter from '@/components/atoms/IconFilter';
import { Dispatch, SetStateAction } from 'react';
import { Popover } from '@mantine/core';
import { CommunityPostTextType } from '@/types/textTypes';
import { useMutation } from 'react-query';

export type CommunityPostTopNaviProps = {
  texts: CommunityPostTextType;
  deletePostOnClick: () => void;
};

const CommunityPostTopNavi = ({ texts, deletePostOnClick }: CommunityPostTopNaviProps) => {
  const router = useRouter();
  // const likesMutate = useMutation();

  //   const { mutate, isLoading, isError, error, isSuccess } = useMutation(newTodo => {
  //     return axios.post<TodoType>('/todos', newTodo);
  //   });

  //   const mutation = useMutation({
  //     mutationFn: (newTodo) => {
  //       return axios.post('/todos', newTodo)
  //     },
  //   })

  //   const { mutate } = useMutation((post) => createPost(post), {
  //     onSuccess: () => { 	// mutate가 정상적으로 실행되면, 함수를 실행합니다.
  // 		console.log("createPost success");
  //     },
  //     onError: () => { 	// mutate가 실패하면, 함수를 실행합니다.
  //     	console.log("createPost error");
  //     }
  // });

  const handleClickMore = () => {
    // eslint-disable-next-line no-console
    // console.log('popup open');
    // const res = await axios.post(`http://localhost:302/api/community/${comment.COMMENT_IDX}`, {
    //   identity: identity,
    // });
    // console.log(res);
  };
  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '10px',
        }}
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <IconArrowLeft
            iconCss={{ margin: '3px', width: '30px', height: '30px', cursor: 'pointer' }}
            onClickBack={() => router.back()}
          />
          <h2>{texts.post}</h2>
        </div>
        <div
          css={{
            cursor: 'pointer',
            width: 40,
            heigh: 40,
          }}
        >
          <Popover
            width={60}
            position="bottom-end"
            shadow="none"
            styles={() => ({
              dropdown: {
                width: 'auto !important',
                padding: 0,
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
              },
            })}
          >
            <Popover.Target>
              <button
                css={{
                  display: 'flex',
                  outline: 'none',
                  border: 'none',
                  background: 'none',
                }}
              >
                <IconVerticalMore />
              </button>
            </Popover.Target>
            <Popover.Dropdown>
              <ul
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: '60px',
                  '& > li': {
                    padding: '8px 16px',
                    color: '#101010',
                    fontSize: 14,
                    fontWeight: 400,
                  },
                }}
              >
                <li
                  onClick={() => {
                    // eslint-disable-next-line no-console
                    console.log('report');
                  }}
                >
                  {texts.report}
                </li>
                <li
                  onClick={() => {
                    // eslint-disable-next-line no-console
                    console.log('edit');
                  }}
                  css={{ borderBottom: '1px solid #d9d9d9' }}
                >
                  {texts.edit}
                </li>
                <li onClick={deletePostOnClick}>
                  {texts.delete}
                </li>
              </ul>
            </Popover.Dropdown>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default CommunityPostTopNavi;
