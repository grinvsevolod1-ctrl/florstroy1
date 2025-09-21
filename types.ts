export type SingleNavItem = { title: string; href: string; outlined?: boolean };

export type NavItems = SingleNavItem[];

export type SingleArticle = {
  slug: string;
  content: string;
  meta: {
    title: string;
    description: string;
    date: string;
    tags: string;
    imageUrl: string;
  };
};

export type NonNullableChildren<T> = { [P in keyof T]: Required<NonNullable<T[P]>> };

export type NonNullableChildrenDeep<T> = {
  [P in keyof T]-?: NonNullableChildrenDeep<NonNullable<T[P]>>;
};
declare module 'react-input-mask' {
  import * as React from 'react';

  interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    alwaysShowMask?: boolean;
    maskChar?: string | null;
    beforeMaskedValueChange?: (
      newState: { value: string; selection: { start: number; end: number } },
      oldState: { value: string; selection: { start: number; end: number } },
      userInput: string,
      maskOptions: any
    ) => { value: string; selection: { start: number; end: number } };
  }

  const InputMask: React.FC<InputMaskProps>;
  export default InputMask;
}
