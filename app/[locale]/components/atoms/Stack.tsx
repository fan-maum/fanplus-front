"use client";

import { DefaultProps, getDefaultProps } from "@/[locale]/styles/DefaultProps";
import { HTMLAttributes } from "react";

export interface StackProps extends HTMLAttributes<HTMLDivElement>, DefaultProps {
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  spacing?: React.CSSProperties["gap"];
}

export function Stack({ align, justify, spacing, children, ...props }: StackProps) {
  return (
    <div
      css={[
        {
          display: "flex",
          flexDirection: "column",
          alignItems: align,
          justifyContent: justify,
          gap: spacing,
        },
        getDefaultProps(props),
      ]}
      {...props}
    >
      {children}
    </div>
  );
}
