import { colors } from '@/styles/Colors';
import { css } from '@emotion/react';

export default function MobileWriteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      css={css`
        display: none;
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        padding: 13px;
        background-color: ${colors.primary[500]};
        right: 30px;
        bottom: 60px;
        outline: none;
        border: none;
        cursor: pointer;
        @media (max-width: 768px) {
          display: block;
        }
      `}
    >
      <img
        src="/icons/icon_pen.svg"
        alt="write-button"
        css={css`
          width: 100%;
          height: 100%;
        `}
      />
    </button>
  );
}
