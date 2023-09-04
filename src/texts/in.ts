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
} from '@/types/textTypes';
import { voteModalTextProps } from '@/types/vote';

export const NavBarText_IND: NavBarTextType = {
  vote: 'Vote',
  community: 'Komunitas',
  aboutUs: 'About Us',
  recruit: '',
  business: 'Business Inquiry',
  language: 'Bahasa Indonesia',
  link: {
    vote: '/in/votes',
    community: '/in/community',
    aboutUs: '/in',
    business: '/in/business',
    faq: '/in/faq',
  },
};
export const FooterText_IND: FooterTextType = {
  customerService: 'CS center',
  emailButton: 'Contact',
  termsOfService: 'Terms of service',
  termsOfServiceLink: 'https://privacy.fanplus.co.kr/terms_of_service.html',
  privacyPolicy: 'Privacy Policy',
  privacyPolicyLink: 'https://privacy.fanplus.co.kr/privacy.html',
  introduction: '10F 17-6, Yeoksam-ro 3-gil, Gangnam-gu, Seoul, Korea',
  copyright: 'Copyright © FanPlus. All Rights Reserved.',
};
export const MainPageText_IND: MainPageTextType = {
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
export const BusinessText_IND: BusinessPageTextType = {
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
export const FAQText_IND: FAQPageTextType = {
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
export const LoginPageText_IND: LoginPageTextType = {
  heading: 'Masuk FanPlus',
  line1: 'Login diperlukan. Apakah Anda ingin login?',
  appleButton: 'Masuk dengan Apple',
  googleButton: 'Masuk dengan Google',
  modal: {
    text1: 'Anda tidak dapat menggunakan login Google di browser ini.',
    text2AOS: 'Silakan salin URL dan lanjutkan di browser Chrome.',
    text2IOS: 'Anda tidak dapat menggunakan login Google di browser ini.',
    copyUrl: 'Salin URL',
    close: 'Tutup',
  },
};
export const SignUpPageText_IND: SignUpPageTextType = {
  heading: 'Persetujuan Penggunaan',
  line1: 'Harap setujui persyaratan dan ketentuan.',
  agree1: 'Aku 14 tahun atau lebih tua (yg dibutuhkan)',
  agree2: 'Ketentuan layanan (yg dibutuhkan)',
  agree3: 'Kebijakan pribadi (yg dibutuhkan)',
  agree4: 'Pemberian Informasi kepada Pihak Ketiga (yg dibutuhkan)',
  detail: 'Details',
  start: 'Mulailah',
  agreeAll: 'Saya setuju semua',
  agree2Link: 'https://privacy.fanplus.co.kr/terms_of_service.html',
  agree3Link: 'https://privacy.fanplus.co.kr/privacy.html',
  agree4Link: 'https://privacy.fanplus.co.kr/thrid_parties.html',
};

export const Votes_Text_in = {
  voteEnd: 'Sampai akhir',
  voteFinished: 'Pemungutan suara sudah selesai.',
  voteStart: 'Sampai tempat terbuka',
  tab: {
    all: 'ALL',
    bday: 'B-day',
    league: 'League',
  },
  winner: '1st',
  daysAgo: 'd',
  hoursAgo: 'h',
  minutesAgo: 'm',
};

export const VoteDetail_Text_in = {
  vote: 'Pemungutan suara',
  voting: 'Beri suara',
  voteResult: 'Hasil',
  voteDifference: {
    front: 'Beda',
    back: 'suara!',
  },
  seeMore: 'Tampilkan Detail',
  currentVote: 'suara',
  prizeTitle: {
    detail: 'Detil',
    first: 'Melihat keuntungan juara 1',
    second: 'Hadiah Pemenang ke-2',
    third: 'Hadiah Pemenang 3',
  },
};

export const ShareModal_Text_in = {
  shareModalTitle: 'Bagi',
  shareModalClose: 'Tutup',
  twitter: 'Twitter',
  urlShare: 'Salin URL',
  otherAppShare: 'Bagikan ke aplikasi lain',
  urlCopied: 'URL disali',
  check: 'Memeriksa',
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

export const VoteModal_Text_in: any = ({
  freeVoteCount,
  starName,
  moreVoteCount,
}: voteModalTextProps) => {
  const modalItems = {
    voteProcess: `Apakah Anda ingin memilih <b>${freeVoteCount}</b> suara secara gratis untuk <span>${starName}</span>?`,
    voteDoneFirst: `<span>${starName}</span> mendapat <b>${freeVoteCount}</b> suara gratis.`,
    voteDoneEnd: `Pilih lebih banyak <b>${moreVoteCount}suara</b> di aplikasi FanPlus!`,
    voteBlockFirst: `Anda dapat memilih sekali per hari<br/>(gratis suara bebas diperbarui pukul 00:00 KST)`,
    voteBlockEnd: `FanPlus app Instal aplikasinya.<br/>Anda mendapatkan <b>${moreVoteCount}</b> suara memberikan suara setiap hari`,
  };
  return modalItems;
};

export const VoteModalButton_Text_in = {
  voteModalVote: 'Beri suara',
  voteModalCancel: 'Batal',
  voteModalComplete: 'Selesai',
  voteModalInstall: 'Pasang aplikasi',
};

export const CommunityMainText_IND: CommunityPageTextType = {
  community: 'Komunitas',
  home: 'Beranda',
  search: 'Cari',
  recentlyBoards: 'Papan Baru-Baru Ini Dikunjungi',
  recommendedBoards: 'Disarankan untuk Anda',
};
export const CommunityBoardText_IND: CommunityBoardTextType = {
  all: 'Semua',
  recommendCount: 'Seperti',
  viewCount: 'Lihat',
  popular: 'Populer',
  daysAgo: 'hari sebelumnya',
  hoursAgo: 'jam sebelumnya',
  minsAgo: 'menit sebelumnya',
  bottomTabBar: {
    write: 'Tulis',
    popular: 'Populer',
    myPost: 'Cerita Saya',
  },
};
