import {
  NavBarTextType,
  FooterTextType,
  MainPageTextType,
  BusinessPageTextType,
  FAQPageTextType,
  LoginPageTextType,
  SignUpPageTextType,
  CommunityPageTextType,
  CommunityBoardTextType,
  CommunityPostTextType,
} from '@/types/textTypes';
import { voteModalTextProps } from '@/types/vote';

export const NavBarText_JAP: NavBarTextType = {
  vote: '投票',
  community: 'コミュニティ',
  aboutUs: 'About Us',
  recruit: '',
  business: 'Business Inquiry',
  language: '日本語',
  link: {
    vote: '/ja/votes',
    community: '/ja/community',
    aboutUs: '/ja',
    business: '/ja/business',
    faq: '/ja/faq',
  },
};
export const FooterText_JAP: FooterTextType = {
  customerService: 'CS center',
  emailButton: 'Contact',
  termsOfService: 'Terms of service',
  termsOfServiceLink: 'https://privacy.fanplus.co.kr/terms_of_service.html',
  privacyPolicy: 'Privacy Policy',
  privacyPolicyLink: 'https://privacy.fanplus.co.kr/privacy.html',
  introduction: '10F 17-6, Yeoksam-ro 3-gil, Gangnam-gu, Seoul, Korea',
  copyright: 'Copyright © FanPlus. All Rights Reserved.',
};
export const MainPageText_JAP: MainPageTextType = {
  Area1: {
    line1: 'Must-Have App for',
    line2: 'Worldwide Kpop Fans',
    line3: 'FanPlus',
  },
  Area2: {
    title1: 'Be together with worldwide fans',
    title2: '& add more fun to your fan life',
    line1: 'Fanplus considers',
    bold_line1: ' the fun of fan life',
    bold_line2_front: '',
    line2: 'with other fan friends the most valuable experience',
    bold_line2_back: '',
    line3: 'Starting with a voting app without payment,',
    line4: 'we are creating a community-friendly space,',
    line5: 'so all fans have fun being together.',
    line6: 'Meet fan friends who just hit it off with you on FanPlus',
    line7: 'and add joy to your fan life',
  },
  Area3: {
    title: '01 Promote your star',
    line1: 'Check out votes with a variety of new topics',
    line2: 'every month.',
    line3: 'Participate in Fan Plus votes with no-payment',
    line4: 'and give reward ADs to your star around the world',
    Ad_title: '[FanPlus Reward ADs]',
    Ad1: 'NYC Times Square in the US',
    Ad2: 'Ningbo in China',
    Ad3: 'Incheon Airport in Korea',
    img: '/images/서비스소개_01_투표썸네일_en.png',
  },
  Area4: {
    title1: '02 Enjoy entertaining',
    title2: 'contents',
    line1: 'Check high-quality photos and fanfic of your star!',
    line2: 'Enjoy varied contents',
    line3: 'that users create and share together.',
    plus: "Don't miss the board too!",
    img1: '/images/서비스소개_02_게시판_en.png',
    img2: '/images/서비스소개_02_사진_en.png',
    img3: '/images/서비스소개_02_팬픽_en.png',
    img4: '/images/서비스소개_02_왕중왕전랭킹_en.png',
  },
  Area5: {
    title1: '03 How enthusiastic fan',
    title2: 'are you?',
    line1: 'The more active you are,',
    line2: 'the more badges you get on FanPlus!',
    line3: 'Show your badges to your friends',
    line4: 'so everyone knows how much you support your star.',
    plus1: "Check your friend's stan propensity with badges on FanPlus.",
    plus2: '',
    img1: '/images/서비스소개_03_보유배지_en.png',
    img2: '/images/서비스소개_03_프로필_en.png',
    img3: '/images/서비스소개_03_미션배지상세_en.png',
    img4: '/images/서비스소개_03_업적배지상세_en.png',
  },
  Area6: {
    title1: '04 It is more fun',
    title2: 'when we are all together',
    line1: 'If you just hit it off with fan friends,',
    line2: 'chat and share your fan life with them.',
    line3: 'Who knows?',
    line4: 'You will find the BFF on FanPlus!',
    img1: '/images/서비스소개_04_친구_en.png',
    img2: '/images/서비스소개_04_채팅_en.png',
  },
};
export const BusinessText_JAP: BusinessPageTextType = {
  title: 'We are looking for great corporations to offer a better service for users.',
  content:
    "We welcome and look forward to your proposals. Fill out the form and we'll get back to you as soon as possible.",
  form: {
    company: 'Company (required)',
    officer: 'Full name (required)',
    email: 'Email (required)',
    message: 'Message',
    button: 'SEND REQUEST',
  },
};
export const FAQText_JAP: FAQPageTextType = {
  header: 'We are here to help.',
  navBar: {
    all: 'All',
    vote: 'Vote',
    photos: 'Photos',
    fanfic: 'Fanfic',
    accounts: 'Accounts',
  },
  q1: 'What is FanPlus?',
  a1: 'FanPlus is a comprehensive app for worldwide Kpop fans that provides various contents and communication features. It is the only vote app without any payment. Have more fun for your fan life on Fanplus.',
  q2: 'How can I vote on FanPlus?',
  a2: 'You can get cash through daily attendance or inviting friends or participate in mission on offer-walls. Exchange your earned cash for voting tickets and vote for your favorite star.',
  q3: 'How will the reward ADs for vote winners be given?',
  a3: 'FanPlus holds birthday/debut anniversary votes and special themed votes every month. The winner will get a reward ADs depending on the voting result, and the AD content will be made and chosen by fans. AD locations may change every month.',
  q4: 'From when does the vote start and how do we know it?',
  a4: "A birthday/debut anniversary vote starts about two months before the month of your bias' birthday/debut anniversary. Also, we nominate candidates from requests on FanPlus Twitter for a special themed vote. Please refer to our notice tweets related to the vote on FanPlus Twitter.",
  twitter: 'Go to Fanplus Twitter',
  q5: "How can I use 'Photo' feature?",
  a5: 'Check & download photos posted by fans who are stan for the same bias as you. You can set your favorite photo as wallpaper on your mobile too.',
  q6: "What is 'Visual Fanfic'?",
  a6: 'Visual fanfic shows not only texts but also chat-style slides with background photos, characters, and scripts.',
  q7: '',
  a7: '',
  q8: 'Is it possible to re-register on FanPlus after deactivating my account?',
  a8: 'You can re-register on FanPlus anytime. However, you can use the same email address/nickname/mobile number 90 days after deactivation.',
  q9: 'When can I use the same mobile number from my old account to verify?',
  a9: 'You can use the mobile number which has been verified with the deactivated account 90 days after deactivation.',
};
export const LoginPageText_JAP: LoginPageTextType = {
  heading: 'FanPlusログイン',
  line1: 'ログインが必要です。あなたは、ログインしますか？',
  appleButton: 'アップルでサインイン',
  googleButton: 'Googleアカウントでサインイン',
  modal: {
    text1: 'このブラウザでは Google ログインを使用できません。',
    text2AOS: 'URLをコピーして、 Chrome ブラウザで お進みください。',
    text2IOS: 'URLをコピーして、 Safari または Chrome ブラウザで お進みください。',
    copyUrl: 'URL コピー',
    close: '閉じる',
  },
};
export const SignUpPageText_JAP: SignUpPageTextType = {
  heading: '利用規約',
  line1: '円滑なサービスの利用のために同意してください。',
  agree1: '私は14歳以上です(必須)',
  agree2: 'サービス利用約款 (必須)',
  agree3: '個人情報取扱方針 (必須)',
  agree4: '個人情報の第三者提供 (必須)',
  detail: '続きを読む',
  start: '詩作',
  agreeAll: '同意(必須)',
  agree2Link: 'https://privacy.fanplus.co.kr/terms_of_service.html',
  agree3Link: 'https://privacy.fanplus.co.kr/privacy.html',
  agree4Link: 'https://privacy.fanplus.co.kr/thrid_parties.html',
};

export const Votes_Text_ja = {
  voteEnd: '最後まで',
  voteFinished: '投票が締め切られました。',
  voteStart: 'オープンまで',
  tab: {
    all: 'ALL',
    bday: '誕生日 投票',
    league: 'リーグ 投票',
  },
  winner: '1位',
  daysAgo: '日々',
  hoursAgo: '時間',
  minutesAgo: '分',
};

export const VoteDetail_Text_ja = {
  vote: '投票',
  voting: '投票する',
  voteResult: '投票結果',
  voteDifference: {
    front: null,
    back: '票の得票差!',
  },
  seeMore: '詳細はこちら',
  currentVote: '票',
  prizeTitle: {
    detail: '詳細',
    first: '1等の商品',
    second: '2等の商品',
    third: '3等の商品',
  },
};

export const ShareModal_Text_ja = {
  shareModalTitle: '共有',
  shareModalClose: '閉じる',
  twitter: 'Twitter',
  urlShare: 'URLをコピー',
  otherAppShare: '他のアプリで共有',
  urlCopied: 'URLがコピーされました',
  check: '確認',
  shareTitleText: {
    standard: {
      front: 'as of',
      back: '',
    },
    title0: 'Current Ranking',
    title1: 'Current Ranking',
    title2: 'Current Ranking',
  },
  shareMiddleText: {
    first: '1st',
    second: '2nd',
    voteDiffFront: 'Winning by',
    voteDiffBack: 'votes',
    current: 'is currently',
    place: '. place',
    lessThan: 'less than',
    moreThan: 'more than',
    voteDiff: '',
    with: '',
    middlePageFront: 'Participate in #FanPlus vote\nand give your bias AD rewards! 🎁🎈',
    middlePageBack: 'Currently winning : ❓❔',
  },
  shareEndText: {
    endFront: 'Vote',
    endBack: 'on #FanPlus right now! ✊🏻✊🏻',
    endPage: '🔻Check the current ranking🔻',
  },
};

export const VoteModal_Text_ja: any = ({
  freeVoteCount,
  starName,
  moreVoteCount,
}: voteModalTextProps) => {
  const modalItems = {
    voteProcess: `<span>${starName}</span>様へ<b>${freeVoteCount}</b>票を無料で 投票しますか？`,
    voteDoneFirst: `<span>${starName}</span>様へ無料で<b>${freeVoteCount}</b>票が投票されました`,
    voteDoneEnd: ` FanPlusアプリでさらに<b>${moreVoteCount}</b>票投票してみてください！`,
    voteBlockFirst: `1日に1回投票に参加できます<br/>(無料投票は 00:00 KSTに更新されます）`,
    voteBlockEnd: `FanPlusアプリをインストールすると<br/>毎日 <b>${moreVoteCount}</b>票差し上げます`,
  };
  return modalItems;
};

export const VoteModalButton_Text_ja = {
  voteModalVote: '投票する',
  voteModalCancel: 'キャンセル',
  voteModalComplete: '完了',
  voteModalInstall: 'アプリをインストールする',
};

export const CommunityMainText_JAP: CommunityPageTextType = {
  community: 'コミュニティ',
  home: '掲示板ホーム',
  search: '掲示板検索',
  recentlyBoards: '最近訪れた掲示板',
  recommendedBoards: 'おすすめ掲示板',
  noRecentBoardTexts: ['ファンプラスを利用するのは初めてですか?', 'お気に入りのスターを探せ！'],
  buttonSearch: '検索',
  allCategory: '全',
  searchPlaceholder: '원하는 게시판을 찾아보세요.',
};
export const CommunityBoardText_JAP: CommunityBoardTextType = {
  all: '全',
  recommendCount: 'おすすめ',
  viewCount: 'ヒット',
  popular: '人気',
  daysAgo: '日 前',
  hoursAgo: '時間 前',
  minsAgo: '分 前',
  bottomTabBar: {
    write: '書き込み',
    popular: '人気',
    myPost: '私が書いた記事',
  },
  boardLang: {
    modalHeader: '話 設定言語',
    modalExplain: '選択した言語で書かれたテキストを見ることができます!',
    current: 'すべての言語',
    ALL: 'すべての言語',
    ko: '한국어',
    en: 'English',
    ja: '日本語',
    zh: '中文(简体)',
    es: 'Español',
    vi: 'Tiếng việt',
    id: 'Bahasa Indonesia',
    zhtw: '中文(繁體)',
  },
  noPostTexts: ['投稿はありません', '最初に投稿を残してください'],
  noMyPostTexts: ['書かれた投稿はありません'],
  buttonWrite: '書き込み',
};

export const CommunityPostText_JAP: CommunityPostTextType = {
  popular: '人気',
  post: '글',
  viewCount: 'ヒット',
  recommendCount: 'おすすめ',
  recommend: 'おすすめ',
};
