import { FooterTextType } from '@/types/textTypes';
import Image from 'next/image';

const Footer = ({ texts }: { texts: FooterTextType }) => {
  return (
    <div
      css={{ width: '100%', minHeight: '100px', padding: '35px 10px', backgroundColor: '#fafbfd' }}
    >
      <div
        css={{
          width: '100%',
          maxWidth: '1170px',
          margin: '0px auto',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          css={{
            maxWidth: '840px',
            flexShrink: '1',
            '> p': { fontSize: '14px', fontWeight: '400', color: 'rgb(153,153,153)' },
          }}
        >
          <h5 css={{ fontSize: '14px', fontWeight: '400', paddingBottom: '4px' }}>
            {texts.customerService}
          </h5>
          <div css={{ marginBottom: '26px' }}>
            <a
              href="mailto:cs@fanmaum.com"
              css={{
                display: 'flex',
                width: 'fit-content',
                ':hover': {
                  button: {
                    border: '1px solid #ff5656',
                    backgroundColor: '#ff5656',
                    color: 'white',
                  },
                },
              }}
            >
              <h3 css={{ fontSize: '20px', fontWeight: '800', marginRight: '5px' }}>
                cs@fanmaum.com
              </h3>
              <button
                css={{
                  height: '24px',
                  cursor: 'pointer',
                  padding: '0px 8px',
                  fontSize: '10px',
                  fontWeight: '400',
                  backgroundColor: '#fafbfd',
                  border: '1px solid rgb(119,119,119)',
                  borderRadius: '3px',
                  color: 'rgb(119,119,119)',
                  transition: '0.3s',
                }}
              >
                {texts.emailButton}
              </button>
            </a>
          </div>
          <div
            css={{
              display: 'flex',
              paddingBottom: '9px',
              color: 'rgb(37,37,37)',
              fontSize: '14px',
              fontWeight: '700',
              'a, p': { marginRight: '5px', paddingRight: '5px' },
            }}
          >
            <a href={texts.termsOfServiceLink} target="_blank">
              {texts.termsOfService}
            </a>
            <p>|</p>
            <a href={texts.privacyPolicyLink} target="_blank">
              {texts.privacyPolicy}
            </a>
          </div>
          <p>{texts.introduction}</p>
          <p>{texts.copyright}</p>
        </div>
        <div
          css={{
            width: '142px',
            paddingTop: '24px',
            '@media(max-width: 768px)': { display: 'none' },
          }}
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.photocard.allstar"
            target="_blank"
          >
            <Image
              src="/images/google_play_badge.png"
              alt="google-play-link"
              width={142}
              height={48}
            />
          </a>
          <a
            href="https://apps.apple.com/kr/app/%ED%8C%AC%ED%94%8C%EB%9F%AC%EC%8A%A4/id1448805815"
            target="_blank"
          >
            <Image src="/images/app_store_badge.png" alt="app-store-link" width={142} height={48} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
