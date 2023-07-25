import { MainPageTextType } from '@/types/textTypes';
import { FC } from 'react';
import { css } from '@emotion/react';
import AppLink from '../molecules/AppLink';
import Carousel from '../organisms/Carousel';
import IconPlayStore from '../atoms/IconPlayStore';
import IconAppStore from '../atoms/IconAppStore';

const MainPageTemplate: FC<{ texts: MainPageTextType }> = ({ texts }) => {
  const area1 = texts.Area1;
  const area2 = texts.Area2;
  const area3 = texts.Area3;
  const area4 = texts.Area4;
  const area5 = texts.Area5;
  const area6 = texts.Area6;
  return (
    <div css={container}>
      <div css={area}>
        <div css={css(center, { [mediaQuery768]: { flexDirection: 'column-reverse' } })}>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              width: '60%',
              [mediaQuery768]: {
                width: '100%',
                marginTop: '30px',
                textAlign: 'center',
              },
            }}
          >
            <div css={{ alignSelf: 'center', justifySelf: 'center', margin: '0px 10px 40px' }}>
              <h1>{area1.line1}</h1>
              <h1>{area1.line2}</h1>
              {area1.line3 && <h1>{area1.line3}</h1>}
            </div>
            <div css={{ display: 'flex' }}>
              <AppLink
                storeName="Google Play"
                storeLink="https://play.google.com/store/apps/details?id=com.photocard.allstar"
                storeIcon={<IconPlayStore />}
                bgColor="#ff5656"
                bgAfterColor="#e64d4d"
                fontColor="white"
              />
              <AppLink
                storeName="App Store"
                storeLink="https://apps.apple.com/kr/app/%ED%8C%AC%ED%94%8C%EB%9F%AC%EC%8A%A4/id1448805815"
                storeIcon={<IconAppStore />}
                bgColor="white"
                bgAfterColor="#ff5656"
                fontColor="#ff5656"
              />
            </div>
          </div>
          <div css={{ width: '40%', alignSelf: 'center', [mediaQuery768]: { width: '70%' } }}>
            <img src={'/images/서비스소개_00_대표.png'} alt="" css={img} />
          </div>
        </div>
      </div>
      <div css={greyArea}>
        <div css={css(center, { flexDirection: 'column' })}>
          <div css={{ width: '75%', maxWidth: '585px', alignSelf: 'center', marginBottom: '40px' }}>
            <img src={'/images/서비스소개_00_소개.png'} alt="" css={img} />
          </div>
          <div
            css={{
              textAlign: 'center',
              alignSelf: 'center',
              p: { minHeight: '44px', lineHeight: '44px', fontSize: '22px' },
              [mediaQuery991]: { p: { minHeight: '36px', lineHeight: '36px', fontSize: '20px' } },
              [mediaQuery768]: { p: { minHeight: '30px', lineHeight: '30px', fontSize: '16px' } },
            }}
          >
            <div css={{ marginBottom: '40px' }}>
              <h2>{area2.title1}</h2>
              {area2.title2 && <h2>{area2.title2}</h2>}
            </div>
            <p>
              {area2.line1}
              <b>{area2.bold_line1}</b>
            </p>
            <p>
              <b>{area2.bold_line2_front}</b>
              {area2.line2}
              <b>{area2.bold_line2_back}</b>
            </p>
            <p>{area2.line3}</p>
            <p>{area2.line4}</p>
            <p>{area2.line5}</p>
            <p />
            <p>{area2.line6}</p>
            {area2.line7 && <p>{area2.line7}</p>}
          </div>
        </div>
      </div>
      <div css={greyArea}>
        <div css={center}>
          <div css={textBox}>
            <div className="h3Box">
              <h3>{area3.title}</h3>
            </div>
            <p>{area3.line1}</p>
            {area3.line2 && <p>{area3.line2}</p>}
            <p />
            <p>{area3.line3}</p>
            <p>{area3.line4}</p>
          </div>
          <div css={imgContainer}>
            <img src={area3.img} alt="" css={img} />
          </div>
        </div>
        <div css={center}>
          <p
            css={{
              width: '100%',
              maxWidth: '1170px',
              textAlign: 'center',
              margin: '70px auto 30px',
            }}
          >
            <b>{area3.Ad_title}</b>
          </p>
        </div>
        <div css={center}>
          <div
            css={{
              maxWidth: '1170px',
              display: 'flex',
              [mediaQuery768]: { flexDirection: 'column' },
            }}
          >
            <div css={ad}>
              <img src={'/images/서비스소개_01_미국타임스퀘어.png'} alt="" css={img} />
              <p>
                <b>{area3.Ad1}</b>
              </p>
            </div>
            <div css={ad}>
              <img src={'/images/서비스소개_01_중국닝보.png'} alt="" css={img} />
              <p>
                <b>{area3.Ad2}</b>
              </p>
            </div>
            <div css={ad}>
              <img src={'/images/서비스소개_01_인천공항.png'} alt="" css={img} />
              <p>
                <b>{area3.Ad3}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div css={pinkArea}>
        <div css={center}>
          <div css={textBox}>
            <div className="h3Box">
              <h3>{area4.title1}</h3>
              {area4.title2 && <h3>{area4.title2}</h3>}
            </div>
            <p>{area4.line1}</p>
            <p>{area4.line2}</p>
            {area4.line3 && <p>{area4.line3}</p>}
            <div css={plus}>
              <img src="/icons/icon_plus.svg" alt="" />
              <p>{area4.plus}</p>
            </div>
          </div>
          <div css={css(imgContainer, { display: 'flex' })}>
            <div css={imgSet}>
              <img src={area4.img1} alt="" />
              <img src={area4.img2} alt="" />
              <div />
            </div>
            <div css={imgSet}>
              <div />
              <img src={area4.img3} alt="" />
              <img src={area4.img4} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div css={greyArea}>
        <div css={center}>
          <div css={textBox}>
            <div className="h3Box">
              <h3>{area5.title1}</h3>
              {area5.title2 && <h3>{area5.title2}</h3>}
            </div>
            <p>{area5.line1}</p>
            <p>{area5.line2}</p>
            <p>{area5.line3}</p>
            {area5.line4 && <p>{area5.line4}</p>}
            <div css={plus}>
              <img src="/icons/icon_plus.svg" alt="" />
              <div>
                <p>{area5.plus1}</p>
                {area5.plus2 && <p>{area5.plus2}</p>}
              </div>
            </div>
          </div>
          <div css={imgContainer}>
            <Carousel
              imgLinks={{ img1: area5.img1, img2: area5.img2, img3: area5.img3, img4: area5.img4 }}
            />
          </div>
        </div>
      </div>
      <div css={pinkArea}>
        <div css={center}>
          <div css={textBox}>
            <div className="h3Box">
              <h3>{area6.title1}</h3>
              {area6.title2 && <h3>{area6.title2}</h3>}
            </div>
            <p>{area6.line1}</p>
            <p>{area6.line2}</p>
            <p></p>
            <p>{area6.line3}</p>
            <p>{area6.line4}</p>
          </div>
          <div css={css(imgContainer, { display: 'flex' })}>
            <div css={imgContainer2}>
              <img src={area6.img1} alt="" css={img} />
            </div>
            <div css={imgContainer2}>
              <img src={area6.img2} alt="" css={img} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageTemplate;

//** css 속성 */
const mediaQuery768 = '@media screen and (max-width: 768px)';
const mediaQuery991 = '@media screen and (max-width: 991px)';
const container = css({
  fontSize: '20px',
  color: 'rgb(51,51,51)',
  wordBreak: 'break-word',
  h1: {
    fontSize: '56px',
    wordBreak: 'keep-all',
  },
  h2: {
    fontSize: '44px',
    wordBreak: 'keep-all',
  },
  h3: {
    fontSize: '40px',
    wordBreak: 'keep-all',
  },
  [mediaQuery991]: {
    h1: { fontSize: '44px' },
    h2: { fontSize: '36px' },
    h3: { fontSize: '32px' },
    p: { fontSize: '18px' },
  },
  [mediaQuery768]: {
    h1: { fontSize: '34px' },
    h2: { fontSize: '30px' },
    h3: { fontSize: '30px' },
    p: { fontSize: '16px' },
  },
});
const area = css({ padding: '100px 0px', [mediaQuery991]: { padding: '80px 10px' } });
const pinkArea = css(area, { backgroundColor: '#fff5f5' });
const greyArea = css(area, { backgroundColor: '#fafbfd' });
const center = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0px auto',
  maxWidth: '1170px',
  [mediaQuery768]: {
    flexDirection: 'column',
  },
});
const img = css({ width: '100%' });
const imgSet = css({
  display: 'flex',
  width: '50%',
  flexDirection: 'column',
  img: { margin: '15px 10px' },
  div: { width: '100%', aspectRatio: '6/1' },
});
const imgContainer = css({
  width: '50%',
  maxWidth: '585px',
  padding: '10px',
  [mediaQuery768]: { width: '100%', alignSelf: 'center' },
});
const imgContainer2 = css({
  width: '50%',
  padding: '0px 10px 10px',
  [mediaQuery768]: { padding: '0px 5px 5px' },
});
const ad = css({
  flex: '1 1 0',
  padding: '10px',
  img: { padding: '12px' },
  p: { margin: '10px', textAlign: 'center' },
});
const plus = css({
  margin: '40px 10px 0px',
  display: 'flex',
  alignItems: 'center',
  img: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  },
  p: { fontSize: '16px' },
  [mediaQuery768]: { p: { fontSize: '14px' } },
});
const textBox = css({
  width: '50%',
  maxWidth: '585px',
  alignSelf: 'center',
  padding: '10px',
  '> .h3Box': {
    margin: '0px 20px 40px 10px',
  },
  '> p': {
    minHeight: '36px',
    lineHeight: '36px',
    fontSize: '20px',
    margin: '0px 20px 0px 10px',
  },
  [mediaQuery768]: {
    width: '100%',
    marginBottom: '40px',
    '> .h3Box': {
      margin: '0px 0px 40px',
    },
    '> p': {
      margin: '0px',
      minHeight: '30px',
      lineHeight: '30px',
    },
  },
});
