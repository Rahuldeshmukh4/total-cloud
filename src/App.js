import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import { Link } from "react-router-dom";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [check, setCheck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  function onClickRefresh() {
    getTodos();
  }

  function getTodos() {
    setLoading(true);
    fetch("https://reqres.in/api/users?delay=3")
      .then((response) => response.json())
      .then((apiResponse) => {
        setTodos(apiResponse.data);
        setLoading(false);
      });
  }

  function sortByPriceAsc() {
    setLoading(true);
    todos.sort((a, b) => {
      let fa = a.first_name.toLowerCase(),
        fb = b.first_name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    setCheck(1);
    setLoading(false);
  }

  function sortByLastName() {
    setLoading(true);
    todos.sort((a, b) => {
      let fa = a.last_name.toLowerCase(),
        fb = b.last_name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    setCheck(1);
    setLoading(false);
  }

  function simpleData() {
    getTodos();
  }

  if (check === 1) {
    buildCard();
  }

  function buildCard() {
    return (
      <Row>
        {todos.map((todo) => {
          return (
            <Col md={4} key={todo.id}>
              <Link
                to={`/userDetails/${todo.id}`}
                className="btn-text"
                variant="secondary"
              >
                <Card>
                  <CardImg src={todo.avatar} alt="card img" />
                  <Card Body color="bg-primary">
                    {console.log(todo.first_name)}
                    <p>
                      <strong>First Name: </strong>
                      {todo.first_name}
                    </p>
                    <p>
                      <strong>Last Name:</strong>
                      {todo.last_name}
                    </p>
                  </Card>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    );
  }

  return (
    <Container>
      <div class="page-header" class="text-center">
        <h1>Users</h1>
      </div>
      {!loading && (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onClickRefresh()}
        >
          Refresh
        </button>
      )}
      <div style={{ float: 'right' }} color="primary" className="float-right">
        {!loading && (
          <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen((prevState) => !prevState)}
          >
            <DropdownToggle color="primary" caret size="md">
              Sort By
            </DropdownToggle>
            <DropdownMenu>
              {<DropdownItem onClick={() => simpleData()}>None</DropdownItem>}
              {
                <DropdownItem onClick={() => sortByPriceAsc()}>
                  First Name
                </DropdownItem>
              }
              {
                <DropdownItem onClick={() => sortByLastName()}>
                  Last Name
                </DropdownItem>
              }
            </DropdownMenu>
          </ButtonDropdown>
        )}
      </div>

      {
        loading ? (
          <div class="text-center">
            <p>Loading</p>
          </div>
        ) : (
          <p> </p>
        )
      }
      {
        loading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
            </div>
          </div>
        ) : (
          buildCard()
        )
      }
    </Container >
  );
}
