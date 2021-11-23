import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import TextDecorationIcons from "./components/TextDecorationIcons";

import styled, { createGlobalStyle } from "styled-components";
import { API_URL } from "../../config";

const Global = createGlobalStyle`
    body {
      margin:0;
}
`;

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const onClickPrevPage = () => {
    navigate("/");
  };

  const getTitle = (e) => {
    setTitle(e.target.value);
  };

  const getContent = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const postContent = async () => {
    const url = `${API_URL}/posts`;
    const body = {
      title,
      body: content,
    };
    console.log(body);
    try {
      await axios.post(url, body);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Global />
      <PostCreateBox>
        <PostWritingBox onSubmit={postContent}>
          <Titlebox
            placeholder="제목을 입력하세요"
            value={title}
            onChange={getTitle}
          ></Titlebox>
          <TitleBottomBar></TitleBottomBar>
          <TagBox>
            <Tag placeholder="태그를 입력하세요"></Tag>
          </TagBox>
          <TextDecorationIcons />
          <TextBox>
            <TextEditor value={content} onChange={getContent}>
              {content}
            </TextEditor>
          </TextBox>
          <FixedBottomMenu onClick={onClickPrevPage}>
            <ExitButton>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
              </svg>
              나가기
            </ExitButton>
            <div>
              <TemporarySaveButton>임시저장</TemporarySaveButton>
              <PostButton onClick={postContent}>출간하기</PostButton>
            </div>
          </FixedBottomMenu>
        </PostWritingBox>

        <PostPreviewBox>
          <PreviewTitle>{title}</PreviewTitle>
          <PreviewContent>{content}</PreviewContent>
        </PostPreviewBox>
      </PostCreateBox>
    </>
  );
};

const PostCreateBox = styled.div`
  width: 100vw;
  display: flex;
  margin: 0;
`;

const PostWritingBox = styled.form`
  position: relative;
  width: 50%;
  min-width: 500px;
  height: 100vh;
  padding: 32px 48px;
  box-sizing: border-box;
`;

const Titlebox = styled.textarea`
  padding: 0px;
  font-size: 2.75rem;
  width: 100%;
  max-height: 66px;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: rgb(33, 37, 41);
`;

const TitleBottomBar = styled.div`
  width: 4rem;
  height: 6px;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1px;
  background: rgb(73, 80, 87);
`;

const TagBox = styled.div``;

const Tag = styled.input`
  display: inline-flex;
  outline: none;
  cursor: text;
  font-size: 1.125rem;
  line-height: 2rem;
  margin-bottom: 0.75rem;
  min-width: 8rem;
  border: none;
`;

const TextBox = styled.div`
  width: 100%;
  height: 60vh;
`;

const TextEditor = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  line-height: 1.5;
  outline: none;
  cursor: text;
`;

const FixedBottomMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  padding: 0 16px;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  background: rgba(255, 255, 255, 0.85);
  box-sizing: border-box;
`;

const ExitButton = styled.button`
  border: none;
  background: none;
  svg {
    margin-right: 0.3em;
  }
`;

const TemporarySaveButton = styled.button`
  height: 2.5rem;
  margin-right: 0.75em;
  padding: 0px 1.25rem;
  border: none;
  border-radius: 4px;
  background: rgb(233, 236, 239);
  color: rgb(73, 80, 87);
`;

const PostButton = styled.button`
  height: 2.5rem;
  padding: 0px 1.25rem;
  border: none;
  border-radius: 4px;
  background: rgb(18, 184, 134);
  color: white;
`;

const PostPreviewBox = styled.div`
  width: 50%;
  height: 100vh;
  padding: 32px 48px;
  margin: 0;
  background-color: rgb(251, 253, 252);
`;

const PreviewTitle = styled.h1`
  margin-top: 26px;
`;

const PreviewContent = styled.p`
  margin-top: 64px;
`;

export default PostCreate;
