import styled from 'styled-components';

export const Container = styled.header`
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;

  nav {
    a {
      text-decoration: none;
      color: ${({ theme }) => theme.colors.primary.blue};
      font-weight: bold;

      & + a {
        margin-left: 24px;
      }

      &:hover{
        filter: contrast(85%)
      }
    }

    button {
      margin-left: 24px;
    }

    .auth-button {

      color: ${({ theme }) => theme.colors.primary.blue};
      border: 1px solid ${({ theme }) => theme.colors.primary.blue};
      border-radius: 4px;
      padding: 8px 16px;
      background-color: ${({ theme }) => theme.colors.background};
      transition: all 0.2s;
      font-weight: bold;

      &:hover{
        filter: contrast(85%)
      }
    }


  }
`;
