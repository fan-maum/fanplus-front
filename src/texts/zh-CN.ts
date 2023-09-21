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

export const NavBarText_zh_CN: NavBarTextType = {
  vote: '投票',
  community: '社区',
  aboutUs: '服务介绍',
  recruit: '',
  business: '商务咨询',
  language: '中文(简体)',
  link: {
    vote: '/zh-CN/votes',
    community: '/zh-CN/community',
    aboutUs: '/zh-CN',
    business: '/zh-CN/business',
    faq: '/zh-CN/faq',
  },
};
export const FooterText_zh_CN: FooterTextType = {
  customerService: '客户服务中心',
  emailButton: '咨询',
  termsOfService: 'Terms of service',
  termsOfServiceLink: 'https://privacy.fanplus.co.kr/terms_of_service.html',
  privacyPolicy: 'Privacy Policy',
  privacyPolicyLink: 'https://privacy.fanplus.co.kr/privacy.html',
  introduction: '10F 17-6, Yeoksam-ro 3-gil, Gangnam-gu, Seoul, Korea',
  copyright: 'Copyright © FanPlus. All Rights Reserved.',
};
export const MainPageText_zh_CN: MainPageTextType = {
  Area1: {
    line1: '在追星的快乐中,',
    line2: '加上Fanplus',
    line3: '',
  },
  Area2: {
    title1: '单独或一起, 多种快乐的追星方法',
    title2: '',
    line1: 'Fanplus正在考虑,',
    bold_line1: '',
    bold_line2_front: '',
    line2: '如何让最活跃的',
    bold_line2_back: '粉丝之间更加快乐地追星。',
    line3: '从免费投票的APP开始,',
    line4: '为了让粉丝们可以一起体会追星的快乐，',
    line5: 'Fanplus正在打造属于自己的追星空间。',
    line6: '结识与自己心心相通的歌迷, 在追星中增添更多的快乐。',
    line7: '',
  },
  Area3: {
    title: '01 让我的最爱成为主人公',
    line1: '每月查看新主题的相关投票。',
    line2: '',
    line3: '参加Fanplus的独家免费投票,',
    line4: '给最喜爱的明星做全球广告。',
    Ad_title: '[Fanplus投票冠军广告商品]',
    Ad1: '美国时代广场',
    Ad2: '中国宁波',
    Ad3: '韩国仁川机场',
    img: '/images/서비스소개_01_투표썸네일_en.png',
  },
  Area4: {
    title1: '02 实时追星信息',
    title2: '',
    line1: '最爱偶像的高清图片附加欣赏王道文！',
    line2: '与自己最爱相同的粉丝分享各种信息。',
    line3: '',
    plus: '请访问活跃的公告栏。',
    img1: '/images/서비스소개_02_게시판_zh-cn.png',
    img2: '/images/서비스소개_02_사진_zh-cn.png',
    img3: '/images/서비스소개_02_팬픽_zh-cn.png',
    img4: '/images/서비스소개_02_왕중왕전랭킹_zh-cn.png',
  },
  Area5: {
    title1: '03 追星，您做过哪些?',
    title2: '',
    line1: '追星积攒Fanplus独特的活动徽章！',
    line2: '与收集徽章的乐趣一起,',
    line3: '了解自己对最爱偶像的追逐热情。',
    line4: '',
    plus1: '如果您查看其他人的活动徽章时,',
    plus2: '还可以知道他们的追星趋向。',
    img1: '/images/서비스소개_03_보유배지_zh-cn.png',
    img2: '/images/서비스소개_03_프로필_zh-cn.png',
    img3: '/images/서비스소개_03_미션배지상세_zh-cn.png',
    img4: '/images/서비스소개_03_업적배지상세_zh-cn.png',
  },
  Area6: {
    title1: '04 一起追星更加快乐',
    title2: '',
    line1: '发现与自己追星趋势相似的朋友？',
    line2: '在实时聊天中, 分享您最爱偶像的点点滴滴',
    line3: '您知道吗？',
    line4: '您或许能在Fanplus中遇到人生的追星盟友呢！',
    img1: '/images/서비스소개_04_친구_zh-cn.png',
    img2: '/images/서비스소개_04_채팅_zh-cn.png',
  },
};
export const BusinessText_zh_CN: BusinessPageTextType = {
  title: '随时欢迎您咨询业务合作。',
  content:
    '希望与Fanplus商务合作的个人/公司请先填写您的提案内容, 审核后将与您联系。 该提案仅用于内容审核。',
  form: {
    company: '公司名称（必填）',
    officer: '负责人姓名（必填）',
    email: '邮箱（必填）',
    message: '咨询内容',
    button: '咨询',
  },
};
export const FAQText_zh_CN: FAQPageTextType = {
  header: '您需要什么帮助？',
  navBar: {
    all: '全部',
    vote: '投票',
    photos: '图片',
    fanfic: '王道文',
    accounts: '账户',
  },
  q1: 'Fanplus提供怎样的服务?',
  a1: 'Fanplus是以最爱偶像相同的粉丝为对象, 提供多样化信息和通讯功能的全面追星的应用程序。 唯一在生日/纪念日可以免费为偶像投票。 在Fanplus中体验追星的快乐。',
  q2: '如何参加投票？',
  a2: '您可以通过应用内出勤签到和邀请好友获得金币, 且无需付费。 将您获得的金币兑换为投票券后, 为您最喜欢的偶像投票。',
  q3: '广告何时/如何投放？',
  a3: '每月以生日/周年纪念日投票和按主题投票进行。 根据投票结果, 广告将以在粉丝提交的素材中, 获得票数最多的素材进行投放。',
  q4: '什么时候开始准备投票？',
  a4: '投票于相应生日的2个月前开始进行。 主题投票通过Twitter公布候选人, 请参阅公告。 转到Fanplus Twitter',
  twitter: '推特(Twitter)',
  q5: '如何使用图片功能？',
  a5: '查看并下载和自己的最爱偶像相同的粉丝上传发布的图片。 如果有喜欢的图片，可以直接设置成墙纸。',
  q6: '什么是视觉王道文？',
  a6: '与现有的线型幻想不同, 它是一种以背景/角色/台词组成的场面（场景）作为故事情节的方式进行。',
  q7: '',
  a7: '',
  q8: '注销Fanplus后, 什么时候可以重新注册?',
  a8: '注销后可以立即重新注册。 只是, 为了防止滥用, 与注销账户相同的昵称/账户地址/已认证的号码, 自注销日起, 90天内无法再申请注册。',
  q9: '注销后什么时候可以重新认证相同的号码？',
  a9: '被已注销账户验证过的号码, 自注销日起, 90天以后, 可以重新用于号码验证。',
};
export const LoginPageText_zh_CN: LoginPageTextType = {
  heading: 'FanPlus登录',
  line1: '需要登录。您现在要登录吗？',
  appleButton: '使用Apple 账号登陆',
  googleButton: '使用Google 账号登陆',
  modal: {
    text1: '您无法在此浏览器中使用谷歌(Google)登录。',
    text2AOS: '请复制URL并在 Chrome浏览器进行',
    text2IOS: '请复制URL并在 Safari或 Chrome浏览器进行',
    copyUrl: '复制 URL',
    close: '关闭',
  },
};
export const SignUpPageText_zh_CN: SignUpPageTextType = {
  heading: '用户协议',
  line1: '为顺利使用该服务，请同意条款。',
  agree1: '我是14岁及以上 (必选)',
  agree2: '服务条款 (必选)',
  agree3: '个人隐私政策 (必选)',
  agree4: '第三方隐私政策 (必选)',
  detail: '查看详情',
  start: '开始',
  agreeAll: '全部同意',
  agree2Link: 'https://privacy.fanplus.co.kr/terms_of_service.html',
  agree3Link: 'https://privacy.fanplus.co.kr/privacy.html',
  agree4Link: 'https://privacy.fanplus.co.kr/thrid_parties.html',
};

export const Votes_Text_zh = {
  voteEnd: '距离投票截止还有',
  voteFinished: '投票已结束',
  voteStart: '离公开投票还有一段距离',
  tab: {
    all: 'ALL',
    bday: '生日投票',
    league: '联赛',
  },
  winner: '1位',
  daysAgo: '天',
  hoursAgo: '小时',
  minutesAgo: '分',
};

export const VoteDetail_Text_zh = {
  vote: '投票',
  voting: '投票',
  voteResult: '投票结果',
  voteDifference: {
    front: null,
    back: '票差距!',
  },
  seeMore: '查看详情',
  currentVote: '票',
  prizeTitle: {
    detail: '详细内容',
    first: '查看第1名奖励',
    second: '查看第2名奖励',
    third: '查看第3名奖励',
  },
};

export const ShareModal_Text_zh = {
  shareModalTitle: '分享',
  shareModalClose: '关闭',
  twitter: 'Twitter',
  urlShare: '复制URL',
  otherAppShare: '共享到其他应用',
  urlCopied: 'URL已复制',
  check: '确认',
  shareTitleText: {
    standard: {
      front: '',
      back: '基准',
    },
    title0: '现在排名⁉',
    title1: '排名是⁉',
    title2: '排名是⁉',
  },
  shareMiddleText: {
    first: '1位',
    second: '2位',
    voteDiffFront: '仅',
    voteDiffBack: '票差',
    current: '现在是第',
    place: '位',
    lessThan: '',
    moreThan: '',
    voteDiff: '与第',
    with: '',
    middlePageFront: '参加 #FanPlus 投票\n给最爱的偶像送上特别的礼物 🎁🎈',
    middlePageBack: '现在第1位 : ❓❔',
  },
  shareEndText: {
    endFront: '现在即刻 #在FanPlus上给',
    endBack: '投票吧 ✊🏻✊🏻',
    endPage: '🔻查看实时排名🔻',
  },
};

export const VoteModal_Text_zh: any = ({
  freeVoteCount,
  starName,
  moreVoteCount,
}: voteModalTextProps) => {
  const modalItems = {
    voteProcess: `您想给<span>${starName}</span>免费投票吗？`,
    voteDoneFirst: `给<span>${starName}</span>投票了。`,
    voteDoneEnd: `请在FanPlus应用投<b>${moreVoteCount}</b>票`,
    voteBlockFirst: `您每天只能参与一次投票。<br/>(免费投票00:00 KST重新设置)`,
    voteBlockEnd: `下载FanPlus,<br/>每天赠送<b>${moreVoteCount}</b>票。`,
  };
  return modalItems;
};

export const VoteModalButton_Text_zh = {
  voteModalVote: '投票',
  voteModalCancel: '取消',
  voteModalComplete: '完成',
  voteModalInstall: '下载APP',
};

export const CommunityMainText_zh_CN: CommunityPageTextType = {
  community: '社区',
  home: '消息面板主页',
  search: '搜索消息面板',
  recentlyBoards: '最近浏览的消息面板',
  recommendedBoards: '推荐的消息面板',
  noRecentBoardTexts: ['您是FanPlus新手吗？', '搜索你最喜欢的明星！'],
  buttonSearch: '搜索',
  allCategory: '全部',
  searchPlaceholder: '找到您想要的消息面板',
  link: {
    board: '/zh-CN/community/board',
  },
};
export const CommunityBoardText_zh_CN: CommunityBoardTextType = {
  all: '全部',
  recommendCount: '推荐',
  viewCount: '阅读数',
  popular: '人气',
  daysAgo: '日 前',
  hoursAgo: '小时 前',
  minsAgo: '分钟 前',
  bottomTabBar: {
    write: '发帖子',
    popular: '热门文章',
    myPost: '我发的贴子',
  },
  boardLang: {
    modalHeader: '帖子 语言设定',
    modalExplain: '您只能看到以所选语言撰写的帖子',
    current: '当前使用的语言',
    ALL: '全部语言',
    ko: '한국어',
    en: 'English',
    ja: '日本語',
    zh: '中文(简体)',
    es: 'Español',
    vi: 'Tiếng việt',
    id: 'Bahasa Indonesia',
    zhtw: '中文(繁體)',
  },
  noPostTexts: ['没有帖子。', '成为第一个发表帖子的人'],
  noMyPostTexts: ['没有帖子。'],
  buttonWrite: '发帖子',
  link: {
    board: '/zh-CN/community/board',
  },
};

export const CommunityPostText_zh_CN: CommunityPostTextType = {
  popular: '人气',
  post: '帖子',
  viewCount: '阅读数',
  recommendCount: '推荐',
  recommend: '推荐',
  edit: '修改',
  delete: '删除',
  report: '举报',
  cancelButton: '取消',
  confirmButton: '确认',
  reportButton: '举报',
  commentRegisterPlaceholder: '请发表评论。（200字）',
  replyRegisterPlaceholder: '请输入评论。（200字）',
  askPostDelete: '您要删除该帖子吗？',
  askPostDeleteMsg: '删除帖子时，帖子内容和评论都将被删除。',
  askCommentDelete: '确认删除评论吗?',
  postDeleted: '帖子已删除',
  commentDeleted: '评论已删除',
  reported: '已经举报。',
  reply: '回复',
  writeReply: '写回复',
  register: '上传',
  orderOldest: '登录顺序',
  orderNewest: '最新顺序',
  showMoreComments: '阅读更多评论',
  deleted: '已被删除的评论',
  alreadyDeleted: '已被删除的评论。',
  alreadyReportedPost: '这篇文章已被举报。',
  alreadyReportedComment: '您已经报告了一个评论',
  reportReason: '请选择举报原因。',
  reportPostOptions: {
    option1: '个人信息曝光',
    option2: '亵渎/人身攻击',
    option3: '淫秽/煽情性',
    option4: '非法信息',
    option5: '侵权投诉',
    option6: '其他',
  },
  reportCommentOptions: {
    option1: '垃圾信息',
    option2: '淫秽或恶意内容',
  },
  reportWarning: [
    '举报内容将根据运营政策和使用条款进行处理。',
    '如果是虚假举报，则可能会限制举报人对服务的使用。',
  ],
  daysAgo: '日 前',
  hoursAgo: '小时 前',
  minsAgo: '分钟 前',
};

export const postCommentTotalCount_zh_CN = (totalCount: number) => {
  let result = `${totalCount} 条最新评论`;
  return result;
};
