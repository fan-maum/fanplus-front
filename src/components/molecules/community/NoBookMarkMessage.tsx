import { colors } from '@/styles/CommunityColors';
import { bookmarkTexts } from '@/texts/bookmarkTexts';
import { UrlLangType } from '@/types/common';
import styled from '@emotion/styled';

const NoBookmarkMessage = ({
  urlLang,
  variant = 'secondary',
}: {
  urlLang: UrlLangType;
  variant?: 'primary' | 'secondary';
}) => {
  const texts = bookmarkTexts[urlLang];
  return (
    <div
      css={{
        height: '80px',
        fontWeight: 400,
        lineHeight: '18px',
        padding: '12px',
        textAlign: 'center',
        ...TYPE_VARIANTS[variant],
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: texts.NoBookmarkMessage }}
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '100%',
          padding: '0 10px ',
          wordBreak: 'keep-all',
          fontSize: 'inherit',
          img: {
            width: '16px',
            height: '16px',
            margin: '0 2px 3px 0',
            verticalAlign: 'middle',
          },
        }}
      />
    </div>
  );
};

export default NoBookmarkMessage;

const TYPE_VARIANTS = {
  primary: {
    color: colors.gray[800],
    background: '#FFF',
    fontSize: '16px',
    lineHeight: 1.8,
  },
  secondary: {
    color: colors.gray[1000],
    background: colors.gray[20],
    fontSize: '14px',
  },
};
