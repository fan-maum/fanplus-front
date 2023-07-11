export type NavBarTextType = {
  vote: string;
  community: string;
  aboutUs: string;
  recruit: string;
  business: string;
  language: string;
  link: {
    vote: string;
    community: string;
    aboutUs: string;
    business: string;
    faq: string;
  };
};
export type FooterTextType = {
  customerService: string;
  emailButton: string;
  termsOfService: string;
  privacyPolicy: string;
  introduction: string;
  copyright: string;
};
export type MainPageTextType = {
  Area1: {
    line1: string;
    line2: string;
    line3: string;
  };
  Area2: {
    title1: string;
    title2: string;
    line1: string;
    bold_line1: string;
    bold_line2_front: string;
    line2: string;
    bold_line2_back: string;
    line3: string;
    line4: string;
    line5: string;
    line6: string;
    line7: string;
  };
  Area3: {
    title: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    Ad_title: string;
    Ad1: string;
    Ad2: string;
    Ad3: string;
    img: string;
  };
  Area4: {
    title1: string;
    title2: string;
    line1: string;
    line2: string;
    line3: string;
    plus: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
  };
  Area5: {
    title1: string;
    title2: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    plus1: string;
    plus2: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
  };
  Area6: {
    title1: string;
    title2: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    img1: string;
    img2: string;
  };
};
export type BusinessPageTextType = {
  title: string;
  content: string;
  form: {
    company: string;
    officer: string;
    email: string;
    message: string;
    button: string;
  };
};
export type FAQPageTextType = {
  header: string;
  navBar: {
    all: string;
    vote: string;
    photos: string;
    fanfic: string;
    accounts: string;
  };
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
  q4: string;
  a4: string;
  twitter: string;
  q5: string;
  a5: string;
  q6: string;
  a6: string;
  q7: string;
  a7: string;
  q8: string;
  a8: string;
  q9: string;
  a9: string;
};

export type TextType = {
  NavBar: NavBarTextType;
  Footer: FooterTextType;
  MainPage: MainPageTextType;
  BuisnessPage: BusinessPageTextType;
  FAQPage: FAQPageTextType;
};
