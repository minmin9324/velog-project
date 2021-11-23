import React, { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import PostCard from "../component/PostCard";
import Header from "../component/Header";

const Global = createGlobalStyle`
body {
    background: rgb(248, 249, 250);
}
`;

const MainWrapper = styled.div`
  margin-top: 100px;
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  // border: 1px solid black;
  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
  .card {
    width: 20rem;
    margin: 1rem;
    @media (max-width: 1056px) {
      width: calc(50% - 2rem);
    }
    @media (max-width: 1024px) {
      &:hover {
        transform: none;
      }
    }
    @media (max-width: 767px) {
      margin: 1rem;
      width: 100%;
    }
  }
`;

const PostList = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
`;

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [hasmorePost, setHasmorePost] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);

  const getItems = useCallback(async () => {
    console.log("데이터 불러오는중");
    setLoading(true);
    await axios
      .get(
        `https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=20&page=${page}&sortBy=createdAt:desc`
      )
      .then((res) => {
        console.log(res.data.results);
        if (res.data.results.length === 0) {
          setHasmorePost(false);
        }
        setPosts((prevState) => {
          return [...prevState, ...res.data.results];
        });
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, [page]);

  useEffect(() => {
    setTimeout(()=>{
      getItems();
    },300)
  }, [getItems]);

  useEffect(() => {
    if (inView && !loading && hasmorePost) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading, hasmorePost]);

  return (
    <>
      <Global />
      <Header />
      <MainWrapper>
        <PostList>
          {posts.map((post, idx) => (
            <React.Fragment key={idx}>
              {posts.length - 1 === idx ? (
                <div className="card" ref={ref}>
                  <PostCard key={post.id} post={post} />
                </div>
              ) : (
                <div className="card">
                  <PostCard key={post.id} post={post} />
                </div>
              )}
            </React.Fragment>
          ))}
        </PostList>
      </MainWrapper>
    </>
  );
};

export default Main;
