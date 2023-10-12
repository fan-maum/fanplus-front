import { Root, createRoot } from 'react-dom/client';
import ToastMessage from './ToastMessage';

const TOAST_CONTAINER_ID = 'toast-container';

const getContainer = (id: string) => {
  let container = document.getElementById(id);

  if (!container) {
    container = document.createElement('div');
    container.id = id;
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    document.body.appendChild(container);
  }

  return container;
};

const renderToast = (children: any, root: Root) => {
  root.render(children);
};

const unmountToast = (container: HTMLElement, root: Root, ms = 3000) => {
  setTimeout(() => {
    root.unmount();
    container.remove();
  }, ms);
};

const ToastModal = {
  alert: (message: string) => {
    const container = getContainer(TOAST_CONTAINER_ID);
    const root = createRoot(container);
    renderToast(<ToastMessage message={message} />, root);
    unmountToast(container, root);
  },
};

export default ToastModal;
