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


  .custom-date-picker {
    width: 100%;
    height: 52px;
    padding: 16px;
    font-size: 16px;
    border-radius: 4px;
    border: none;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);

    &:focus {
      outline: none;
    }

  }

  .submitButton {
    margin-top: 24px;
    width: 100%;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.dark_purple};
    }
  }
`;
