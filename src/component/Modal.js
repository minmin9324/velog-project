import React from "react";
import styled from "styled-components";

const Modal = ({ title, Message, handleConfirm }) => {
  return (
    <Container>
      <Modalbox>
        <DeleteBox>
          <ModalHeader>{title}</ModalHeader>
          <ModalMessage>{Message}</ModalMessage>
          <ButtonBox>
            <SumitButton name="cancel" onClick={handleConfirm}>
              취소
            </SumitButton>
            <SumitButton name="confirm" onClick={handleConfirm}>
              확인
            </SumitButton>
          </ButtonBox>
        </DeleteBox>
      </Modalbox>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(249, 249, 249, 0.85);
  z-index: 10;
`;

const Modalbox = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 25;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteBox = styled.div`
  width: 25rem;
  border-radius: 4px;
  background: white;
  padding: 2rem 1.5rem;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
`;

const ModalHeader = styled.h3`
  margin: 1rem;
  font-size: 1.5rem;
  color: rgb(52, 58, 64);
  line-height: 1.5;
  font-weight: bold;
`;

const ModalMessage = styled.p`
  line-height: 1.5;
  font-size: 1rem;
  color: rgb(73, 80, 87);
  margin-top: 1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
  white-space: pre-wrap;
`;

const ButtonBox = styled.div`
  margin-top: 2rem;
  margin-right: 2rem;
  display: flex;
  justify-content: flex-end;
`;

const SumitButton = styled.button`
  background: ${({ name }) =>
    name === "cancel" ? "rgb(233, 236, 239);" : "rgb(18, 184, 134);"};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  margin-left: 0.6rem;
  color: ${({ name }) => (name === "cancel" ? "rgb(73, 80, 87)" : "white")};
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2rem;
  font-size: 1rem;
`;
