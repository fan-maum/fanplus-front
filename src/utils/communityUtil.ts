import { selectInfoType } from "@/types/common";

interface useShowModalOnClickProps extends selectInfoType {
    setModalBlock: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectInfo: React.Dispatch<React.SetStateAction<selectInfoType>>;
  }
  

export const showModalOnClick = async ({
  purpose,
  target_type,
  idx,
  setModalBlock,
  setSelectInfo,
}: useShowModalOnClickProps) => {
  await setModalBlock(true);
  await setSelectInfo({ purpose: purpose, target_type: target_type, idx: idx });
};
