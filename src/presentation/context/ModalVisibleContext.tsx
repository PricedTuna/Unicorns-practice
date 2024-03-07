import {PropsWithChildren, createContext, useState} from 'react';
import {CrudItemResponses} from '../../infrastructure/interfaces/CrudItemResponse';

interface ModalVisibleContextProps {
  isVisibleAddModal: boolean;
  setIsVisibleAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  itemModal: CrudItemResponses | undefined;
  setItemModal: React.Dispatch<
    React.SetStateAction<CrudItemResponses | undefined>
  >;
  isVisibleSuccessModal: boolean;
  setIsVisibleSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  isVisibleErrorModal: boolean;
  setIsVisibleErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalVisibleContext = createContext(
  {} as ModalVisibleContextProps,
);

export const newCrudItemResponses = {_id: 'new', name: '', age: 0, colour: ''};

export const ModalVisibleContextProvider = ({children}: PropsWithChildren) => {
  const [isVisibleAddModal, setIsVisibleAddModal] = useState(false);
  const [itemModal, setItemModal] = useState<CrudItemResponses | undefined>();

  const [isVisibleSuccessModal, setIsVisibleSuccessModal] = useState(false);
  const [isVisibleErrorModal, setIsVisibleErrorModal] = useState(false);

  return (
    <ModalVisibleContext.Provider
      value={{
        isVisibleAddModal,
        setIsVisibleAddModal,
        itemModal,
        setItemModal,
        isVisibleSuccessModal,
        setIsVisibleSuccessModal,
        isVisibleErrorModal,
        setIsVisibleErrorModal,
      }}>
      {children}
    </ModalVisibleContext.Provider>
  );
};
