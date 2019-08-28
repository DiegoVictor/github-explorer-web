import styled from 'styled-components';

const Container = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  margin: 80px auto;
  max-width: 700px;
  padding: 30px;

  h1 {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: 20px;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;
