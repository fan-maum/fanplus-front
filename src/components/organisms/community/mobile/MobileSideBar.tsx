import { useState, cloneElement, useEffect } from 'react';
import styled from '@emotion/styled';

type TSideContentProps = {
  visible: boolean;
  children: any;
  onClose: () => void;
};

const MobileSideBar = ({ visible, children, onClose }: TSideContentProps) => {
  const [open, setOpen] = useState<boolean>(visible);
  const handleClose = () => setOpen(false);
  const handleAnimationEnd = () => {
    !open && onClose && onClose();
  };

  const dynamicClassName = '__body_pointer_disabled';

  const bodyScrollEvent = {
    disable: () => {
      document.body.classList.add(dynamicClassName);
    },

    enable: () => {
      document.body.classList.remove(dynamicClassName);
    },
  };

  //   useEffect(() => {
  //     bodyScrollEvent[open ? 'disable' : 'enable']();
  //     return () => bodyScrollEvent.enable();
  //   }, [open]);

  if (!visible) return null;

  return (
    <StyledSideMenuContentWrapper>
      <StyledSideMenuMask className={`sidenav-mask sidenav-mask-${open}`} onClick={handleClose} />
      <div className={`sidenav-body sidenav-body-${open}`} onAnimationEnd={handleAnimationEnd}>
        {cloneElement(children, { onClose: handleClose })}
      </div>
    </StyledSideMenuContentWrapper>
  );
};

export default MobileSideBar;

export const StyledSideMenuContentWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 999;

  .sidenav-body {
    position: absolute;
    left: -100%;
    bottom: 0;
    height: 100%;
    color: #383838;
    background: var(--color-background);
    overflow-y: auto;
    z-index: 102;

    > span {
      color: var(--color-light-100);
    }
  }

  .sidenav-body-true {
    animation: sidenav-body-content-right forwards;
    animation-duration: 0.3s;
  }

  .sidenav-body-false {
    animation: sidenav-body-content-left forwards;
    animation-duration: 0.3s;
  }

  @keyframes sidenav-body-content-right {
    from {
      left: -100%;
    }
    to {
      left: 0;
    }
  }

  @keyframes sidenav-body-content-left {
    from {
      left: 0;
    }
    to {
      left: -100%;
    }
  }
`;

export const StyledSideMenuMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 101;

  &.sidenav-mask-true {
    animation: sidenav-body-mask-view linear forwards;
    animation-duration: 0.3s;
  }

  &.sidenav-mask-false {
    animation: sidenav-body-mask-view-out linear forwards;
    animation-duration: 0.3s;
  }

  @keyframes sidenav-body-mask-view {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes sidenav-body-mask-view-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
