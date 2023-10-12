import { useState } from 'react';

function useCopyUrl() {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const onCopy = async (text: string) => {
    if (isCopy === true) return;
    try {
      await setIsCopy(true);
      await setTimeout(() => {
        setIsCopy(false);
      }, 3000);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setIsCopy(false);

      return false;
    }
  };

  return [isCopy, onCopy] as const;
}

export default useCopyUrl;
