import { Interpolation } from '@emotion/react';
import { Theme } from '../../../public/tinymce/tinymce';
import { colors } from '@/styles/CommunityColors';

export default function IconBookmark({
  iconCss,
  width = '18',
  height = '18',
  isBookmarked,
  fill = colors.gray[200],
}: {
  iconCss?: Interpolation<Theme>;
  width?: string;
  height?: string;
  isBookmarked?: boolean;
  fill?: string;
}) {
  return (
    <span
      css={{
        height: `${height}px`,
      }}
    >
      <svg
        css={[{ cursor: 'pointer' }, iconCss]}
        width={width}
        height={height}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.38137 2.40267C8.67928 1.96799 9.32078 1.96799 9.61868 2.40267L11.4943 5.13941C11.5918 5.28171 11.7354 5.38604 11.9009 5.43481L15.0833 6.37292C15.5887 6.52192 15.787 7.13202 15.4656 7.54967L13.4424 10.1792C13.3372 10.3159 13.2824 10.4847 13.2871 10.6572L13.3783 13.9737C13.3928 14.5004 12.8738 14.8775 12.3773 14.7009L9.25131 13.5893C9.08878 13.5315 8.91128 13.5315 8.74874 13.5893L5.62273 14.7009C5.12622 14.8775 4.60724 14.5004 4.62173 13.9737L4.71294 10.6572C4.71768 10.4847 4.66283 10.3159 4.55764 10.1792L2.53444 7.54967C2.21309 7.13203 2.41133 6.52192 2.91679 6.37292L6.09918 5.43481C6.26465 5.38604 6.40824 5.28171 6.50577 5.13941L8.38137 2.40267Z"
          fill={isBookmarked ? '#FCDA57' : colors.gray[200]}
        />
      </svg>
    </span>
  );
}
