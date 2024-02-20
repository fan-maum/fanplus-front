import { colors } from '@/styles/Colors';
import { css } from '@emotion/react';

export default function WriteButton({
  writeButtonText,
  onClick,
}: {
  writeButtonText: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      css={css`
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 6px 8px;
        font-size: 14px;
        font-weight: 600;
        outline: none;
        border: none;
        color: #fff;
        background-color: ${colors.primary[500]};
        border-radius: 6px;
        cursor: pointer;
      `}
    >
      <img
        src="/icons/icon_pen.svg"
        alt="write-button"
        css={css`
          width: 16px;
          height: 16px;
        `}
      />
      {writeButtonText}
    </button>
  );
}
