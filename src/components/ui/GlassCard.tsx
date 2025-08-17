import React from "react";

export type GlassCardProps<E extends React.ElementType = 'div'> = {
  as?: E;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, 'as' | 'className' | 'children'>;

export function GlassCard<E extends React.ElementType = 'div'>({ as, className = "", children, ...rest }: GlassCardProps<E>) {
  const Tag = (as || 'div') as React.ElementType;
  return (
    <Tag
      className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}