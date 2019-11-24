import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0px auto;
  max-width: 700px;
  padding: 80px 0px;
`;

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 30px;

  input {
    border: 1px solid ${props => (props.error ? '#FF6B6B' : '#EEE')};
    flex: 1;
    font-size: 16px;
    padding: 10px 15px;
  }
`;

export const Icon = styled.div`
  margin-right: 10px;
`;

export const Err = styled.div`
  background-color: #F2DEDE;
  color: #CB6664;
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
  background-color: #7B7A7A;
  border: 0px;
  display: flex;
  height: 100%;
  justify-content: center;
  margin-left: 10px;
  padding: 13.5px 15px;

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
  margin-top: 10px;

  li {
    align-items: center;
    border-top: 1px solid #EEE;
    box-shadow: 0px 1px 2px #E8E8E8;
    color: #7B7A7A;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 4px;
    padding: 15px 15px;

    a {
      color: #7B7A7A;
      font-size: 13px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;
