import { useEffect, useState } from "react";
import { InputGroup, Table } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken, removeToken } from "../features/token/tokenSlice";
import { updateDatabase } from "../features/database/databaseSlice";

const Dashboard = () => {
  const token = useSelector(getToken) || localStorage.getItem("token");

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  const [active, setActive] = useState({});

  const [addItem, setAddItem] = useState({
    name: "",
    imageUrl: "",
    buyPrice: 0,
    sellPrice: 0,
    stock: 0,
  });
  const [add, setAdd] = useState(false);
  const closeAdd = () => setAdd(false);
  const showAdd = () => setAdd(true);
  const handleAdd = (e) => {
    e.preventDefault();
    const newTemp = [...temp];
    newTemp.unshift(addItem);
    localStorage.setItem("database", JSON.stringify(newTemp));
    setTemp(newTemp);
    setShown(newTemp);
    closeAdd();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setShow(true);
    setActive(index);
  };

  const [warning, setWarning] = useState(false);
  const closeWarning = () => setWarning(false);
  const showWarning = (index) => {
    setWarning(true);
    setActive(index);
  };

  const [temp, setTemp] = useState(
    JSON.parse(localStorage.getItem("database")) ||
      Array(42)
        .fill({
          name: "barang",
          imageUrl:
            "http://nutech-integrasi.com/wp-content/uploads/2019/09/Logo-Nutech-ok.png",
          buyPrice: 5000,
          sellPrice: 5500,
          stock: 200,
        })
        .map(
          (item, index) =>
            (item.name = { ...item, name: `Barang ${index + 1}` })
        )
  );

  const [shown, setShown] = useState(temp);

  const [controlledBuyPrice, setControlledBuyPrice] = useState();
  const [controlledSellPrice, setControlledSellPrice] = useState();
  const [controlledStock, setControlledStock] = useState();

  const move = (action) => {
    if (action === "next") {
      setCurrentPage((prev) => prev + 1);
    } else setCurrentPage((prev) => prev - 1);
  };

  const perPage = (value) => {
    setLimit(Number(value));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const newTemp = [...temp];
    newTemp.splice(active, 1);
    localStorage.setItem("database", JSON.stringify(newTemp));
    setTemp(newTemp);
    setShown(newTemp);
    closeWarning();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(updateDatabase(temp));
    dispatch(removeToken());
    navigate("/");
  };

  const [exist, setExist] = useState();
  const [empty, setEmpty] = useState();
  const checkExist = (e) => {
    e.preventDefault();
    e.target.value === "" ? setExist(true) : null;
    const names = temp.map((item) => item.name);
    setExist(names.includes(e.target.value));
  };

  useEffect(() => {
    addItem.name === "" ? setEmpty(true) : setEmpty(false);
  }, [addItem]);

  return (
    <div>
      <h3
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "left",
          marginTop: "1rem",
        }}
      >
        <div className="left-container">
          <span>{token}</span>
          <button onClick={(e) => handleLogout(e)}>Logout</button>
        </div>
        <div className="search-container">
          <Form
            className="d-flex"
            style={{
              width: "500px",
            }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => {
                e.preventDefault();
                const newShown = temp.filter((obj) =>
                  obj.name.includes(e.target.value)
                );
                setShown(newShown);
              }}
            />
          </Form>
        </div>
        <Button
          className="add-btn"
          variant="success"
          style={{
            width: "200px",
          }}
          onClick={() => showAdd()}
        >
          Add Items
        </Button>
      </h3>

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
          <thead>
            <tr className="position-sticky" style={{ top: 0 }}>
              <th>Product Name</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((item, index) => {
              if (
                index >= (currentPage - 1) * limit &&
                index < (currentPage - 1) * limit + limit
              )
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={item?.imageUrl}
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
                          marginTop: "1rem",
                        }}
                      >
                        <span>{item.name}</span>

                        <OverlayTrigger
                          className="button-container"
                          placement="top"
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
                          <Button
                            variant="outline-light"
                            onClick={() => handleShow(index)}
                            style={{
                              display: "flex",
                              textAlign: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
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
                          </Button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          className="button-container"
                          placement="top"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip
                              id="button-tooltip"
                              className="button-tooltip"
                            >
                              Remove
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="outline-light"
                            onClick={() => showWarning(index)}
                            style={{
                              display: "flex",
                              textAlign: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {item.buyPrice}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {item.sellPrice}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                      }}
                    >
                      {item.stock}
                    </td>
                  </tr>
                );
            })}
          </tbody>
        </Table>
      </div>

      {/* PAGINATION CONTROL */}
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
        {currentPage == Math.ceil(shown.length / limit) ? null : (
          <button id="next" onClick={(e) => move(e.target.id)}>
            next
          </button>
        )}
      </div>

      {/* ADD ITEM MODAL */}
      <Modal show={add} onHide={closeAdd} className="modal-edit">
        <Modal.Header closeButton>
          <Modal.Title>{temp[active]?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={exist || empty ? null : handleAdd}>
            <Form.Group className="mb-3" controlId="buy">
              <Form.Label>Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  onChange={(e) => {
                    e.preventDefault();
                    setAddItem((prev) => {
                      return { ...prev, name: e.target.value };
                    });
                    checkExist(e);
                  }}
                  isInvalid={exist || empty}
                />
                {exist || empty ? (
                  <Form.Control.Feedback type="invalid" tooltip>
                    {empty ? "Field Required" : "Item Name Already Exist"}
                  </Form.Control.Feedback>
                ) : null}
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="buy">
              <Form.Label>Buy Price</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setAddItem((prev) => {
                    return { ...prev, buyPrice: parseInt(e.target.value) };
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="sell">
              <Form.Label>Sell Price</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setAddItem((prev) => {
                    return { ...prev, sellPrice: parseInt(e.target.value) };
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Available Stock</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setAddItem((prev) => {
                    return { ...prev, stock: parseInt(e.target.value) };
                  });
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="buy">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  setAddItem((prev) => {
                    return { ...prev, imageUrl: e.target.value };
                  });
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={exist || empty}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* EDIT DATA MODAL */}
      <Modal show={show} onHide={handleClose} className="modal-edit">
        <Modal.Header closeButton>
          <Modal.Title>{temp[active]?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const newTemp = temp.map((obj, index) => {
                // 👇️ if id equals 2, update country property
                if (index === active) {
                  return {
                    ...obj,
                    buyPrice: controlledBuyPrice,
                    sellPrice: controlledSellPrice,
                    stock: controlledStock,
                  };
                }

                // 👇️ otherwise return the object as is
                return obj;
              });
              setTemp(newTemp);
              handleClose();
            }}
          >
            <Form.Group className="mb-3" controlId="buy">
              <Form.Label>Buy Price</Form.Label>
              <Form.Control
                type="text"
                defaultValue={temp[active]?.buyPrice}
                onChange={(e) => {
                  e.preventDefault();
                  setControlledBuyPrice(parseInt(e.target.value));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="sell">
              <Form.Label>Sell Price</Form.Label>
              <Form.Control
                type="text"
                defaultValue={temp[active]?.sellPrice}
                onChange={(e) => {
                  e.preventDefault();
                  setControlledSellPrice(parseInt(e.target.value));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="stock">
              <Form.Label>Available Stock</Form.Label>
              <Form.Control
                type="text"
                defaultValue={temp[active]?.stock}
                onChange={(e) => {
                  e.preventDefault();
                  setControlledStock(parseInt(e.target.value));
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* DELETE WARNING MODAL */}
      <Modal show={warning} onHide={closeWarning} className="modal-warning">
        <Modal.Header closeButton>
          <Modal.Title>Warning !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete item: {temp[active]?.name} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeWarning}>
            Cancel
          </Button>
          <Button variant="danger" onClick={(e) => handleDelete(e)}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
