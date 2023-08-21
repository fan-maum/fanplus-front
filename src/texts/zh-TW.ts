import {
  NavBarTextType,
  FooterTextType,
  MainPageTextType,
  BusinessPageTextType,
  FAQPageTextType,
  LoginPageTextType,
  SignUpPageTextType,
} from '@/types/textTypes';
import { voteModalTextProps } from '@/types/vote';

export const NavBarText_zh_TW: NavBarTextType = {
  vote: '投票',
  community: 'Community',
  aboutUs: '服務介紹',
  recruit: '',
  business: '商務諮詢',
  language: '中文(繁體)',
  link: {
    vote: '/zh-TW/votes',
    community: '/zh-TW/community',
    aboutUs: '/zh-TW',
    business: '/zh-TW/business',
    faq: '/zh-TW/faq',
  },
};
export const FooterText_zh_TW: FooterTextType = {
  customerService: '客戶服務中心',
  emailButton: '咨询',
  termsOfService: 'Terms of service',
  termsOfServiceLink: 'https://privacy.fanplus.co.kr/terms_of_service.html',
  privacyPolicy: 'Privacy Policy',
  privacyPolicyLink: 'https://privacy.fanplus.co.kr/privacy.html',
  introduction: '10F 17-6, Yeoksam-ro 3-gil, Gangnam-gu, Seoul, Korea',
  copyright: 'Copyright © FanPlus. All Rights Reserved.',
};
export const MainPageText_zh_TW: MainPageTextType = {
  Area1: {
    line1: '在追星的快樂中,',
    line2: '加上Fanplus',
    line3: '',
  },
  Area2: {
    title1: '單獨或一起，多種快樂的追星方法',
    title2: '',
    line1: 'Fanplus正在考慮,',
    bold_line1: '',
    bold_line2_front: '',
    line2: '如何讓最活躍的',
    bold_line2_back: '粉絲之間更加快樂地追星。',
    line3: '從免費投票的APP開始,',
    line4: '為了讓粉絲們可以一起體會追星的快樂，',
    line5: 'Fanplus正在打造屬於自己的追星空間。',
    line6: '結識與自己心心相通的歌迷, 在追星中增添更多的快樂。',
    line7: '',
  },
  Area3: {
    title: '01 讓我的最愛成為主人公',
    line1: '每月查看新主題的相關投票。',
    line2: '',
    line3: '參加Fanplus的獨家免費投票,',
    line4: '給最喜愛的明星做全球廣告。',
    Ad_title: '[Fanplus投票冠軍廣告商品]',
    Ad1: '美國時代廣場',
    Ad2: '中國寧波',
    Ad3: '韓國仁川機場',
    img: '/images/서비스소개_01_투표썸네일_en.png',
  },
  Area4: {
    title1: '02 實時追星信息',
    title2: '',
    line1: '最愛偶像的高清圖片附加欣賞王道文！',
    line2: '與自己最愛相同的粉絲分享各種信息。',
    line3: '',
    plus: '請訪問活躍的公告欄。',
    img1: '/images/서비스소개_02_게시판_zh-tw.png',
    img2: '/images/서비스소개_02_사진_zh-tw.png',
    img3: '/images/서비스소개_02_팬픽_zh-tw.png',
    img4: '/images/서비스소개_02_왕중왕전랭킹_zh-tw.png',
  },
  Area5: {
    title1: '03 追星，您做過哪些?',
    title2: '',
    line1: '追星積攢Fanplus獨特的活動徽章！',
    line2: '與收集徽章的樂趣一起,',
    line3: '了解自己對最愛偶像的追逐熱情。',
    line4: '',
    plus1: '如果您查看其他人的活動徽章時,',
    plus2: '還可以知道他們的追星趨向。',
    img1: '/images/서비스소개_03_보유배지_zh-tw.png',
    img2: '/images/서비스소개_03_프로필_zh-tw.png',
    img3: '/images/서비스소개_03_미션배지상세_zh-tw.png',
    img4: '/images/서비스소개_03_업적배지상세_zh-tw.png',
  },
  Area6: {
    title1: '04 一起追星更加快樂',
    title2: '',
    line1: '發現與自己追星趨勢相似的朋友？',
    line2: '在實時聊天中, 分享您最愛偶像的點點滴滴',
    line3: '您知道嗎？',
    line4: '您或許能在Fanplus中遇到人生的追星盟友呢！',
    img1: '/images/서비스소개_04_친구_zh-tw.png',
    img2: '/images/서비스소개_04_채팅_zh-tw.png',
  },
};
export const BusinessText_zh_TW: BusinessPageTextType = {
  title: '隨時歡迎您諮詢業務合作。',
  content:
    '希望與Fanplus商務合作的個人/公司請先填寫您的提案內容, 審核後將與您聯繫。 該提案僅用於內容審核。',
  form: {
    company: '公司名稱（必填）',
    officer: '負責人姓名（必填）',
    email: '郵箱（必填）',
    message: '諮詢內容',
    button: '諮詢',
  },
};
export const FAQText_zh_TW: FAQPageTextType = {
  header: '您需要什麼幫助？',
  navBar: {
    all: '全部',
    vote: '投票',
    photos: '圖片',
    fanfic: '王道文',
    accounts: '賬戶',
  },
  q1: 'Fanplus提供怎樣的服務?',
  a1: 'Fanplus是以最愛偶像相同的粉絲為對象, 提供多樣化信息和通訊功能的全面追星的應用程序。 唯一在生日/紀念日可以免費為偶像投票。 在Fanplus中體驗追星的快樂。',
  q2: '如何參加投票?',
  a2: '您可以通過應用內出勤簽到和邀請好友獲得金幣, 且無需付費。 將您獲得的金幣兌換為投票券後, 為您最喜歡的偶像投票。',
  q3: '廣告何時/如何投放?',
  a3: '每月以生日/週年紀念日投票和按主題投票進行。 根據投票結果, 廣告將以在粉絲提交的素材中, 獲得票數最多的素材進行投放。',
  q4: '什麼時候開始準備投票?',
  a4: '投票於相應生日的2個月前開始進行。 主題投票通過Twitter公佈候選人, 請參閱公告。 轉到Fanplus Twitter',
  twitter: '推特(Twitter)',
  q5: '如何使用圖片功能？',
  a5: '查看並下載和自己的最愛偶像相同的粉絲上傳發布的圖片。 如果有喜歡的圖片, 可以直接設置成牆紙。',
  q6: '什麼是視覺王道文?',
  a6: '與現有的線型幻想不同, 它是一種以背景/角色/台詞組成的場面（場景）作為故事情節的方式進行。',
  q7: '',
  a7: '',
  q8: '註銷Fanplus後, 什麼時候可以重新註冊?',
  a8: '註銷後可以立即重新註冊。 只是, 為了防止濫用, 與註銷賬戶相同的暱稱/賬戶地址/已認證的號碼, 自註銷日起, 90天內無法再申請註冊。',
  q9: '註銷後什麼時候可以重新認證相同的號碼？',
  a9: '被已註銷賬戶驗證過的號碼, 自註銷日起, 90天以後, 可以重新用於號碼驗證。',
};
export const LoginPageText_zh_TW: LoginPageTextType = {
  heading: 'FanPlus登錄',
  line1: '需要登錄。您現在要登錄嗎？',
  appleButton: '使用Apple 賬號登陸',
  googleButton: '使用Google 賬號登陸',
  modal: {
    text1: '您無法在此瀏覽器中使用谷歌(Google)登錄。',
    text2AOS: '請複制URL並在 Chrome瀏覽器進行',
    text2IOS: '請複制URL並在 Safari或 Chrome瀏覽器進行',
    copyUrl: '複製 URL',
    close: '關閉',
  },
};
export const SignUpPageText_zh_TW: SignUpPageTextType = {
  heading: '用戶協議',
  line1: '為順利使用該服務，請同意條款。',
  agree1: '我是14歲及以上(必選)',
  agree2: '服務條款 (必選)',
  agree3: '個人隱私政策 (必選)',
  agree4: '第三方隱私政策 (必選)',
  detail: '查看詳情',
  start: '開始',
  agreeAll: '全部同意',
  agree2Link: 'https://privacy.fanplus.co.kr/terms_of_service.html',
  agree3Link: 'https://privacy.fanplus.co.kr/privacy.html',
  agree4Link: 'https://privacy.fanplus.co.kr/thrid_parties.html',
};

export const Votes_Text_zhtw = {
  voteEnd: '距離投票截止還有',
  voteFinished: '投票已結束',
  voteStart: '離公開投票還有一段距離',
  tab: {
    all: 'ALL',
    bday: '生日投票',
    league: '聯賽',
  },
  winner: '1位',
  daysAgo: '天',
  hoursAgo: '小時',
  minutesAgo: '分',
};

export const VoteDetail_Text_zhtw = {
  vote: '投票',
  voting: '投票',
  voteResult: '投票結果',
  voteDifference: {
    front: null,
    back: '票差距!',
  },
  seeMore: '查看詳情',
  currentVote: '票',
  prizeTitle: {
    detail: '詳細內容',
    first: '查看第1名獎勵',
    second: '查看第2名獎勵',
    third: '查看第3名獎勵',
  },
};

export const ShareModal_Text_zhtw = {
  shareModalTitle: '分享',
  shareModalClose: '關閉',
  twitter: 'Twitter',
  urlShare: '複製URL',
  otherAppShare: '分享到其他應用',
  urlCopied: 'URL已復制',
  check: '確認',
  shareTitleText: {
    standard: {
      front: '',
      back: '基準',
    },
    title0: '現在排名⁉',
    title1: '排名是⁉',
    title2: '排名是⁉',
  },
  shareMiddleText: {
    first: '1位',
    second: '2位',
    voteDiffFront: '僅',
    voteDiffBack: '票差',
    current: '現在是第',
    place: '位',
    lessThan: '',
    moreThan: '',
    voteDiff: '與第',
    with: '',
    middlePageFront: '参加 #FanPlus 投票\n给最爱的偶像送上特别的礼物 🎁🎈',
    middlePageBack: '现在第1位 : ❓❔',
  },
  shareEndText: {
    endFront: '現在即刻 #在FanPlus上給',
    endBack: '投票吧 ✊🏻✊🏻',
    endPage: '🔻查看實時排名🔻',
  },
};

export const VoteModal_Text_zhtw: any = ({
  freeVoteCount,
  starName,
  moreVoteCount,
}: voteModalTextProps) => {
  const modalItems = {
    voteProcess: `您想給<span>${starName}</span>免費投票嗎？`,
    voteDoneFirst: `給<span>${starName}</span>投票了。`,
    voteDoneEnd: `请在FanPlus應用投<b>${moreVoteCount}</b>票`,
    voteBlockFirst: `您每天只能參與一次投票。<br/>(免費投票00:00 KST重新設置)`,
    voteBlockEnd: `下載FanPlus,<br/>每天贈送<b>${moreVoteCount}</b>票。`,
  };
  return modalItems;
};

export const VoteModalButton_Text_zhtw = {
  voteModalVote: '投票',
  voteModalCancel: '取消',
  voteModalComplete: '完成',
  voteModalInstall: '下載APP',
};
