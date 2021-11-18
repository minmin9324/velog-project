import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const PostDetail = () => {
  const [post, setPost] = useState([]);
  let location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      method: "GET",
      url: `https://limitless-sierra-67996.herokuapp.com/v1/posts/${location.state}`,
    })
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleButton = (type) => {
    if (type === "delete") {
      console.log("delete modal을 띄어줘");
    } else {
      alert("Coming soon.");
    }
  };

  let createdAt =
    post.createdAt &&
    post.createdAt.slice(0, post.createdAt.indexOf("-")) +
      "년 " +
      post.createdAt.slice(5, post.createdAt.indexOf("-", 5)) +
      "월 " +
      post.createdAt.slice(8, 10) +
      "일";

  return (
    <Container>
      <header>
        <Title>{post.title}</Title>
        <InfoContainer>
          <div>
            <Information type="username">
              <a>mango9324</a>
            </Information>
            <Information type={false}>·</Information>
            <Information type="date">{createdAt}</Information>
          </div>
          <div>
            <button onClick={() => handleButton("statistics")}>통계</button>
            <button onClick={() => handleButton("update")}>수정</button>
            <button onClick={() => handleButton("delete")}>삭제</button>
          </div>
        </InfoContainer>
      </header>
      <Content>{post.body}</Content>
      <Profilebox>
        <ProfileImg src="./images/mango.png" alt="profile" />
        <ProfileInfo>
          <a href="/@minmin9324">최정민</a>
          <span class="description">나 다운 것, 가장 아름다운 것</span>
        </ProfileInfo>
      </Profilebox>
      <CommetBox>
        <h4>0개의 댓글</h4>
        <CommetInput placeholder="댓글을 작성하세요"></CommetInput>
        <div>
          <button>댓글 작성</button>
        </div>
      </CommetBox>
    </Container>
  );
};

export default PostDetail;

const Container = styled.div`
  margin-top: 5.5rem;
  width: 768px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  line-height: 1.5;
  letter-spacing: -0.004em;
  margin-top: 0 px;
  font-weight: 800;
  color: rgb(52, 58, 64);
  margin-bottom: 2 rem;
  word-break: keep-all;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 0 px;
    outline: none;
    border: none;
    background: none;
    font-size: inherit;
    cursor: pointer;
    color: rgb(134, 142, 150);
  }
`;

const Information = styled.span`
  font-weight: ${({ type }) => (type === "username" ? "bold" : "")};
  color: ${({ type }) => (type === "date" ? "rgb(73, 80, 87);" : "")};
  a {
    text-decoration: none;
    color: inherit;
  }
  ${({ type }) => (type ? "" : "margin-left: 0.5rem; margin-right: 0.5rem;")};
`;

const Content = styled.div`
  margin: 20px 0px;
  font-size: 1.125rem;
  color: rgb(34, 36, 38);
  line-height: 1.7;
  letter-spacing: -0.004em;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Profilebox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 2rem;
  margin-top: 16rem;
  margin-bottom: 6rem;
  border-bottom: 1px solid rgb(233, 236, 239);
`;

const ProfileImg = styled.img`
  display: block;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  a {
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 600;
    color: rgb(33, 37, 41);
    text-decoration: none;
  }
  span {
    white-space: pre-wrap;
    font-size: 1.125rem;
    line-height: 1.5;
    margin-top: 0.25 rem;
    color: rgb(73, 80, 87);
    letter-spacing: -0.004em;
  }
`;

const CommetBox = styled.div`
  width: 100%;
  h4 {
    font-size: 1.125rem;
    line-height: 1.5;
    font-weight: 500;
    margin-bottom: 1 rem;
    color: rgb(52, 58, 64);
  }

  div {
    display: flex;
    justify-content: flex-end;
    button {
      font-weight: bold;
      cursor: pointer;
      outline: none;
      border: none;
      background: rgb(18, 184, 134);
      color: white;
      border-radius: 4px;
      padding: 0px 1.25rem;
      height: 2rem;
      font-size: 1rem;
    }
  }
`;

const CommetInput = styled.textarea`
  height: 70px;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  padding: 1rem 1rem 1.5rem;
  outline: none;
  border: 1px solid rgb(233, 236, 239);
  margin-bottom: 1.5rem;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1rem;
  color: rgb(33, 37, 41);
  line-height: 1.75;
`;
