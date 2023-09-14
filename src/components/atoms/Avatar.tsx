/* eslint-disable @next/next/no-img-element */
import { ColorProps, colorParser } from '@/styles/Colors';
import { DefaultProps, getDefaultProps } from '@/styles/DefaultProps';
import { useEffect, useState } from 'react';

export interface AvatarProps extends DefaultProps {
  /** Image url */
  src?: string;

  /** Image alt text or title for placeholder variant */
  alt?: string;

  /** Avatar width and height */
  size?: number;

  /** Key of theme.radius or any valid CSS value to set border-radius, "xl" by default */
  radius?: any;

  /** Key of theme.colors */
  color?: ColorProps;

  /** <img /> element attributes */
  imageProps?: Record<string, any>;
}

export function Avatar({
  src,
  alt,
  size,
  radius,
  color,
  imageProps,
  children,
  ...props
}: AvatarProps) {
  const [error, setError] = useState(!src);

  useEffect(() => {
    !src ? setError(true) : setError(false);
  }, [src]);

  return (
    <div
      css={[
        {
          boxSizing: 'border-box',
          position: 'relative',
          display: 'block',
          userSelect: 'none',
          overflow: 'hidden',
          borderRadius: radius || 9999,
          textDecoration: 'none',
          border: 0,
          backgroundColor: 'transparent',
          padding: 0,
          width: size,
          height: size,
        },
        getDefaultProps(props),
      ]}
      {...props}
    >
      {error ? (
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            userSelect: 'none',
            color: '#fff',
            backgroundColor: `${colorParser(color)}aa`,
          }}
          {...imageProps}
          title={alt}
        >
          {children || <>-</>}
        </div>
      ) : (
        <img
          loading="lazy"
          css={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            display: 'block',
            borderRadius: '10px',
          }}
          {...imageProps}
          src={src}
          alt={alt}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}
