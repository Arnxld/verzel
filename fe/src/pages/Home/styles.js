import styled from 'styled-components';

export const Container = styled.div`
`;

export const Header = styled.header`
  color: ${({ theme }) => theme.colors.primary.purple};

  margin-bottom: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

export const ListContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    max-width: 1000px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
`;

export const ModuleCard = styled.article`
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 300px;

    .card-info {
      border-radius: ${({ isAdmin }) => (isAdmin ? '4px 4px 0 0' : '4px')};
      width: 100%;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px;
      height: 150px;
      background-color: ${({ theme }) => theme.colors.primary.purple};
      transition: all 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.dark_purple};
      }

      h2 {
        text-align: center;
        font-size: 22px;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;

        span {
          padding: 2px 4px;
          background-color: ${({ theme }) => theme.colors.primary.green};
          border-radius: 4px;
          /* margin-left: 16px; */
        }

        a {
          padding: 4px 12px;
          color: ${({ theme }) => theme.colors.primary.lightGreen};
          background: transparent;
          text-decoration: none;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            background-color:${({ theme }) => theme.colors.primary.green};
          }
        }
      }
    }

    .card-actions {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;

      a {
        height: 100%;
        width: 50%;
        text-align: center;
        padding: 8px;
        background-color: ${({ theme }) => theme.colors.primary.blue};
        border-radius: 0 0 0 4px;
        text-decoration: none;
        color: #fff;
        transition: all 0.2s ease-in;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: ${({ theme }) => theme.colors.primary.darkBlue};
        }

      }

      button {
        width: 50%;
        color: #fff;
        font-size: 16px;
        height: 100%;
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
