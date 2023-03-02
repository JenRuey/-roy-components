import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { createListener } from "../../functions/listener-utils";

interface ModalListenerType {
  title: string;
  content: (close: () => void) => React.ReactNode;
}

const initaldata: ModalListenerType = { title: "Modal Title", content: () => "Loading ..." };

const current = createListener<ModalListenerType>();

function Container() {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<ModalListenerType>(initaldata);

  const closeModal = useCallback(() => {
    setVisible(false);
    setData(initaldata);
  }, []);

  useEffect(() => {
    const modalEvent = ({ detail }: CustomEvent<ModalListenerType>) => {
      setData(detail);
      setVisible(true);
    };

    current.init(modalEvent);

    return () => {
      current.unmount();
    };
  }, []);

  return (
    <Modal show={visible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      {data.content(closeModal)}
    </Modal>
  );
}

const RYModal = { Container, trigger: current.fire };

export default RYModal;
