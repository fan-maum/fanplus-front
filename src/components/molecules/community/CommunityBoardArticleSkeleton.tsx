const CommunityBoardArticleSkeleton = () => {
  return (
    <li css={{ margin: '6px 12px', padding: '3px 6px', borderBottom: '1px solid #d9d9d9' }}>
      <div css={{ display: 'flex', padding: '' }}>
        <div css={{ width: 32, height: 24, borderRadius: 12, backgroundColor: '#f2f4f5' }} />
      </div>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <div css={{ margin: '3px 0px 6px', lineHeight: '1.5' }}>
          <h4 css={{ width: 60, height: 24, borderRadius: 12, backgroundColor: '#f2f4f5' }} />
          <div css={{ marginTop: '6px', fontSize: '12px', p: { margin: '1px 0px' } }}>
            <p css={{ width: 200, height: 18, borderRadius: 9, backgroundColor: '#f2f4f5' }} />
            <p css={{ width: 100, height: 18, borderRadius: 9, backgroundColor: '#f2f4f5' }} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CommunityBoardArticleSkeleton;
