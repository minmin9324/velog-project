import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "./Modal";

const Comments = ({ createdAt, comment, getComment, commentId }) => {
  const [updateButton, setUpdateButton] = useState(false);
  const [editComment, setEditComment] = useState("");
  const [isModal, setIsModal] = useState(false);

  const handleEditComment = ({ target }) => {
    setEditComment(target.value);
  };

  const handleComment = ({ target }) => {
    if (target.name === "delete") {
      setIsModal(true);
    } else {
      if (editComment !== "") {
        axios({
          method: "patch",
          url: `https://limitless-sierra-67996.herokuapp.com/v1/comments/${commentId}`,
          data: {
            body: editComment,
          },
        })
          .then((res) => {
            setUpdateButton(false);
            getComment();
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleConfirm = ({ target }) => {
    setIsModal(false);
    if (target.name !== "cancel") {
      axios({
        method: "delete",
        url: `https://limitless-sierra-67996.herokuapp.com/v1/comments/${commentId}`,
      })
        .then((res) => {
          getComment();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <CommentBox>
      <ProfileBox>
        <div className="box">
          <ProfileImg src="/images/basic.png" alt="profile" />
          <Profile>
            <a href="/@minmin9324">최정민</a>
            <CommentDate>{createdAt}</CommentDate>
          </Profile>
        </div>
        <div>
          <CommentButton
            onClick={() => {
              setUpdateButton(true);
              setEditComment(comment);
            }}
          >
            수정
          </CommentButton>
          <CommentButton name="delete" onClick={handleComment}>
            삭제
          </CommentButton>
        </div>
      </ProfileBox>
      {updateButton ? (
        <div>
          <CommentInput
            placeholder="댓글을 작성하세요"
            value={editComment}
            onChange={handleEditComment}
          />
          <UpdateBottonBox>
            <UpdateButton type="cancel" onClick={() => setUpdateButton(false)}>
              취소
            </UpdateButton>
            <UpdateButton type="update" name="update" onClick={handleComment}>
              댓글 수정
            </UpdateButton>
          </UpdateBottonBox>
        </div>
      ) : (
        <p>{comment}</p>
      )}
      {isModal && (
        <Modal
          title="댓글 삭제"
          Message="댓글을 정말로 삭제하시겠습니까?"
          handleConfirm={handleConfirm}
        />
      )}
    </CommentBox>
  );
};
export default Comments;

const CommentBox = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgb(233, 236, 239);
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  justify-content: space-between;

  .box {
    display: flex;
    align-items: center;
  }
`;

const Profile = styled.div`
  margin-left: 1rem;
  line-height: 1;
  a {
    font-size: 1rem;
    font-weight: bold;
    text-decoration: none;
    color: rgb(52, 58, 64);
  }
`;

const CommentDate = styled.div`
  margin-top: 0.5rem;
  color: rgb(134, 142, 150);
  font-size: 0.875rem;
`;

const ProfileImg = styled.img`
  width: 3.375rem;
  height: 3.375rem;
  display: block;
  border-radius: 50%;
  object-fit: cover;
`;

const CommentButton = styled.button`
  font-size: 0.875rem;
  color: rgb(134, 142, 150);
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
`;

const CommentInput = styled.textarea`
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

const UpdateBottonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UpdateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  color: white;
  border-radius: 4px;
  padding: 0px 1.25rem;
  height: 2rem;
  font-size: 1rem;
  margin-left: 0.5rem;
  background: ${({ type }) =>
    type === "cancel" ? "rgb(134, 142, 150)" : "rgb(18, 184, 134)"};
`;
