import { colors } from '@/styles/CommunityColors';
import styled from '@emotion/styled';

interface BoardDomainItemProps {
  domainParam: string;
  active: boolean;
  onClick: () => void;
}

const BoardMobileDomainItem = ({ domainParam, active, onClick }: BoardDomainItemProps) => {
  return (
    <BoardDomainButton onClick={onClick} data-active={active}>
      {domainParam}
    </BoardDomainButton>
  );
};

export default BoardMobileDomainItem;

const BoardDomainButton = styled.button`
  position: relative;
  border: none;
  background-color: #fff;
  color: ${colors.gray[600]};
  padding: 6px 0;
  margin: 0 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  cursor: pointer;
  &[data-active='true'] {
    color: ${colors.primary[500]};
    &::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 50%;
      right: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 3px;
      background-color: ${colors.primary[500]};
    }
  }
`;
