import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const HeaderArea = styled.div`
  position: relative;
  width: 100%;
`;
const HeaderWrapper = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;

  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
  .header_title {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    letter-spacing: 2px;
  }

  .new_post {
    height: 2rem;
    padding: 0 1rem;
    outline: none;
    background-color: white;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: bold;
    border: 1px solid rgb(52, 58, 64);
    cursor: pointer;
  }
`;

const HideHeaderWrapper = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: white;
  z-index: 1;
  box-shadow: rgb(0 0 0 / 8%);
`;
const Header = () => {
  const [hide, setHide] = useState(false);
  const [pageY, setPageY] = useState(0);
  const ref = useRef(document);
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/");
  };
  const gotoPostCreate = () => {
    navigate("/create");
  };
  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset >= 200 && deltaY < 0;
    setHide(hide);
    setPageY(pageYOffset);
  };
  useEffect(() => {
    ref.current.addEventListener("scroll", handleScroll);
    return () => ref.current.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  return (
    <HeaderArea>
      <HeaderWrapper>
        <div className="header_title" onClick={gotoHome}>
          velog
        </div>
        <div className="search_post">
          <button className="new_post" onClick={gotoPostCreate}>
            새 글 작성
          </button>
        </div>
      </HeaderWrapper>
      {hide && (
        <HideHeaderWrapper>
          <HeaderWrapper>
            <div className="header_title" onClick={gotoHome}>
              velog
            </div>
            <div className="search_post">
              <button className="new_post" onClick={gotoPostCreate}>
                새 글 작성
              </button>
            </div>
          </HeaderWrapper>
        </HideHeaderWrapper>
      )}
    </HeaderArea>
  );
};

export default Header;
