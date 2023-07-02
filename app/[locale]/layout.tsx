import React, { ReactNode } from "react";
import NavBar from "./components/NavBar";
import { NextIntlClientProvider } from "next-intl";

export function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

type PropTypes = {
  children: ReactNode;
  params: { locale: string };
};

const LocaleLayout = async ({ children, params: { locale } }: PropTypes) => {
  let texts = (await import(`../../text_assets/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={texts}>
      <NavBar />
      {children}
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
