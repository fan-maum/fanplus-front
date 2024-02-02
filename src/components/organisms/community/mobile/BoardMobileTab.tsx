// import React, { useRef } from 'react';
// import styled, { css } from 'styled-components';
// import { useRouter } from 'next/router';
// import { SliderHorizontal } from 'app.components/scroll/SliderScrollHorizontal';
// import { useGqlBoardBaseQuery, useGqlBoardBySlugQuery } from 'app.modules/graphql/gqlGenerated';
// import BoardMobileTitle from '../title/BoardMobileTitle';
// import BoardMobileTabAllMenu from 'app.feature/board/boardMain/component/mobile/BoardMobileTabAllMenu';
// import useTheme from 'app.hooks/useTheme';
// import BoardMobileTabItem from './BoardMobileTabItem';
// import { PostSearchField } from 'app.modules/graphql/typeGenerated';
// import BoardMobileTabMenus from './BoardMobileTabMenus';

// const BoardMobileTab = () => {
//   const router = useRouter();
//   if (router.pathname !== '/' && (!router.query.boardSlug || router.pathname.includes('write'))) {
//     return null;
//   }

//   const isSpecialPage = ['community', 'bookmark', 'best', 'bestofbest', 'notice'].includes(
//     boardSlug as string
//   );
//   const bookmarkTabActive = boardSlug === 'bookmark';
//   const allTabActive =
//     boardSlug === 'community' || domain === '전체글' || (!isSpecialPage && !domain);
//   const popularTabActive = boardSlug === 'best' || domain === '인기글';
//   const noticeTabActive = boardSlug === 'notice' || domain === '공지';

//   const onBookmarkTabClick = () => {
//     router.push('/bookmark');
//   };

//   const onAllTabClick = () => {
//     isSpecialPage
//       ? router.push('/community')
//       : router.push({
//           pathname: `/${boardSlug}`,
//           query: { domain: '전체글' },
//         });
//   };

//   const onPopularTabClick = () => {
//     isSpecialPage
//       ? router.push('/best')
//       : router.push({
//           pathname: `/${boardSlug}`,
//           query: { domain: '인기글' },
//         });
//   };

//   const onNoticeTabClick = () => {
//     isSpecialPage
//       ? router.push('/notice')
//       : router.push({
//           pathname: `/${boardSlug}`,
//           query: { domain: '공지' },
//         });
//   };

//   return (
//     <StyledWrapper isDarkMode={isDarkMode}>
//       <BoardMobileTitle boardBySlug={boardBySlug} />
//       <div className="boardMobileTabAllMenu-wrapper">
//         <BoardMobileTabMenus setOpenSidebar={setOpenSidebar} />
//         <DomainTopicContainer
//           isMobile={true}
//           boardType={router.query.boardIndex as string}
//           viewType={view_type}
//           boardLang={boardLang}
//           communityBoardTopics={communityBoardTopics}
//           topicIndex={topicIndex}
//           setLangModal={setLangModal}
//         />
//         <SliderHorizontal.Wrap scrollRef={containerRef}>
//           <SliderHorizontal.View>
//             <BoardMobileTabItem
//               domain="즐겨찾기"
//               active={bookmarkTabActive}
//               onClick={onBookmarkTabClick}
//             />
//           </SliderHorizontal.View>
//           <SliderHorizontal.View>
//             <BoardMobileTabItem domain="전체글" active={allTabActive} onClick={onAllTabClick} />
//           </SliderHorizontal.View>
//           <SliderHorizontal.View>
//             <BoardMobileTabItem
//               domain="인기글"
//               active={popularTabActive}
//               onClick={onPopularTabClick}
//             />
//           </SliderHorizontal.View>
//           <SliderHorizontal.View>
//             <BoardMobileTabItem
//               domain="공지사항"
//               active={noticeTabActive}
//               onClick={onNoticeTabClick}
//             />
//           </SliderHorizontal.View>
//         </SliderHorizontal.Wrap>
//       </div>
//     </StyledWrapper>
//   );
// };

// export default BoardMobileTab;

// const StyledWrapper: any = styled.div`
//   ${({ isDarkMode }: any) => css`
//     display: none;

//     @media screen and (max-width: 768px) {
//       display: flex;
//       align-items: center;
//       background-color: var(--color-background);
//       flex-direction: column;
//       justify-content: flex-start;
//       align-items: flex-start;

//       .boardMobileTabAllMenu-wrapper {
//         width: 100%;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//       }

//       .menu-wrapper[data-active='true'] {
//         border-bottom: ${isDarkMode ? '2px solid #fff' : '2px solid var(--color-primary)'};
//       }

//       .menu-wrapper {
//         font-size: 14px;
//         color: #918f8f;
//         font-weight: 500;
//         padding: 10px 0;
//         cursor: pointer;

//         span[data-active='true'] {
//           color: ${isDarkMode ? '#fff' : 'var(--color-primary)'};
//           font-size: 14px;
//           font-weight: bold;
//         }
//       }
//     }
//   `}
// `;
