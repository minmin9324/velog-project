import React from "react";
import styled from "styled-components";

const TextDecorationIcons = () => {
  return (
    <ToolBox>
      <Tool>
        H<span>1</span>
      </Tool>
      <Tool>
        H<span>2</span>
      </Tool>
      <Tool>
        H<span>3</span>
      </Tool>
      <Tool>
        H<span>4</span>
      </Tool>
      <DivisionLine></DivisionLine>
      <Tool>
        <b>B</b>
      </Tool>
      <Tool>
        <i>I</i>
      </Tool>
      <Tool>
        <s>T</s>
      </Tool>
      <DivisionLine></DivisionLine>
      <Tool>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path>
        </svg>
      </Tool>
      <Tool>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
        </svg>
      </Tool>
      <Tool>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
        </svg>
      </Tool>
      <Tool>
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
        </svg>
      </Tool>
    </ToolBox>
  );
};

const ToolBox = styled.div`
  display: flex;
  align-items: center;
  max-width: 864px;
`;

const DivisionLine = styled.div`
  width: 1px;
  height: 1.25rem;
  margin: 0 0.75em;
  background: rgb(206, 212, 218);
`;

const Tool = styled.button`
  width: 2em;
  height: 2em;
  border: none;
  background: none;
  color: rgb(134, 142, 150);
  font-size: 1rem;
  font-weight: bold;
  font-family: serif;
  cursor: pointer;

  span {
    font-size: 0.75rem;
  }

  svg {
    width: 1.2em;
    height: 1.2em;
  }
`;

export default TextDecorationIcons;
