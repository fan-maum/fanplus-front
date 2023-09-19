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
  termsOfServiceLink: string;
  privacyPolicy: string;
  privacyPolicyLink: string;
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
export type LoginPageTextType = {
  heading: string;
  line1: string;
  appleButton: string;
  googleButton: string;
  modal: {
    text1: string;
    text2AOS: string;
    text3AOS?: string;
    text2IOS: string;
    copyUrl: string;
    close: string;
  };
};
export type SignUpPageTextType = {
  heading: string;
  line1: string;
  agree1: string;
  agree2: string;
  agree3: string;
  agree4: string;
  detail: string;
  start: string;
  agreeAll: string;
  agree2Link: string;
  agree3Link: string;
  agree4Link: string;
};
export type CommunityPageTextType = {
  community: string;
  home: string;
  search: string;
  recentlyBoards: string;
  recommendedBoards: string;
  noRecentBoardTexts: string[];
  buttonSearch: string;
  allCategory: string;
  searchPlaceholder: string;
  link: {
    board: string;
  };
};
export type CommunityBoardTextType = {
  all: string;
  viewCount: string;
  recommendCount: string;
  popular: string;
  daysAgo: string;
  hoursAgo: string;
  minsAgo: string;
  bottomTabBar: {
    write: string;
    popular: string;
    myPost: string;
  };
  boardLang: {
    modalHeader: string;
    modalExplain: string;
    current: string;
    ALL: string;
    ko: string;
    en: string;
    ja: string;
    zh: string;
    es: string;
    vi: string;
    id: string;
    zhtw: string;
  };
  noPostTexts: string[];
  noMyPostTexts: string[];
  buttonWrite: string;
  link: {
    board: string;
  };
};

export type CommunityPostTextType = {
  popular: string;
  post: string;
  viewCount: string;
  recommendCount: string;
  recommend: string;
  edit: string;
  delete: string;
  report: string;
  cancelButton: string;
  confirmButton: string;
  reportButton: string;
  commentRegisterPlaceholder: string;
  askPostDelete: string;
  askCommentDelete: string;
  postDeleted: string;
  commentDeleted: string;
  reported: string;
  reply: string;
  writeReply: string;
  register: string;
  orderOldest: string;
  orderNewest: string;
  commentTotalCount: string;
  showMoreComments: string;
  deleted: string;
  alreadyDeleted: string;
  alreadyReportedPost: string;
  alreadyReportedComment: string;
  reportReason: string;
  reportPostOptions: {
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    option5: string;
    option6: string;
  };
  reportCommentOptions: {
    option1: string;
    option2: string;
  };
  reportWarning: [string, string];
};

export type TextType = {
  NavBar: NavBarTextType;
  Footer: FooterTextType;
  MainPage: MainPageTextType;
  BuisnessPage: BusinessPageTextType;
  FAQPage: FAQPageTextType;
  LoginPage: LoginPageTextType;
  SignUpPage: SignUpPageTextType;
};
