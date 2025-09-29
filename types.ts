// types.ts

export type SingleNavItem = {
  title: string | JSX.Element;
  href?: string;
  outlined?: boolean;
  submenu?: SingleNavItem[]; // 👈 вложенное меню
};

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

export type NonNullableChildren<T> = {
  [P in keyof T]: Required<NonNullable<T[P]>>;
};

export type NonNullableChildrenDeep<T> = {
  [P in keyof T]-?: NonNullableChildrenDeep<NonNullable<T[P]>>;
};