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
  CommunityPostEditorTextType,
} from '@/types/textTypes';
import { voteModalTextProps } from '@/types/vote';

export const NavBarText_KR: NavBarTextType = {
  vote: '투표',
  community: '커뮤니티',
  aboutUs: '서비스 소개',
  recruit: '채용',
  business: '제휴 문의',
  language: '한국어',
  link: {
    vote: '/ko/votes',
    community: '/ko/community',
    aboutUs: '/ko/',
    business: '/ko/business',
    faq: '/ko/faq',
  },
};
export const FooterText_KR: FooterTextType = {
  customerService: '고객센터',
  emailButton: '이메일 문의',
  termsOfService: '이용약관',
  termsOfServiceLink: 'https://privacy.fanplus.co.kr/terms_of_service_ko.html',
  privacyPolicy: '개인정보처리방침',
  privacyPolicyLink: 'https://privacy.fanplus.co.kr/privacy_ko.html',
  introduction: '서울시 강남구 역삼로3길 17-6, 10층',
  copyright: 'Copyright © 팬플러스. All Rights Reserved.',
};
export const MainPageText_KR: MainPageTextType = {
  Area1: {
    line1: '덕질에 즐거움 더하기,',
    line2: '팬플러스',
    line3: '',
  },
  Area2: {
    title1: '따로 또 같이, 덕질을 즐기는 다양한 방법',
    title2: '',
    line1: '팬플러스는 최애가 같은 팬들끼리',
    bold_line1: '',
    bold_line2_front: '어떻게 하면 더 즐겁게 덕질할 수 있을지 ',
    line2: '고민합니다.',
    bold_line2_back: '',
    line3: '유료 결제 없는 투표 앱으로 시작해,',
    line4: '함께하는 덕질의 재미를 느낄 수 있도록',
    line5: '팬플러스만의 공간을 만들어가고 있어요.',
    line6: '나와 마음이 맞는 팬들을 만나 덕질에 즐거움을 더해보세요.',
    line7: '',
  },
  Area3: {
    title: '01 내 최애를 주인공으로',
    line1: '매달 새롭게 열리는 다양한 주제의 투표를 확인해보세요.',
    line2: '',
    line3: '팬플러스만의 유료 결제 없는 투표에 참여하고,',
    line4: '최애에게 전 세계 광고를 선물하세요.',
    Ad_title: '[팬플러스 투표 1등 광고상품]',
    Ad1: '미국 타임스퀘어',
    Ad2: '중국 닝보',
    Ad3: '인천공항',
    img: '/images/서비스소개_01_투표썸네일.png',
  },
  Area4: {
    title1: '02 시간 순삭 덕질 콘텐츠',
    title2: '',
    line1: '최애의 고화질 사진과 팬픽 감상은 덤!',
    line2: '나와 최애가 같은 팬들이 공유하는',
    line3: '다양한 콘텐츠를 즐겨보세요.',
    plus: '북적이는 게시판도 방문해보세요.',
    img1: '/images/서비스소개_02_게시판.png',
    img2: '/images/서비스소개_02_사진.png',
    img3: '/images/서비스소개_02_팬픽.png',
    img4: '/images/서비스소개_02_왕중왕전랭킹.png',
  },
  Area5: {
    title1: '03 덕질, 어디까지 해봤나요?',
    title2: '',
    line1: '덕질할 수록 쌓이는 팬플러스만의 활동 배지!',
    line2: '배지를 수집하는 재미와 함께',
    line3: '최애를 향한 나의 덕력을 확인해보세요.',
    line4: '',
    plus1: '다른 사람의 활동 배지를 보면 그 사람의 덕질 성향도 알 수 있어요.',
    plus2: '',
    img1: '/images/서비스소개_03_보유배지-1.png',
    img2: '/images/서비스소개_03_프로필-1.png',
    img3: '/images/서비스소개_03_미션배지상세-1.png',
    img4: '/images/서비스소개_03_업적배지상세-1.png',
  },
  Area6: {
    title1: '04 함께하면 더 즐거운 덕질',
    title2: '',
    line1: '나와 성향이 비슷한 친구를 발견했다면?',
    line2: '실시간 채팅으로 최애 이야기를 나눠보세요.',
    line3: '혹시 알아요?',
    line4: '팬플러스에서 인생 덕메를 만나게 될지!',
    img1: '/images/서비스소개_04_친구.png',
    img2: '/images/서비스소개_04_채팅.png',
  },
};
export const BusinessText_KR: BusinessPageTextType = {
  title: '팬플러스는 다양한 제휴를 통해 더 나은 서비스를 제공하고자 합니다.',
  content:
    '팬플러스와 비즈니스 제휴를 희망하는 개인, 기업은 제안 내용을 등록해주시면 검토 후 연락드리겠습니다. 제안 내용은 검토 목적으로만 이용됩니다.',
  form: {
    company: '회사명 (필수)',
    officer: '담당자명 (필수)',
    email: '이메일 (필수)',
    message: '문의 내용',
    button: '문의하기',
  },
};
export const FAQText_KR: FAQPageTextType = {
  header: '무엇을 도와드릴까요?',
  navBar: {
    all: '전체',
    vote: '투표',
    photos: '사진',
    fanfic: '팬픽',
    accounts: '계정',
  },
  q1: '팬플러스는 어떤 서비스인가요?',
  a1: '팬플러스는 최애가 같은 팬들을 대상으로 다양한 콘텐츠와 소통 기능을 제공하는 종합 덕질 앱이에요. 유일하게 유료 결제 없는 아이돌 생일/기념일 투표를 진행하고 있답니다. 팬플러스에서 덕질에 즐거움을 더해보세요.',
  q2: '투표는 어떻게 참여할 수 있나요?',
  a2: '유료 결제 없이 앱 내 출석체크와 친구 초대를 통해 캐시를 획득할 수 있어요. 획득한 캐시를 투표권으로 교환하여 내 최애에게 투표해보세요.',
  q3: '광고는 언제/어떻게 진행되나요?',
  a3: '매달 생일/기념일 투표와 주제별 투표가 진행되고 있어요. 투표 결과에 따라 팬들이 응모한 시안 중 가장 많은 지지를 받은 시안으로 광고가 이루어져요.',
  q4: '투표는 언제부터 준비하나요?',
  a4: '생일에 해당하는 달로부터 약 2개월 전에 투표가 시작돼요. 주제별 투표는 트위터 공지를 통해 후보 제보를 받고 있으니, 공지를 참고해주세요.',
  twitter: '팬플러스 트위터 바로가기',
  q5: '사진 기능은 어떻게 사용할 수 있나요?',
  a5: '나와 최애가 같은 팬들이 직접 올린 사진을 구경하고 다운 받아보세요. 마음에 드는 사진이 있다면 바로 배경화면으로 설정할 수도 있어요.',
  q6: '비주얼 팬픽이 뭔가요?',
  a6: '기존 줄글 형식의 팬픽에서 벗어나 배경/인물/대사로 구성된 장면(씬)으로 이야기가 진행되는 형식이에요.',
  q7: '팬픽 출금 기능은 어떻게 사용하는 건가요?',
  a7: '독자에게 응원을 받으면 팝콘 아이템이 적립돼요. 팝콘을 모아 출금 신청을 할 수 있어요. 단, 현재는 번호 인증을 완료한 한국 유저만 이용이 가능해요.',
  q8: '팬플러스 탈퇴 후 재가입은 언제할 수 있나요?',
  a8: '탈퇴 후 재가입은 바로 가능해요. 다만, 어뷰징 방지를 위해 탈퇴된 계정과 동일한 닉네임/계정 주소/인증된 번호로는 탈퇴일로부터 90일간 가입이 제한됩니다.',
  q9: '탈퇴 후 같은 번호로 다시 인증하는 건 언제부터 가능한가요?',
  a9: '탈퇴한 계정에 인증되어 있는 번호는 탈퇴일로부터 90일이 지난 이후에 다시 번호 인증에 사용할 수 있어요.',
};
export const LoginPageText_KR: LoginPageTextType = {
  heading: '팬플러스 로그인 하기',
  line1: '로그인이 필요합니다. 로그인을 하시겠습니까?',
  appleButton: 'Apple 계정으로 로그인',
  googleButton: 'Google 계정으로 로그인',
  modal: {
    text1: '해당 브라우저에서는 구글 로그인을 사용할 수 없습니다.',
    text2AOS: 'URL 복사를 통해 크롬 혹은',
    text3AOS: '삼성 인터넷 브라우저에서 진행해주세요.',
    text2IOS: 'URL 복사를 통해 사파리 혹은 크롬 브라우저에서 진행해주세요.',
    copyUrl: 'URL 복사',
    close: '닫기',
  },
};
export const SignUpPageText_KR: SignUpPageTextType = {
  heading: '이용약관',
  line1: '원활한 서비스 이용을 위해 동의해주세요.',
  agree1: '만 14세 이상입니다. (필수)',
  agree2: '서비스 이용약관 (필수)',
  agree3: '개인정보 취급방침 (필수)',
  agree4: '개인정보 제3자 제공 (필수)',
  detail: '보기',
  start: '시작',
  agreeAll: '모두 동의하기',
  agree2Link: 'https://privacy.fanplus.co.kr/terms_of_service_ko.html',
  agree3Link: 'https://privacy.fanplus.co.kr/privacy_ko.html',
  agree4Link: 'https://privacy.fanplus.co.kr/thrid_parties_ko.html',
};

export const Votes_Text_ko = {
  voteEnd: '투표 종료까지',
  voteFinished: '투표 종료',
  voteStart: '투표 시작까지',
  tab: {
    all: '전체',
    bday: '생일 투표',
    league: '리그전',
  },
  winner: '1위',
  daysAgo: '일',
  hoursAgo: '시',
  minutesAgo: '분',
};

export const VoteDetail_Text_ko = {
  vote: '투표',
  voting: '투표하기',
  voteResult: '투표 결과',
  voteDifference: {
    front: null,
    back: '표 차이',
  },
  seeMore: '자세히 알아보기',
  currentVote: '표',
  prizeTitle: {
    detail: '상세 내용',
    first: '1위 혜택 보기',
    second: '2위 혜택 보기',
    third: '3위 혜택 보기',
  },
};

export const ShareModal_Text_ko = {
  shareModalTitle: '공유하기',
  shareModalClose: '닫기',
  twitter: '트위터',
  urlShare: 'URL 복사',
  otherAppShare: '다른 앱으로 공유',
  urlCopied: 'URL이 복사되었습니다',
  check: '확인',
  shareTitleText: {
    standard: {
      front: '',
      back: '',
    },
    title0: '현재 순위는⁉',
    title1: '순위는⁉',
    title2: '순위는⁉',
  },
  shareMiddleText: {
    first: '1위',
    second: '2위',
    voteDiffFront: '단',
    voteDiffBack: '표 차이',
    current: '현재',
    place: '위',
    lessThan: '',
    moreThan: '',
    voteDiff: '',
    with: '와(과)',
    middlePageFront: '#팬플러스 투표 참여하고\n최애만을 위한 특별한 광고 선물하자 🎁🎈',
    middlePageBack: '현재 1위 : ❓❔',
  },
  shareEndText: {
    endFront: '지금 바로 #팬플러스 에서',
    endBack: '에게 투표하세요 ✊🏻✊🏻',
    endPage: '🔻실시간 순위 확인하러 가기🔻',
  },
};

export const VoteModal_Text_ko: any = ({
  freeVoteCount,
  starName,
  moreVoteCount,
}: voteModalTextProps) => {
  const modalItems = {
    voteProcess: `<span>${starName}</span>님에게<br/><b>무료로 ${freeVoteCount}표</b> 투표하시겠어요?`,
    voteDoneFirst: `<span>${starName}</span> 님에게<br/><b>무료로 ${freeVoteCount}표</b> 투표 되었어요.`,
    voteDoneEnd: `<b>팬플러스 앱에서 ${moreVoteCount}표</b> 더 투표해보세요!`,
    voteBlockFirst: `하루에 한 번 투표에 참여할 수 있어요.<br/>(매일 0시 기준으로 초기화 됩니다)`,
    voteBlockEnd: `팬플러스 앱 설치하면<br/>매일 <b>${moreVoteCount}표</b>를 드리고 있어요.`,
  };
  return modalItems;
};

export const VoteModalButton_Text_ko = {
  voteModalVote: '투표하기',
  voteModalCancel: '취소하기',
  voteModalComplete: '완료',
  voteModalInstall: '앱 설치하기',
};

export const CommunityMainText_KR: CommunityPageTextType = {
  community: '커뮤니티',
  home: '게시판 홈',
  search: '게시판 검색',
  recentlyBoards: '최근 방문한 게시판',
  recommendedBoards: '추천 게시판',
  noRecentBoardTexts: ['팬플러스는 처음 사용하시나요?', '좋아하는 스타를 검색해 보세요!'],
  buttonSearch: '검색하기',
  allCategory: '전체',
  searchPlaceholder: '원하는 게시판을 찾아보세요.',
  link: {
    board: '/ko/community/board',
  },
};
export const CommunityBoardText_KR: CommunityBoardTextType = {
  all: '전체',
  recommendCount: '추천수',
  viewCount: '조회수',
  popular: '인기',
  daysAgo: '일 전',
  hoursAgo: '시간 전',
  minsAgo: '분 전',
  bottomTabBar: {
    write: '글쓰기',
    popular: '인기글',
    myPost: '내가 쓴 글',
  },
  boardLang: {
    modalHeader: '게시글 언어 선택',
    modalExplain: '선택한 언어로 작성된 게시글만 보입니다!',
    current: '현재 사용 중인 언어필터',
    ALL: '모든 언어',
    ko: '한국어',
    en: 'English',
    ja: '日本語',
    zh: '中文(简体)',
    es: 'Español',
    vi: 'Tiếng việt',
    id: 'Bahasa Indonesia',
    zhtw: '中文(繁體)',
  },
  noPostTexts: ['게시글이 없습니다.', '제일 먼저 게시글을 남겨주세요.'],
  noMyPostTexts: ['작성된 글이 없습니다.'],
  buttonWrite: '글쓰기',
  link: {
    board: '/ko/community/board',
  },
  permissionModal: {
    noPermission: '게시글 작성 권한이 없습니다.',
    check: '확인',
  },
};

export const CommunityPostText_KR: CommunityPostTextType = {
  popular: '인기',
  post: '글',
  viewCount: '조회수',
  recommendCount: '추천수',
  recommend: '추천',
  edit: '수정',
  delete: '삭제',
  report: '신고하기',
  cancelButton: '취소',
  confirmButton: '확인',
  reportButton: '신고',
  commentRegisterPlaceholder: '댓글을 남겨주세요. (200자)',
  replyRegisterPlaceholder: '답글을 입력해 주세요. (200자)',
  askPostDelete: '게시글을 삭제하시겠어요?',
  askCommentDelete: '댓글을 삭제하시겠어요?',
  postDeleted: '게시물이 삭제되었습니다',
  commentDeleted: '댓글이 삭제되었습니다.',
  reported: '신고되었습니다.',
  reply: '답글',
  writeReply: '답글쓰기',
  register: '등록',
  orderOldest: '등록순',
  orderNewest: '최신순',
  showMoreComments: '다음 댓글 더보기',
  deleted: '삭제된 댓글입니다.',
  alreadyDeleted: '이미 삭제된 댓글입니다.',
  alreadyReportedPost: '이미 신고한 게시글입니다.',
  alreadyReportedComment: '이미 신고한 댓글입니다.',
  reportReason: '사유 선택',
  reportPostOptions: {
    option1: '개인정보 노출',
    option2: '욕설/인신공격',
    option3: '음란/선정성',
    option4: '불법정보',
    option5: '권리침해',
    option6: '기타',
  },
  reportCommentOptions: {
    option1: '스팸',
    option2: '욕설 또는 악성 콘텐츠',
  },
  reportWarning: ['허위 신고의 경우 서비스 이용제한과 같은', '불이익을 받을 수 있습니다.'],
};

export const postCommentTotalCount_KR = (totalCount: number) => {
  let result = `최신댓글 ${totalCount}개`;
  return result;
};

export const CommunityPostEditorText_KR: CommunityPostEditorTextType = {
  pageTitle: '글쓰기',
  topic: '토픽',
  title: '제목',
  content: '내용',
  cancel: '취소',
  upload: '등록',
  edit: '수정',
  titlePlaceholder: '제목을 입력해 주세요',

  modal: {
    upload: '게시물을 등록하시겠어요?',
    cancelUpload: '글쓰기를 종료하시겠어요?',
    cancelUploadSub: '글쓰기 종료 시 작성 중인 글은 삭제 됩니다.',
    edit: '게시물을 수정하시겠어요?',
    cancelEdit: '수정을 취소하시겠어요?',
    enterTitle: '제목을 입력해 주세요',
    enterContent: '내용을 입력해 주세요',

    cancel: '취소',
    check: '확인',
  },
};
