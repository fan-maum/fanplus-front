import { colors } from '@/styles/CommunityColors';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface BoardDomainItemProps {
  domainParam: string;
  domain: string;
  onClick: () => void;
}

const BoardDomainItem = ({ domainParam, domain, onClick }: BoardDomainItemProps) => {
  const router = useRouter();

  return (
    <BoardDomainButton onClick={onClick} data-active={router.query.view === domain}>
      {domainParam}
    </BoardDomainButton>
  );
};

export default BoardDomainItem;

const BoardDomainButton = styled.button`
  border: none;
  border-radius: 18px;
  border: 1px solid ${colors.gray[200]};
  background-color: #fff;
  color: ${colors.gray[600]};
  padding: 6px 8px;
  margin-right: 6px;
  font-size: 14px;
  line-height: 14px;
  cursor: pointer;
  &[data-active='true'] {
    background-color: ${colors.primary[500]};
    color: #fff;
    border: 1px solid ${colors.primary[500]};
  }
`;
