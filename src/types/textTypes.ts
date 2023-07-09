export type NavBarTextType = {
  vote: string;
  community: string;
  aboutUs: string;
  recruit: string;
  business: string;
  FAQ: string;
  language: string;
  link: {
    vote: string;
    community: string;
    aboutUs: string;
    business: string;
    FAQ: string;
  };
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
  };
  Area4: {
    title1: string;
    title2: string;
    line1: string;
    line2: string;
    line3: string;
    plus: string;
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
  };
  Area6: {
    title1: string;
    title2: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
  };
};
export type BusinessPageTextType = {
  title: string;
  content: string;
  address: string;
  form: {
    company: string;
    officer: string;
    email: string;
    message: string;
    button: string;
  };
};

export type TextType = {
  NavBar: NavBarTextType;
  MainPage: MainPageTextType;
  BuisnessPage: BusinessPageTextType;
};
