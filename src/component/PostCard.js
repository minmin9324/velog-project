import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    a {
        text-decoration: none !important;
    }
`;

const PostCardWrapper = styled.div`
  width: 20rem;
  background: white;
  margin: 1rem;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  transition: 0.25s ease-in transform;
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
  }

  @media (max-width: 1056px) {
    width: calc(50% - 2rem);
  }
  @media (max-width: 1024px) {
    &:hover {
      transform: none;
    }
  }
  @media (max-width: 767px) {
    margin: 0px;
    width: 100%;
  }
`;
const ImgWrapper = styled.div`
  // height: 140px;
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

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  console.log(post.thumbnail);

  const gotoDetailPage = () => {
    navigate("/detail", { state: post.id });
  };

  return (
    <>
      <PostCardWrapper onClick={gotoDetailPage}>
        <Global />
        {/* <Link to={`/PostDetails/${post.id}`}> */}
        <div>
          {/* <ImgWrapper src={post.thumbnail} /> */}
          {post.thumbnail && (
            <ImgWrapper>
              <img src={post.thumbnail} />
            </ImgWrapper>
          )}
          {/* <ImgWrapper>
            <img src={post.thumbnail} />
          </ImgWrapper> */}
        </div>
        {/* </Link> */}
        <ContentWrapper>
          {/* <Link to={`/PostDetails/${post.id}`}> */}
          <div>
            <TitleWrapper>{post.title}</TitleWrapper>
            <TextWrapper>{post.body}</TextWrapper>
          </div>
          {/* </Link> */}
          <SubinfoWrapper>
            <span>{post.createdAt}</span>
            <span> · </span>
            <span>1개의 댓글</span>
          </SubinfoWrapper>
        </ContentWrapper>
      </PostCardWrapper>
    </>
  );
};

export default PostCard;
