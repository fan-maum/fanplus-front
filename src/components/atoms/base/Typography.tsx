import { ColorProps, colorParser } from '@/styles/Colors';
import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { css } from '@emotion/react';

export type TypographyCategory = 'headline' | 'subtitle' | 'body' | 'button' | 'caption';

export interface TypographyProps extends DefaultProps {
  category?: TypographyCategory;
  variant?: number;
  text?: string;
  children?: React.ReactNode;

  /** Key of theme.colors or any valid CSS color */
  color?: ColorProps;
  c?: React.CSSProperties['color'];

  /** Sets text-transform css property */
  transform?: React.CSSProperties['textTransform'];

  /** Sets text-align css property */
  align?: React.CSSProperties['textAlign'];

  /** CSS -webkit-line-clamp property */
  lineClamp?: number;

  /** Underline the text */
  underline?: boolean;

  /** Add strikethrough styles */
  strikethrough?: boolean;

  /** Adds font-style: italic style */
  italic?: boolean;

  /** Inherit font properties from parent element */
  inherit?: boolean;

  /** Shorthand for component="span" */
  span?: boolean;
}

type FontSettingsType = {
  [key in TypographyCategory]: {
    fontWeight: number;
    fontSize: number;
    letterSpacing: number;
  }[];
};

export const fontSettings: FontSettingsType = {
  headline: [
    { fontWeight: 600, fontSize: 28, letterSpacing: -0.7 },
    { fontWeight: 600, fontSize: 22, letterSpacing: -0.3 },
    { fontWeight: 700, fontSize: 30, letterSpacing: -1 },
    { fontWeight: 700, fontSize: 35, letterSpacing: -1 },
    { fontWeight: 700, fontSize: 24, letterSpacing: -1 },
  ],
  subtitle: [
    { fontWeight: 600, fontSize: 20, letterSpacing: -0.15 },
    { fontWeight: 600, fontSize: 18, letterSpacing: -0.25 },
    { fontWeight: 600, fontSize: 15, letterSpacing: -0.25 },
    { fontWeight: 700, fontSize: 18, letterSpacing: -0.25 },
    { fontWeight: 600, fontSize: 26, letterSpacing: -0.7 },
  ],
  body: [
    { fontWeight: 400, fontSize: 18, letterSpacing: -0.3 },
    { fontWeight: 500, fontSize: 15, letterSpacing: -0.25 },
    { fontWeight: 500, fontSize: 17, letterSpacing: -0.25 },
    { fontWeight: 500, fontSize: 18, letterSpacing: -0.3 },
    { fontWeight: 400, fontSize: 17, letterSpacing: -0.25 },
    { fontWeight: 500, fontSize: 20, letterSpacing: -0.25 },
  ],
  button: [
    { fontWeight: 600, fontSize: 17, letterSpacing: -0.4 },
    { fontWeight: 500, fontSize: 13, letterSpacing: -0.25 },
  ],
  caption: [
    { fontWeight: 400, fontSize: 15, letterSpacing: -0.25 },
    { fontWeight: 400, fontSize: 13, letterSpacing: -0.25 },
  ],
};

function Text({ span, children, ...props }: TypographyProps) {
  if (span) return <span {...props}>{children}</span>;
  else return <div {...props}>{children}</div>;
}

export function Typography({
  transform,
  color,
  c,
  align,
  lineClamp,
  inherit,
  underline,
  strikethrough,
  italic,
  span,
  ...props
}: TypographyProps) {
  const { category, variant, text } = props;

  // console.log(colorType, colorIndex);

  const styles = css(
    inherit
      ? {
          fontFamily: 'inherit',
          fontWeight: 'inherit',
          color: 'inherit',
        }
      : {
          fontFamily: 'Pretendard',
          lineHeight: 1,
          color: color ? colorParser(color) : c || 'inherit',
          textDecoration: 'none',
          transform,
          textAlign: align,
          lineClamp,
          ...fontSettings[category || 'body'][variant ? variant - 1 : 0],
        }
  );

  return (
    <Text css={[styles, getDefaultProps(props)]} {...props}>
      {text || props.children}
    </Text>
  );
}
