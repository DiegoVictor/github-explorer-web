import styled from 'styled-components';

const Panel = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;

  h1 {
    align-items: center;
    color: #7b7a7a;
    display: flex;
    flex-direction: row;
    font-size: 20px;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Panel;
