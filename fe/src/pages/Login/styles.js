import styled from 'styled-components';

export const ContentHeader = styled.h1`
  text-align: center;
  font-size: 42px;
  color: ${({ theme }) => theme.colors.primary.purple};
  margin-bottom: 42px;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 100px auto 0;

  .submitButton {
    margin-top: 24px;
    width: 100%;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.dark_purple};
    }

    &[disabled] {
      background: #ccc;
      cursor: default;
    }
  }

  .not-registered {
    margin-top: 8px;

    a {
      text-decoration: none;

    }
  }
`;
