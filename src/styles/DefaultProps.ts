import { css } from '@emotion/react';
import { HTMLAttributes } from 'react';

export type DefaultProps<T = HTMLAttributes<HTMLDivElement>> = T & {
  p?: React.CSSProperties['padding'];
  px?: React.CSSProperties['padding'];
  py?: React.CSSProperties['padding'];
  pl?: React.CSSProperties['padding'];
  pr?: React.CSSProperties['padding'];
  pt?: React.CSSProperties['padding'];
  pb?: React.CSSProperties['padding'];

  m?: React.CSSProperties['margin'];
  mx?: React.CSSProperties['margin'];
  my?: React.CSSProperties['margin'];
  ml?: React.CSSProperties['margin'];
  mr?: React.CSSProperties['margin'];
  mt?: React.CSSProperties['margin'];
  mb?: React.CSSProperties['margin'];

  w?: React.CSSProperties['width'];
  miw?: React.CSSProperties['minWidth'];
  maw?: React.CSSProperties['maxWidth'];
  h?: React.CSSProperties['height'];
  mih?: React.CSSProperties['minHeight'];
  mah?: React.CSSProperties['maxHeight'];

  fz?: React.CSSProperties['fontSize'];
  fw?: React.CSSProperties['fontWeight'];

  bg?: React.CSSProperties['backgroundColor'];
};

export function getDefaultProps<T = HTMLAttributes<HTMLDivElement>>({
  p,
  px,
  py,
  pl,
  pr,
  pt,
  pb,
  m,
  mx,
  my,
  ml,
  mr,
  mt,
  mb,
  w,
  miw,
  maw,
  h,
  mih,
  mah,
  fz,
  fw,
  bg,
  ...props
}: DefaultProps<T>) {
  return css({
    padding: p,
    paddingLeft: pl || px,
    paddingRight: pr || px,
    paddingTop: pt || py,
    paddingBottom: pt || py,

    margin: m,
    marginLeft: ml || mx,
    marginRight: mr || mx,
    marginTop: mt || my,
    marginBottom: mt || my,

    width: w,
    minWidth: miw,
    maxWidth: maw,
    height: h,
    minHeight: mih,
    maxHeight: mah,

    fontSize: fz,
    fontWeight: fw,
    backgroundColor: bg,
  });
}
