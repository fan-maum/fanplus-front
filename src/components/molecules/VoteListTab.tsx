import { getLanguage, getRouterLanguage } from '@/hooks/useLanguage';
import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
export interface VoteListTabProps extends DefaultProps {
  tabs: string[] | { value: string; label: string | undefined }[];
  itemsPerPage: number;
  state: [string, React.Dispatch<React.SetStateAction<any>>];
}

const VoteTab = ({
  tabs,
  itemsPerPage,
  state: [tabState = '', setTabState],
  ...props
}: VoteListTabProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const routerLang = getRouterLanguage();

  const onClickVoteTab = (tabValue: string) => {
    setTabState(tabValue);
    console.log(router.query.lang);
    router.push({
      pathname: pathname,
      query: {
        vote_type: tabValue,
        page: 1,
        per_page: itemsPerPage,
        lang: router.query.lang || routerLang,
      },
    });
  };

  return (
    <>
      <div
        css={[
          {
            background: '#fff',
            position: 'sticky',
            top: '85px',
            zIndex: 100,
            padding: '10px 0',
            margin: '40px auto',
            display: 'flex',
            justifyContent: 'center',
            '@media(max-width:991px)': { top: '70px' },
          },
        ]}
      >
        <div
          css={[
            {
              width: '100%',
              display: 'flex',
              maxWidth: 662,
              height: 68,
              borderRadius: 75,
              background: '#F1F1F1',
              gap: 10,
              padding: '5px',
            },
            getDefaultProps(props),
          ]}
        >
          {tabs.map((item, index) => {
            const isObj = typeof item === 'object';
            const tabContent = isObj ? item.label : item;
            const tabValue = isObj ? item.value : item;
            const active = tabValue === tabState;
            return (
              <div
                key={`custom-tabs-${index}-${tabValue}`}
                css={{
                  position: 'relative',
                  height: '100%',
                  boxSizing: 'border-box',
                  flex: 1,
                  zIndex: 2,
                }}
              >
                <label
                  css={{
                    height: '100%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    userSelect: 'none',
                    backgroundColor: active ? '#FF5656' : '#F1F1F1',
                    color: active ? '#fff' : '#666',
                    fontSize: 20,
                    fontWeight: 600,
                    borderRadius: 75,
                  }}
                  onClick={() => onClickVoteTab(tabValue)}
                >
                  {tabContent}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default VoteTab;
