import styled from 'styled-components';

export const ContentHeader = styled.h1`
  text-align: center;
  font-size: 42px;
  color: ${({ theme }) => theme.colors.primary.purple};
  margin-bottom: 42px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 100px auto 0;

  button {
    margin-top: 24px;
    width: 100%;
  }

  .not-registered {
    margin-top: 8px;

    a {
      text-decoration: none;

    }
  }
`;
