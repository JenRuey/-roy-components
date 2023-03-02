import "bootstrap/dist/css/bootstrap.min.css";
import React, { MouseEvent, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { createListener } from "../../functions";

const ModalStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(94, 110, 141, 0.9);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: opacity 0.3s 0s, visibility 0s 0.3s;
  -moz-transition: opacity 0.3s 0s, visibility 0s 0.3s;
  transition: opacity 0.3s 0s, visibility 0s 0.3s;
  z-index: 1000;

  > .modal-body {
    position: relative;
    width: 90%;
    max-width: 400px;
    margin: 4em auto;
    padding: 24px 16px 0 !important;
    background: #fff;
    border-radius: 0.25em 0.25em 0.4em 0.4em;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    -webkit-transform: translateY(-40px);
    -moz-transform: translateY(-40px);
    -ms-transform: translateY(-40px);
    -o-transform: translateY(-40px);
    transform: translateY(-40px);
    /* Force Hardware Acceleration in WebKit */
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    -moz-transition-duration: 0.3s;
    transition-duration: 0.3s;

    .close-icon {
      position: absolute;
      top: 12px;
      right: 12px;
      color: #8f9cb5;
    }

    .modal-button-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 -16px !important;
      > div {
        flex: 1;
        text-align: center;
        padding: 16px 0;
        background-color: var(--bs-btn-bg);
        color: var(--bs-btn-color);
      }
      > div:first-child {
        border-bottom-left-radius: 0.25em;
      }
      > div:last-child {
        border-bottom-right-radius: 0.25em;
      }
    }
  }

  &.visible {
    opacity: 1;
    visibility: visible;
    -webkit-transition: opacity 0.3s 0s, visibility 0s 0s;
    -moz-transition: opacity 0.3s 0s, visibility 0s 0s;
    transition: opacity 0.3s 0s, visibility 0s 0s;

    > .modal-body {
      -webkit-transform: translateY(0);
      -moz-transform: translateY(0);
      -ms-transform: translateY(0);
      -o-transform: translateY(0);
      transform: translateY(0);
    }
  }

  @media only screen and (min-width: 1170px) {
    > .modal-body {
      margin: 8em auto;
    }
  }
`;

type AlertButtonType = {
  title: string;
  theme: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
};
type AlertContentType = {
  message: string;
  buttons: Array<AlertButtonType>;
};

const current = createListener<AlertContentType>();

function Container() {
  const [visible, setVisible] = useState<"" | "visible">("");
  const closeAlert = useCallback(() => setVisible(""), []);

  const [content, setContent] = useState<AlertContentType>({
    message: "Alert Content.",
    buttons: [{ title: "Noted", theme: "primary", onClick: closeAlert }],
  });

  useEffect(() => {
    const alertEvent = ({ detail }: CustomEvent<AlertContentType>) => {
      setContent(detail);
      setVisible("visible");
    };

    current.init(alertEvent);

    return () => {
      current.unmount();
    };
  }, []);

  return (
    <ModalStyled className={visible} role="alert">
      <div className={"modal-body"}>
        <IoMdClose className="close-icon" onClick={closeAlert} />
        <p className="py-3 mb-4">{content.message}</p>
        <div className={"modal-button-bar"}>
          {content.buttons.map((item, index) => {
            return (
              <div key={"modal-btn-" + index} role={"button"} className={"btn-" + item.theme} onClick={item.onClick}>
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
    </ModalStyled>
  );
}

const RYAlert = { Container, trigger: current.fire };

export default RYAlert;
