import React from "react";
import TextDecorationIcons from "./components/TextDecorationIcons";
import styled from "styled-components";

const PostCreate = () => {
  return (
    <PostCreateBox>
      <PostWritingBox>
        <Titlebox placeholder="제목을 입력하세요"></Titlebox>
        <TitleBottomBar></TitleBottomBar>
        <TagBox>
          <Tag placeholder="태그를 입력하세요"></Tag>
        </TagBox>
        <TextDecorationIcons />
        <TextBox>
          <TextEditor></TextEditor>
        </TextBox>
        <FixedBottomMenu>
          <ExitButton>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
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
            <PostButton>출간하기</PostButton>
          </div>
        </FixedBottomMenu>
      </PostWritingBox>

      <PostPreviewBox></PostPreviewBox>
    </PostCreateBox>
  );
};

const PostCreateBox = styled.div`
  width: 100vw;
  display: flex;
  margin: 0;
  box-sizing: border-box;
`;

const PostWritingBox = styled.form`
  position: relative;
  width: 50%;
  height: 100vh;
  padding: 32px 48px;
  box-sizing: border-box;
`;

const Titlebox = styled.textarea`
  padding: 0px;
  font-size: 2.75rem;
  width: 100%;
  height: 66px;
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
  height: 500px;
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
  padding: auto 16px;
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;
  background: rgba(255, 255, 255, 0.85);
`;

const ExitButton = styled.button`
  border: none;
  background: none;
`;

const TemporarySaveButton = styled.button`
  border: none;
  background: none;
`;

const PostButton = styled.button`
  border: none;
  background: none;
`;

const PostPreviewBox = styled.div`
  width: 50%;
  height: 100vh;
  margin: 0;
  background-color: rgb(251, 253, 252);
`;

export default PostCreate;
