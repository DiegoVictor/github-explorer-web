import styled from 'styled-components';

export const Loading = styled.div`
  align-items: center;
  color: #ffffff;
  display: flex;
  font-size: 30px;
  font-weight: bold;
  justify-content: center;
  height: 100vh;
`;

export const Owner = styled.header`
  align-items: center;
  display: flex;
  flex-direction: column;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    border-radius: 50%;
    margin-top: 20px;
    width: 120px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    color: #666666;
    font-size: 14px;
    line-height: 1.4;
    margin-top: 5px;
    max-width: 400px;
    text-align: center;
  }
`;

export const IssueList = styled.ul`
  border-top: 1px solid #eeeeee;
  list-style: none;
  margin-top: 30px;
  padding-top: 30px;

  li {
    border: 1px solid #eeeeee;
    border-radius: 4px;
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 10px;
    }

    img {
      border: 2px solid #eeeeee;
      border-radius: 50%;
      height: 36px;
      width: 36px;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          color: #7159c1;
          text-decoration: none;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background-color: #eeeeee;
          border-radius: 2px;
          color: #333333;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          margin-left: 10px;
          padding: 3px 4px;
        }
      }

      p {
        color: #999999;
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
`;
