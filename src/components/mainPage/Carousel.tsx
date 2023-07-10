import { useState } from 'react';
import styles from './styles/Carousel.module.css';
import { css } from '@emotion/react';
import CircleIcon from './CircleIcon';
import { TouchEvent } from 'react';

const Carousel = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [translation, setTranslation] = useState('');
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const handleClick = (index: number = 0) => {
    setCurrIndex(index);
    setTranslation(`transform: translateX(${-index * 20}%);`);
  };
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchPosition({
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
    });
  };
  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const distanceX = Math.abs(touchPosition.x - e.changedTouches[0].pageX);
    const distanceY = Math.abs(touchPosition.y - e.changedTouches[0].pageY);

    if (distanceY + distanceX > 30 && distanceX > distanceY) {
      if (touchPosition.x - e.changedTouches[0].pageX < 0 && currIndex > 0) {
        handleClick(currIndex - 1);
      } else if (touchPosition.x - e.changedTouches[0].pageX > 0 && currIndex < 3) {
        handleClick(currIndex + 1);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.imageContainer}
          css={css(translation)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img src="/images/서비스소개_03_보유배지-1.png" alt="보유배지"></img>
          <img src="/images/서비스소개_03_프로필-1.png" alt="프로필"></img>
          <img src="/images/서비스소개_03_미션배지상세-1.png" alt="미션배지"></img>
          <img src="/images/서비스소개_03_업적배지상세-1.png" alt="업적배지"></img>
          <img src="/images/서비스소개_03_보유배지-1.png" alt="보유배지"></img>
        </div>
      </div>
      <div className={styles.buttons}>
        <span onClick={() => handleClick(0)}>
          <CircleIcon fill={currIndex === 0 ? 'black' : 'none'} />
        </span>
        <span onClick={() => handleClick(1)}>
          <CircleIcon fill={currIndex === 1 ? 'black' : 'none'} />
        </span>
        <span onClick={() => handleClick(2)}>
          <CircleIcon fill={currIndex === 2 ? 'black' : 'none'} />
        </span>
        <span onClick={() => handleClick(3)}>
          <CircleIcon fill={currIndex === 3 ? 'black' : 'none'} />
        </span>
      </div>
    </>
  );
};

export default Carousel;
