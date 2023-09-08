type PostCommentCountProps = {
  count: number;
};

export default function PostCommentCount({ count }: PostCommentCountProps) {
  return <span>최신 댓글 {count}개</span>;
}
