import { useState } from 'react';
import { BoardCategoryItemType } from '@/types/community';
import styled from '@emotion/styled';

type CustomTabBarProps = {
  tabs: BoardCategoryItemType[];
  searchTabState: [number, React.Dispatch<React.SetStateAction<any>>];
};

export default function CustomScrollTabBar({
  tabs,
  searchTabState: [activeTab, setActiveTab],
}: CustomTabBarProps) {
  return (
    <>
      <TabContainer>
        {tabs.map((tab, index) => (
          <TabButton key={index} active={activeTab === index} onClick={() => setActiveTab(index)}>
            <Title active={activeTab === index}>{tab.CATEGORY_NAME}</Title>
          </TabButton>
        ))}
      </TabContainer>
      <>{tabs[activeTab].CATEGORY_NAME}</>
    </>
  );
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  flex-shrink: 0;
  width: auto;
  height: 100%;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 16px 18px;
  cursor: pointer;
  transition: 0.3s;
  background-color: #fff;
`;

const Title = styled.span<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  text-transform: uppercase;
  padding: 0 4px;
  font-size: 18px;
  line-height: 24px;
  transition: 0.3s;
  font-weight: ${(props) => (props.active ? '600' : '400')};
  color: ${(props) => (props.active ? '#FF5656' : '#666')};
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${(props) => (props.active ? '#FF5656' : 'transparent')};
`;
