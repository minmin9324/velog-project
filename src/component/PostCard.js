import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    a {
        text-decoration: none !important;
    }
`;

const PostCardWrapper = styled.div`
  width: 100%;
  background: white;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  transition: 0.25s ease-in transform;
  cursor: pointer;
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
  }

  @media (max-width: 1024px) {
    &:hover {
      transform: none;
    }
  }
`;
const ImgWrapper = styled.div`
  padding-top: 52.192%;
  width: 100%;
  position: relative;
  & > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0px;
    left: 0px;
    display: block;
  }
`;

const ContentWrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`;

const TitleWrapper = styled.h4`
  font-size: 1rem;
  margin: 0px 0px 0.25rem;
  line-height: 1.5;
  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
  color: black;
`;

const TextWrapper = styled.p`
  margin: 0px 0px 1.5rem;
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: 0.875rem;
  line-height: 1.5;
  height: 4rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: rgb(73, 80, 87);
`;

const SubinfoWrapper = styled.div`
  font-size: 0.75rem;
  line-height: 1.5;
  color: rgb(134, 142, 150);
`;

const PostCard = ({ post, ref }) => {
  const navigate = useNavigate();
  const [commentCount, setCommentCount] = useState(0);
  // console.log(post.thumbnail);

  useEffect(() => {
    getAllComments();
  }, []);

  const gotoDetailPage = () => {
    // navigate("/detail", { state: post.id });
    navigate(`/detail/${post.id}`);
  };

  const getAllComments = () => {
    axios
      .get(
        `https://limitless-sierra-67996.herokuapp.com/v1/comments?postId=${post.id}`
      )
      .then((res) => {
        // console.log(res.data.results);
        setCommentCount(res.data.results.length);
      });
  };

  //미리보기에 태그 없애기
  const changeTag = (data) => {
    let result = data.replace(/&lt;+[\/a-z]+>/gi, " ");
    result = result.replace("\\n", " ");
    return result;
  };

  //게시글 만들어진 시간 표시하기
  const changeCreatedAtFormat = (createdAt) => {
    const today = new Date();
    const createdAtTime = new Date(createdAt);
    let diff_time = Math.floor(
      (today.getTime() - createdAtTime.getTime()) / 1000 / 60
    );
    if (diff_time < 1) return "방금전";
    if (diff_time < 60) return `${diff_time} 분 전`;
    diff_time = Math.floor(diff_time / 60);
    if (diff_time < 24) return `${diff_time} 시간 전`;
    diff_time = Math.floor(diff_time / 24);
    if (diff_time < 7) return `${diff_time} 일 전`;
    return `${createdAtTime.getFullYear()}년 ${
      createdAtTime.getMonth() + 1
    } 월 ${createdAtTime.getDate()} 일`;
  };

  return (
    <>
      <PostCardWrapper onClick={gotoDetailPage}>
        <Global />
        <div>
          {post.thumbnail && (
            <ImgWrapper>
              <img src={post.thumbnail} />
            </ImgWrapper>
          )}
        </div>
        <ContentWrapper>
          <div>
            <TitleWrapper>{post.title}</TitleWrapper>
            <TextWrapper>{changeTag(post.body)}</TextWrapper>
          </div>
          {/* </Link> */}
          <SubinfoWrapper>
            <span>{changeCreatedAtFormat(post.createdAt)}</span>
            <span> · </span>
            <span>{commentCount}개의 댓글</span>
          </SubinfoWrapper>
        </ContentWrapper>
      </PostCardWrapper>
    </>
  );
};

export default PostCard;
