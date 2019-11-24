import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0px auto;
  max-width: 700px;
  padding: 70px 0px;
`;

export const Back = styled(Link)`
  background-color: #7b7a7a;
  color: #fff;
  display: inline-block;
  height: 40px;
  line-height: 21px;
  margin-top: 10px;
  padding: 11px 13px;
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
    border: 1px solid #ddd;
    border-radius: 7px;
    margin-top: 20px;
    opacity: 0.7;
    padding: 3px;
    width: 140px;
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

export const Filters = styled.div`
  margin-top: 20px;
  position: relative;
  text-align: right;

  &::after {
    color: #7a7b7b;
    content: '●●●';
    font-size: 10px;
    margin-top: 29px;
    position: absolute;
    right: 5px;
    transform: rotate(90deg);
  }
`;

export const StatusList = styled.select`
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  border: 1px solid #eeeeee;
  border-radius: 0px;
  box-shadow: 0px 1px 2px #e8e8e8;
  height: 34px;
  margin-top: 20px;
  max-width: 190px;
  padding: 0px 10px;
  width: 100%;
`;

export const IssueList = styled.ul`
  list-style: none;
  padding-top: 10px;

  li {
    border: 1px solid #eeeeee;
    border-top: 1px solid #eee;
    box-shadow: 0px 1px 2px #e8e8e8;
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 4px;
    }

    img {
      border: 1px solid #ddd;
      border-radius: 7px;
      height: 40px;
      padding: 1px;
      width: 40px;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          color: #7b7a7a;

          &:hover {
            color: #7b7a7a;
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
        margin-top: 1px;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    align-items: center;
    background-color: transparent;
    border: 1px solid #7b7a7a;
    border-radius: 4px;
    color: #7b7a7a;
    display: flex;
    font-size: 12px;
    font-weight: bold;
    line-height: 13px;
    padding: 11px 15px 9px;
    text-transform: uppercase;

    &[disabled] {
      opacity: 0.2;
    }

    &:not([disabled]):hover {
      background-color: #7b7a7a;
      color: #fff;

      svg {
        color: #fff !important;
      }
    }

    &:first-child svg {
      margin-right: 5px;
      margin-top: -2px;
    }

    &:last-child svg {
      margin-left: 5px;
      margin-top: -2px;
    }
  }
`;
