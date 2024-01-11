import styled from '@emotion/styled';
import BoardMobileTabMenus from './BoardMobileTabMenus';

const BoardMobileTab = () => {
  return (
    <>
      <BoardMobileTabWrapper>
        <div className="boardMobileTabAllMenu-wrapper">
          <BoardMobileTabMenus />
        </div>
      </BoardMobileTabWrapper>
    </>
  );
};

export default BoardMobileTab;

const BoardMobileTabWrapper: any = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: none;
    /* display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start; */

    .boardMobileTabAllMenu-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .menu-wrapper[data-active='true'] {
    border-bottom: '2px solid var(--color-primary)';
  }

  .menu-wrapper {
    font-size: 14px;
    color: #918f8f;
    font-weight: 500;
    padding: 10px 0;
    cursor: pointer;

    span[data-active='true'] {
      color: 'var(--color-primary)';
      font-size: 14px;
      font-weight: bold;
    }
  }
`;
