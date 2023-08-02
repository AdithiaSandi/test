import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  //get items from localstorage "characters"
  // console.log(JSON.parse(localStorage.getItem("characters") || "[]"));

  const fetchCharacters = async (url, arr) => {
    try {
      const response = await fetch(url);
      const Data = await response.json();
      arr = [...arr, ...Data.results];

      if (Data && Data.info && Data.info.next) {
        await fetchCharacters(Data.info.next, arr);
      } else {
        setData(arr);

        //localStorage can only store data as strings
        localStorage.setItem("characters", JSON.stringify(arr));
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("characters")) {
      setData(JSON.parse(localStorage.getItem("characters")));
    } else {
      const apiUrl = "https://rickandmortyapi.com/api/character?page=1";
      fetchCharacters(apiUrl, []);
    }
  }, []);

  const move = (action) => {
    if (action === "next") {
      setCurrentPage((prev) => prev + 1);
    } else setCurrentPage((prev) => prev - 1);
  };

  const perPage = (value) => {
    setLimit(Number(value));
  };

  return (
    <>
      <div>
        <h1>
          <a
            href=""
            style={{
              textDecoration: "none",
            }}
          >
            Characters
          </a>
        </h1>
        <div className="data-table">
          <Table
            striped
            bordered
            hover
            variant="dark"
            responsive
            style={{
              textAlign: "center",
              color: "white",
            }}
          >
            <thead className="position-sticky">
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                if (
                  index >= (currentPage - 1) * limit &&
                  index < (currentPage - 1) * limit + limit
                )
                  return (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt=""
                          style={{
                            width: "300px",
                            height: "300px",
                            backgroundColor: "#80808066",
                          }}
                        />
                        <div
                          className="name-container"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <span>{item.name}</span>
                          <OverlayTrigger
                            className="button-container"
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                              <Tooltip
                                id="button-tooltip"
                                className="button-tooltip"
                              >
                                More Details
                              </Tooltip>
                            }
                          >
                            <Link to={"character/" + item.id}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                              </svg>
                            </Link>
                          </OverlayTrigger>
                        </div>
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                        {item.location.name}
                      </td>
                      <td
                        style={{
                          verticalAlign: "middle",
                        }}
                      >
                        {item.status}
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </Table>
        </div>

        <div className="controls">
          <div>
            <label htmlFor="cars">Per Page</label>
            <select
              name="cars"
              id="cars"
              onChange={(e) => perPage(e.target.value)}
            >
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          {currentPage == 1 ? null : (
            <button id="prev" onClick={(e) => move(e.target.id)}>
              prev
            </button>
          )}
          <span>{currentPage}</span>
          <button id="next" onClick={(e) => move(e.target.id)}>
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
