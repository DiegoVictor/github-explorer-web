import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  input {
    border: 1px solid ${props => (props.error ? '#FF6B6B' : '#EEE')};
    border-radius: 4px;
    flex: 1;
    font-size: 16px;
    padding: 10px 15px;
  }
`;

export const Err = styled.div`
  background-color: #f2dede;
  color: #cb6664;
  font-weight: bold;
  padding: 10px 15px;
  margin: 10px auto;
  max-width: 700px;
  width: 100%;
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  align-items: center;
  background-color: #7159c1;
  border: 0px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin-left: 10px;
  padding: 0px 15px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0px;

    & + li {
      border-top: 1px solid #eeeeee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
