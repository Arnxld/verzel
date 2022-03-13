import styled, { css } from 'styled-components';

export const Header = styled.header`
  margin-bottom: 96px;

    color: ${({ theme }) => theme.colors.primary.purple};
    margin-bottom: 96px;

    a {
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;
      color: #fff;
      background-color: ${({ theme }) => theme.colors.primary.purple};
      padding: 8px 16px;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.dark_purple};
      }
    }
`;

export const Container = styled.div`
  width: 100%;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  /* grid-template-columns: repeat(4, 1fr); */
`;

export const ClassCard = styled.article`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .card-info {
    color: #fff;
    width: 280px;
    height: 390px;
    padding: 32px;
    background-color: ${({ theme }) => theme.colors.primary.purple};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: ${(props) => (props.isAdmin ? '4px 4px 0 0' : '4px')};
  }

  .card-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;

    a {
      width: 50%;
      height: 100%;
      text-align: center;
      padding: 8px;
      background-color: ${({ theme }) => theme.colors.primary.blue};
      border-radius: 0 0 0 4px;
      text-decoration: none;
      color: #fff;
      transition: all 0.2s ease-in;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.darkBlue};
      }

    }

    button {
      color: #fff;
      font-size: 16px;
      height: 100%;
      width: 50%;
      padding: 6px;
      border: none;
      background-color: ${({ theme }) => theme.colors.danger.main};
      border-radius: 0 0 4px 0;
      transition: all 0.2s ease-in;


      &:hover {
        background-color: ${({ theme }) => theme.colors.danger.dark};
      }
    }
  }


`;
