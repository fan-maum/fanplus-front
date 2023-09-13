type PostCommentCountProps = {
  count: string | number;
};

export default function PostCommentCount({ count }: PostCommentCountProps) {
  return (
    <span
      css={{
        color: '#000',
        fontSize: 26,
        fontWeight: 600,
      }}
    >
      최신 댓글 {count}개
    </span>
  );
}
