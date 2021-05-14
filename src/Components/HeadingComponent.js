import React from "react";
import styled from "styled-components";

export default function MainJumboTronComponent() {
  const Container = styled.div`
    background-image: url("/arthur.jpg");
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 400px;
    justify-content: flex-end;
    align-items: flex-start;
    display: flex;
    box-shadow: 0 0 20px 10px #141414;
  `;
  const TextWrapper = styled.div`
    //padding-right: 10%;
    max-width: 500px;
    //padding-bottom: 60px;
    margin-right: 10%;
    align-items: right;

    @media screen and (max-width: 730px) {
      justify-content: flex-start;
      margin-right: 0px;
      padding-right: 0px;
    }
  `;
  const TextHeading = styled.h1`
    flex: wrap;
    margin-top: 5%;
    color: black;
    font-weight: 600;
    font-size: 45px;
    font-family: New Century Schoolbook, TeX Gyre Schola, serif;

    @media screen and (max-width: 840px) {
      font-size: 41px;
    }
    @media screen and (max-width: 730px) {
      font-size: 36px;
    }
  `;
  const TextDesc = styled.p`
    flex: wrap;
    max-width: 440px;
    font-weight: 600;
    font-size: 27px;
    color: black;
    font-family: New Century Schoolbook, TeX Gyre Schola, serif;

    @media screen and (max-width: 840px) {
      font-size: 23px;
    }
    @media screen and (max-width: 730px) {
      font-size: 18px;
    }
  `;

  return (
    <Container>
      <TextWrapper>
        <TextHeading>Crime in South Carolina</TextHeading>
        <TextDesc>A county based view on crime in SC</TextDesc>
      </TextWrapper>
    </Container>
  );
}
