import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import alive from "../assets/alive.svg";
import dead from "../assets/dead.svg";
import unknown from "../assets/unknown.svg";
import male from "../assets/male.svg";
import female from "../assets/female.svg";
import genderless from "../assets/genderless.svg";
import "../styles/Details.css";

const Details = () => {
  const [character, setCharacter] = useState({});
  const param = useParams();

  console.log(character);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("characters"));
    setCharacter(temp[param.id - 1]);
  }, []);

  return (
    <div
      className="detail-container"
      style={{
        display: "flex",
      }}
    >
      <Link to="/" className="back-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
      </Link>
      <div
        className="data-container"
        style={{
          display: "flex",
        }}
      >
        <img
          className="character-image"
          src={character.image}
          alt={character.name}
        />
        <div className="character-details">
          <div className="status-row">
            <OverlayTrigger
              className="button-container"
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="button-tooltip" className="button-tooltip">
                  Status: {character.status}
                </Tooltip>
              }
            >
              <img
                className="status"
                src={
                  character.status == "Alive"
                    ? alive
                    : character.status == "Dead"
                    ? dead
                    : unknown
                }
                alt={"status: " + character.status}
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </OverlayTrigger>
            <OverlayTrigger
              className="button-container"
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id="button-tooltip" className="button-tooltip">
                  Gender: {character.gender}
                </Tooltip>
              }
            >
              <img
                className="gender"
                src={
                  character.gender == "Male"
                    ? male
                    : character.gender == "Female"
                    ? female
                    : character.gender == "unknown"
                    ? unknown
                    : genderless
                }
                alt={"gender(" + character.gender + ")"}
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </OverlayTrigger>
          </div>
          <h3>{character.name}</h3>
          <h5>Species: {character.species}</h5>
          <h5>Type: {character.type}</h5>
          <h5>Origin: {character.origin?.name || "err"}</h5>
          <h5>Location: {character.location?.name || "err"}</h5>
        </div>
      </div>
    </div>
  );
};

export default Details;
