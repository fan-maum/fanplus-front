import { MainPageTextType } from '@/types/textTypes';
import { FC } from 'react';
import styles from './styles/MainPage.module.css';

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
            <h2>{area2.title1}</h2>
            {area2.title2 && <h2>{area2.title2}</h2>}
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
            <br />
            <p>{area2.line6}</p>
            <p>{area2.line7}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.area} ${styles.grey}`}>
        <h3>{area3.title}</h3>
        <p>{area3.line1}</p>
        <p>{area3.line2}</p>
        <br />
        <p>{area3.line3}</p>
        <p>{area3.line4}</p>
        <p>
          <b>{area3.Ad_title}</b>
        </p>
        <div className="Ad-Box" style={{ display: 'flex', flexDirection: 'row' }}>
          <p>
            <b>{area3.Ad1}</b>
          </p>
          <p>
            <b>{area3.Ad2}</b>
          </p>
          <p>
            <b>{area3.Ad3}</b>
          </p>
        </div>
      </div>
      <div className={`${styles.area} ${styles.pink}`}>
        <h3>{area4.title1}</h3>
        {area4.title2 && <h3>{area4.title2}</h3>}
        <p>{area4.line1}</p>
        <p>{area4.line2}</p>
        <p>{area4.line3}</p>
        <p>{area4.plus}</p>
      </div>
      <div className={`${styles.area} ${styles.grey}`}>
        <h3>{area5.title1}</h3>
        {area5.title2 && <h3>{area5.title2}</h3>}
        <p>{area5.line1}</p>
        <p>{area5.line2}</p>
        <p>{area5.line3}</p>
        <p>{area5.line4}</p>
        <p>{area5.plus1}</p>
        {area5.plus2 && <p>{area5.plus2}</p>}
      </div>
      <div className={`${styles.area} ${styles.pink}`}>
        <h3>{area6.title1}</h3>
        {area6.title2 && <h3>{area6.title2}</h3>}
        <p>{area6.line1}</p>
        <p>{area6.line2}</p>
        <p>{area6.line3}</p>
        <p>{area6.line4}</p>
      </div>
    </div>
  );
};

export default MainPage;
