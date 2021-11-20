import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import PostCard from "../component/PostCard";
import { initialState } from "./data";
import DeleteModal from "../component/DeleteModal";

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
  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
`;

const PostList = styled.div`
  display: flex;
  margin: -1rem;
  // grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  // margin-left: 100px;
  // margin-bottom: 100px;
  flex-wrap: wrap;
`;

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [hasmorePost, setHasmorePost] = useState(true);
  console.log("렌더링");
  console.log(posts);
  const deleteClick = (e) => {
    e.preventDefault();
    setIsModal(true);
  };

  const listClick = () => {
    console.log(posts);
  };

  const addPost = (data) => {
    console.log("ADD POST");
    console.log(data);
    setPosts([...posts, ...posts]);
  };
  useEffect(() => {
    axios
      .get("https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=20")
      .then((res) => {
        console.log(res.data.results);
        setPosts([...posts, ...res.data.results]);
      });

    // console.log(posts);
  }, []);

  // useEffect(()=> {

  //   function onScroll() {
  //     //scrollY: 얼마나 내렸는지, clientHeight: 화면 보이는 길이, scrollHeight: 총 길이
  //     console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
  //     if(window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
  //       //새로운거 로딩
  //       console.log(posts);
  //       console.log("new post load")
  //       axios.get('https://limitless-sierra-67996.herokuapp.com/v1/posts?limit=20')
  //         .then(res => {
  //           console.log(res.data.results);
  //           console.log(posts);
  //           setPosts([...posts,...res.data.results])
  //           //addPost(res.data.results);
  //           console.log("현재 포스트리스트");
  //           console.log(posts);
  //         })
  //     }
  //   }
  //   window.addEventListener('scroll', onScroll);
  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };

  // }, [hasmorePost]);
  console.log(posts);
  return (
    <>
      <Global />
      <MainWrapper>
        <button onClick={deleteClick}>삭제</button>
        <button onClick={listClick}>포스트리스트확인</button>
        <button onClick={addPost}>포스트추가</button>
        {isModal && <DeleteModal isModal={setIsModal} />}
        <PostList>
          {posts.map((post, index) => {
            return <PostCard key={post.id} post={post} index={index} />;
          })}
        </PostList>
      </MainWrapper>
    </>
  );
};

export default Main;
