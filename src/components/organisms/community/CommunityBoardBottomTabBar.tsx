import type { ReactNode } from 'react';

type BottomTabBarItemPropType = {
  icon: ReactNode;
  title: string;
  onClick: () => void;
};
type BottomTabBarPropType = BottomTabBarItemPropType[];

const CommunityBoardBottomTabBar = ({ items }: { items: BottomTabBarPropType }) => {
  return (
    <>
      <div css={{ height: '60px' }}></div>
      <div
        css={{
          width: '100%',
          position: 'fixed',
          bottom: '0px',
          zIndex: 200,
          backgroundColor: 'white',
          fontSize: '14px',
          borderTop: '1px solid #d9d9d9',
        }}
      >
        <div
          css={{
            width: '100%',
            maxWidth: '768px',
            margin: '0px auto',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            svg: { width: '30px', height: '30px', margin: '2px' },
          }}
        >
          {items.map((item, idx) => {
            return (
              <BottomTabBarItem
                icon={item.icon}
                title={item.title}
                onClick={item.onClick}
                key={idx}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommunityBoardBottomTabBar;

const BottomTabBarItem = ({ icon, title, onClick }: BottomTabBarItemPropType) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: '1 1 30%',
        whiteSpace: 'nowrap',
        margin: '3px 0px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {icon}
      {title}
    </div>
  );
};
