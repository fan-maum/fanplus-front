import { MainPageTextType } from '@/types/textTypes';
import { FC } from 'react';
import styles from './styles/MainPage.module.css';
import AppLink from './AppLink';
import Carousel from './Carousel';

const MainPage: FC<{ texts: MainPageTextType }> = ({ texts }) => {
  const area1 = texts.Area1;
  const area2 = texts.Area2;
  const area3 = texts.Area3;
  const area4 = texts.Area4;
  const area5 = texts.Area5;
  const area6 = texts.Area6;
  return (
    <div className={styles.container}>
      <div className={`${styles.area}`}>
        <div className={`${styles.center} ${styles.change}`}>
          <div className={styles.textBox}>
            <div className={styles.text1}>
              <h1>{area1.line1}</h1>
              <h1>{area1.line2}</h1>
              {area1.line3 && <h1>{area1.line3}</h1>}
            </div>
            <div className={styles.appLinkContainer}>
              <AppLink
                icon="/icons/play_store_logo.svg"
                storeName="Google Play"
                storeLink="https://play.google.com/store/apps/details?id=com.photocard.allstar"
                bgColor="#ff5656"
                fontColor="white"
              />
              <AppLink
                icon="/icons/app_store_logo.svg"
                storeName="App Store"
                storeLink="https://apps.apple.com/kr/app/%ED%8C%AC%ED%94%8C%EB%9F%AC%EC%8A%A4/id1448805815"
                bgColor="white"
                fontColor="#ff5656"
              />
            </div>
          </div>
          <div className={styles.imgContainer1}>
            <img src={'/images/서비스소개_00_대표.png'} alt="" className={styles.img1} />
          </div>
        </div>
      </div>
      <div className={`${styles.area} ${styles.grey}`}>
        <div className={`${styles.center} ${styles.flex_col}`}>
          <div className={styles.imgContainer2}>
            <img src={'/images/서비스소개_00_소개.png'} alt="" className={styles.img2} />
          </div>
          <div className={styles.text2}>
            <div className={styles.h2}>
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
            <p>{area2.line7}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.area} ${styles.grey}`}>
        <div className={`${styles.center}`}>
          <div className={styles.text3}>
            <div className={styles.h3}>
              <h3>{area3.title}</h3>
            </div>
            <p>{area3.line1}</p>
            {area3.line2 && <p>{area3.line2}</p>}
            <p />
            <p>{area3.line3}</p>
            <p>{area3.line4}</p>
          </div>
          <div className={styles.imgContainer3}>
            <img src={area3.img} alt="" className={styles.img2} />
          </div>
        </div>
        <div className={styles.center}>
          <p className={styles.adTitle}>
            <b>{area3.Ad_title}</b>
          </p>
        </div>
        <div className={styles.center}>
          <div className={styles.adBox}>
            <div className={styles.ad}>
              <img
                src={'/images/서비스소개_01_미국타임스퀘어.png'}
                alt=""
                className={styles.img2}
              />
              <p>
                <b>{area3.Ad1}</b>
              </p>
            </div>
            <div className={styles.ad}>
              <img src={'/images/서비스소개_01_중국닝보.png'} alt="" className={styles.img2} />
              <p>
                <b>{area3.Ad2}</b>
              </p>
            </div>
            <div className={styles.ad}>
              <img src={'/images/서비스소개_01_인천공항.png'} alt="" className={styles.img2} />
              <p>
                <b>{area3.Ad3}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.area} ${styles.pink}`}>
        <div className={styles.center}>
          <div className={styles.text3}>
            <div className={styles.h3}>
              <h3>{area4.title1}</h3>
              {area4.title2 && <h3>{area4.title2}</h3>}
            </div>
            <p>{area4.line1}</p>
            <p>{area4.line2}</p>
            {area4.line3 && <p>{area4.line3}</p>}
            <div className={styles.plus}>
              <img src="/icons/icon_plus.svg" alt="" className={styles.plus_icon} />
              <p>{area4.plus}</p>
            </div>
          </div>
          <div className={`${styles.imgContainer3} ${styles.flex}`}>
            <div className={styles.imgSet}>
              <img src={area4.img1} alt="" className={styles.img4} />
              <img src={area4.img2} alt="" className={styles.img4} />
              <div className={styles.blank}></div>
            </div>
            <div className={styles.imgSet}>
              <div className={styles.blank}></div>
              <img src={area4.img3} alt="" className={styles.img4} />
              <img src={area4.img4} alt="" className={styles.img4} />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.area} ${styles.grey}`}>
        <div className={styles.center}>
          <div className={styles.text3}>
            <div className={styles.h3}>
              <h3>{area5.title1}</h3>
              {area5.title2 && <h3>{area5.title2}</h3>}
            </div>
            <p>{area5.line1}</p>
            <p>{area5.line2}</p>
            <p>{area5.line3}</p>
            {area5.line4 && <p>{area5.line4}</p>}
            <div className={styles.plus}>
              <img src="/icons/icon_plus.svg" alt="" className={styles.plus_icon} />
              <div>
                <p>{area5.plus1}</p>
                {area5.plus2 && <p>{area5.plus2}</p>}
              </div>
            </div>
          </div>
          <div className={styles.imgContainer3}>
            <Carousel
              imgLinks={{ img1: area5.img1, img2: area5.img2, img3: area5.img3, img4: area5.img4 }}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.area} ${styles.pink}`}>
        <div className={styles.center}>
          <div className={styles.text3}>
            <div className={styles.h3}>
              <h3>{area6.title1}</h3>
              {area6.title2 && <h3>{area6.title2}</h3>}
            </div>
            <p>{area6.line1}</p>
            <p>{area6.line2}</p>
            <p></p>
            <p>{area6.line3}</p>
            <p>{area6.line4}</p>
          </div>
          <div className={styles.imgContainer3} style={{ display: 'flex' }}>
            <div className={styles.imgContainer6}>
              <img src={area6.img1} alt="" className={styles.img2} />
            </div>
            <div className={styles.imgContainer6}>
              <img src={area6.img2} alt="" className={styles.img2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
