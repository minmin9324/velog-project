import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import Comments from "../component/Comments";

import DeleteModal from "../component/DeleteModal";
import Header from "../component/Header";
const PostDetail = () => {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);
  const [editComment, setEditComment] = useState("");
  const [prevPostId, setPrevPostId] = useState("");
  const [nextPostId, setNextPostId] = useState("");
  const [isModal, setIsModal] = useState(false);

  const params = useParams();
  let location = useLocation();
  const navigate = useNavigate();

  console.log(params, location);
  console.log(location.state);

  useEffect(() => {
    getData();
  }, [params.postId]);

  const getData = () => {
    axios({
      method: "GET",
      url: `https://limitless-sierra-67996.herokuapp.com/v1/posts/${params.postId}`,
    })
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));

    axios({
      method: "GET",
      url: `https://limitless-sierra-67996.herokuapp.com/v1/posts?sortBy=createdAt`,
    })
      .then((res) => {
        if (res.data.results.length !== 0) {
          if (location.state === 0) {
            setNextPostId(res.data.results[location.state + 1]);
            setPrevPostId("");
          } else if (location.state === res.data.results.length - 1) {
            setPrevPostId(res.data.results[location.state - 1]);
            setNextPostId("");
          } else {
            setNextPostId(res.data.results[location.state + 1]);
            setPrevPostId(res.data.results[location.state - 1]);
          }
        }
      })
      .catch((err) => console.log(err));

    getComment();
  };

  const getComment = () => {
    axios({
      method: "GET",
      url: `https://limitless-sierra-67996.herokuapp.com/v1/comments`,
    })
      .then((res) => {
        if (res.data.results.length !== 0) {
          const results = res.data.results.filter(
            (ele) => ele.postId === params.postId
          );
          setComment(results);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleButton = (type) => {
    if (type === "delete") {
      console.log("delete modal을 띄어줘");
      setIsModal((prev) => !prev);
    } else {
      alert("Coming soon.");
    }
  };

  const handleSumit = () => {
    if (editComment !== "") {
      setEditComment("");
      axios({
        method: "post",
        url: `https://limitless-sierra-67996.herokuapp.com/v1/comments`,
        data: {
          postId: params.postId,
          body: editComment,
        },
      })
        .then((res) => {
          getComment();
        })
        .catch((err) => console.log(err));
    }
  };
  console.log(nextPostId, prevPostId);
  const handlePreviousNext = (type) => {
    console.log(prevPostId, nextPostId);
    if (type === "prev") {
      navigate(`/detail/${prevPostId.id}`, { state: location.state - 1 });
    } else {
      navigate(`/detail/${nextPostId.id}`, { state: location.state + 1 });
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
  let commentCount = comment.length;
  return (
    <>
      <Header />
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
              {isModal && <DeleteModal isModal={setIsModal} postId={post.id} />}
            </div>
          </InfoContainer>
        </header>
        <Content>{post.body}</Content>
        <Profilebox>
          <ProfileImg src="/images/mango.png" alt="profile" />
          <ProfileInfo>
            <a href="/@minmin9324">최정민</a>
            <span>나 다운 것, 가장 아름다운 것</span>
          </ProfileInfo>
        </Profilebox>
        <PreviousNextPostContainer>
          {prevPostId && (
            <PreviousNextPostBox onClick={() => handlePreviousNext("prev")}>
              <PreviousIcon></PreviousIcon>
              <TextBox type="previous">
                <p>이전 포스트</p>
                <h3>{prevPostId.title}</h3>
              </TextBox>
            </PreviousNextPostBox>
          )}
          {nextPostId && (
            <PreviousNextPostBox
              type="next"
              onClick={() => handlePreviousNext("next")}
            >
              <TextBox type="next">
                <p>다음 포스트</p>
                <h3>{nextPostId.title}</h3>
              </TextBox>
              <NextIcon></NextIcon>
            </PreviousNextPostBox>
          )}
        </PreviousNextPostContainer>
        <CommetBox>
          <h4>{commentCount}개의 댓글</h4>
          <CommetInput
            placeholder="댓글을 작성하세요"
            value={editComment}
            onChange={({ target }) => setEditComment(target.value)}
          ></CommetInput>
          <CommentSubmit>
            <button onClick={handleSumit}>댓글 작성</button>
          </CommentSubmit>
          {comment &&
            comment.map((ele) => {
              let commentCreatedAt =
                ele.createdAt &&
                ele.createdAt.slice(0, ele.createdAt.indexOf("-")) +
                  "년 " +
                  ele.createdAt.slice(5, ele.createdAt.indexOf("-", 5)) +
                  "월 " +
                  ele.createdAt.slice(8, 10) +
                  "일";
              return (
                <Comments
                  id={ele.id}
                  comment={ele.body}
                  commentId={ele.id}
                  createdAt={commentCreatedAt}
                  getComment={getComment}
                ></Comments>
              );
            })}
        </CommetBox>
      </Container>
    </>
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
  margin-bottom: 2rem;
  word-break: keep-all;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  button {
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
  margin-bottom: 7rem;
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
    margin-bottom: 1rem;
    color: rgb(52, 58, 64);
  }
`;

const CommentSubmit = styled.div`
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

const PreviousNextPostContainer = styled.div`
  margin: 3rem 0;
  display: flex;
`;

const PreviousNextPostBox = styled.div`
  cursor: pointer;
  background: rgb(248, 249, 250);
  box-shadow: rgb(0 0 0 / 6%) 0px 0px 4px 0px;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  ${({ type }) => (type === "next" ? "margin-left: 3rem;" : "")};
  max-width: 360px;
`;

const PreviousIcon = styled(BsArrowLeftCircle)`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: rgb(32, 201, 151);
  margin-right: 1rem;
`;

const NextIcon = styled(BsArrowRightCircle)`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: rgb(32, 201, 151);
  margin-left: 1rem;
`;

const TextBox = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: ${({ type }) => (type === "next" ? "flex-end;" : "flex-start;")};
  line-height: 1;
  min-width: 0px;
  P {
    font-size: 0.75rem;
    font-weight: bold;
    color: rgb(73, 80, 87);
    padding: 0;
    line-height: 1;
    margin: 0px;
  }
  h3 {
    width: 100%;
    font-size: 1.125rem;
    color: rgb(73, 80, 87);
    line-height: 1.15;
    margin: 0.5rem 0px 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    ${({ type }) => (type === "next" ? "text-align : right;" : "")}
  }
`;
