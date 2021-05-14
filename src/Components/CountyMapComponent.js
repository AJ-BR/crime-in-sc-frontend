import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Select from "react-select";
import styled from "styled-components";
import "./CountyMapStyleSheet.css";

export default function CountyMapComponent() {
  const [county, setCounty] = useState(null);
  const [crime, setCrime] = useState(null);
  const [year, setYear] = useState(null);
  const [crimeCount, setCrimeCount] = useState(-1);
  const [cardColor, setCardColor] = useState("secondary");
  const [progressCircleVisible, setProgressCircleVisible] = useState(false)

  //when component has mounted
  useEffect(() => {
    require("./SimpleMapsResources/mapdata.js");
    require("./SimpleMapsResources/statemap.js");

    window.simplemaps_statemap.hooks.zoomable_click_state = function (id) {
      setCounty(window.simplemaps_statemap_mapdata.state_specific[id].name);
    };
    //window.simplemaps_statemap_mapdata.main_settings.state_url='javascript:alert("Send users to a url (like http://simplemaps.com). Or, activate a javascript function upon click.");';
  }, []);

  //when county, crime, or year has changed
  useEffect(() => {
    if (crime && year && county) {
      sendRequest();
    }
  }, [crime, year, county]);

  const Container = styled.div`
    padding-top: 20px;
    font-family: New Century Schoolbook, TeX Gyre Schola, serif;

    .h1 {
      font-size: 40px;
      position: center;
      font-weight: 700;
      margin-bottom: -10px;
    }

    .h3 {
      margin-bottom: 500px;
      position: center;
    }

    .row {
      display: flex;
      flex: wrap;
      justify-content: flex-start;
      margin-top: 20px;
      margin-left: 10px;
      margin-right: 0px;

      @media screen and (max-width: 730px) {
        margin-left: 2px;
        align-content: flex-start;
      }
    }
  `;

  const MapContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: center;
    overflow: hidden;
    #map {
      /* left: 2vw; */
      position: center;
      margin-top: 30px;
      padding-top: 0px;

      @media screen and (max-width: 730px) {
        left: 0vw;
        margin-left: 0;
        padding: 0;
        margin-bottom: 0;
        transform: scale(0.7, 0.7);
      }
    }
  `;

  const ResultsCard = styled(Card)`
    flex: wrap;
    position: relative;
    width: 25rem;
    height: 10rem;
    margin-top: 8rem;
    margin-left: 2rem;
    padding: 0px;

    @media screen and (max-width: 730px) {
      margin-top: 0rem;
      margin-left: 0px;
      width: 50rem;
    }
  `;

  //enumerate the crimes
  const crimes = [
    { label: "aggravated-assault", value: 1 },
    { label: "burglary-breaking-and-entering", value: 2 },
    { label: "larceny-theft-offenses", value: 3 },
    { label: "motor-vehicle-theft", value: 4 },
    { label: "homicide-offenses", value: 5 },
    { label: "justifiable-homicide", value: 6 },
    { label: "rape", value: 7 },
    { label: "statutory-rape", value: 8 },
    { label: "kidnapping-abduction", value: 9 },
    { label: "robbery", value: 10 },
    { label: "arson", value: 11 },
    { label: "crime-against-property", value: 12 },
    { label: "hacking-computer-invasion", value: 13 },
    { label: "prostitution", value: 14 },
    { label: "gambling-offenses", value: 15 },
    { label: "drunkenness", value: 16 },
    { label: "driving-under-the-influence", value: 17 },
  ];

  //create array consisting of years 1991-2019
  var years = [];
  for (var crimeYear = 1991; crimeYear < 2020; crimeYear++) {
    years.push({ label: crimeYear, value: crimeYear - 1990 });
  }

  const sendRequest = () => {
    if (county && crime.label && year.label) {

      fetch(
        `https://crime-in-sc.herokuapp.com/api?county=${county}&crime=${crime.label}&year=${year.label}`
      )
        .then((response) => response.json())
        .then((data) => setCrimeCount(data.total))
        .then(setCardColor("success"))
        .then(setCrimeCount(-1))

    }
  };
  return (
    <>
      <Container>
        <h1>Welcome!</h1>
        <h3>
          {" "}
          To start, select a crime type and a year, then click on a county
        </h3>
        <div class="row">
          <div className="col-md-4">
            <Select
              options={crimes}
              placeholder="Select Crime..."
              onChange={setCrime}
              value={crime}
            />
          </div>
          <div className="col-md-4">
            <Select
              options={years}
              placeholder="Select Year..."
              onChange={setYear}
              value={year}
            />
          </div>
        </div>
      </Container>

      <div className="MapAndResultsClass">
        <div id="map" />
        <ResultsCard bg={cardColor} text="white">
          <Card.Header>Results</Card.Header>
          <Card.Body>
            <Card.Title>
              {(county && crime && year)
                ? county
                : "Select a crime, a year, and a county"}
            </Card.Title>
            <Card.Text>
            {
              (() => {
                if (county && crime && year && crimeCount != -1)
                    return "In " +year.label +" there were " +crimeCount +" incidents of " +crime.label
                if (county && crime && year && crimeCount == -1)
                    return "Loading..."
                else 
                    return ""
              })()
            }
            </Card.Text>
          </Card.Body>
        </ResultsCard>
      </div>
    </>
  );
}
