import ReactDOM, { createRoot } from 'react-dom/client';
import SnackbarAlert from './toastMessage';

const TOAST_CONTAINER_ID = 'toast-container';

const getContainer = (id) => {
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

const renderToast = (component, container) => {
  //   ReactDOM.createRoot(component, container);
  const root = createRoot(container);
  root.render(component);
};

const unmountToast = (container, ms = 3000) => {
  setTimeout(() => {
    const root = createRoot(container);
    root.unmount();
    container.remove();
  }, ms);
};

const ToastModal = {
  alert: (message: string) => {
    const container = getContainer(TOAST_CONTAINER_ID);
    renderToast(<SnackbarAlert message={message} />, container);
    unmountToast(container);
  },
};

export default ToastModal;
