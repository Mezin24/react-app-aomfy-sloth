import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
const Stars = ({ stars, reviews }) => {
  const startsContent = [...new Array(5)].map((_, index) => (
    <span key={index}>
      {index + 1 <= stars ? (
        <BsStarFill />
      ) : index + 0.5 <= stars ? (
        <BsStarHalf />
      ) : (
        <BsStar />
      )}
    </span>
  ));

  return (
    <Wrapper>
      <div className='stars'>{startsContent}</div>
      <p className='reviews'>({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
