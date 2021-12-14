import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../env";
const ListTodo = () => {
  const [todos, setTodo] = useState([]);

  const name = useRef();
  const task = useRef();
  const status = useRef();
  const time_to_complete = useRef();
  // const [name, setName] = useState("");
  // const [task, setTask] = useState("");
  // const [status, setStatus] = useState("");
  // const [time_to_complete, setTimeToComplete] = useState("");
  const [updateRes, setUpdateRes] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  function handleSubmit(_id) {
    const data = {
      name: name.current.value,
      task: task.current.value,
      status: status.current.value,
      time_to_complete: time_to_complete.current.value,
    };
    // const data = {
    //   name,
    //   task,
    //   time_to_complete,
    //   status,
    // };
    window.location.reload(false);
    fetch(BASE_URL + "/update/" + _id, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        setUpdateRes(!updateRes);
        setUpdateMsg(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetch(BASE_URL + "/get", {
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        setTodo(result.data);
        // console.log(result?.data);
        // refreshPage();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteTodo = (_id) => {
    window.location.reload(false);
    fetch(BASE_URL + "/delete/" + _id, {
      method: "delete",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
      })
      .catch((err) => {
        // alert(err);
      });
  };

  const Modal = (props) => {
    // setName(props.props.name);
    // setTask(props.props.task);
    // setStatus(props.props.status);
    // setTimeToComplete(props.props.time_to_complete);
    return (
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Update Task
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setShowModal(!showModal);
              }}
            ></button>
          </div>
          <div class="modal-body bg-none">
            <div>
              <div class="mb-3">
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  required
                  type="text"
                  class="form-control"
                  id="name"
                  aria-describedby="nameHelp"
                  placeholder="Name"
                  ref={name}
                  // value={name?.current?.value}
                  // onChange={(e) => {
                  //   setName(e.target.value);
                  // }}
                />
              </div>
              <div class="mb-3">
                <label for="task" class="form-label">
                  Task
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="task"
                  aria-describedby="taskHelp"
                  placeholder="task"
                  ref={task}
                  // value={task?.current?.value}
                  // onChange={(e) => {
                  //   setTask(e.target.value);
                  // }}
                  required
                />
              </div>
              <div class="mb-3">
                <select
                  id="status"
                  class="form-select"
                  aria-label="Default select example"
                  // onChange={(e) => {
                  //   setStatus(e.target.value);
                  // }}
                  // value={status?.current?.value}
                  ref={status}
                  required
                >
                  <option selected>Status</option>
                  <option value="Done">Done</option>
                  <option value="Pending">Pending</option>
                  <option value="Missed">Missed</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="time_to_complete" class="form-label">
                  Time To Complete
                </label>
                <input
                  required
                  type="date"
                  class="form-control"
                  id="time_to_complete"
                  aria-describedby="time_to_complete"
                  placeholder="Time To Complete"
                  ref={time_to_complete}
                  min={new Date().toISOString().split("T")[0]}
                  // value={time_to_complete?.current?.value}
                  // onChange={(e) => {
                  //   setTimeToComplete(e.target.value);
                  // }}
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => {
                handleSubmit(props.props._id);
              }}
            >
              Save changes
            </button>
          </div>
          {updateRes ? updateMsg : null}
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {todos.map((item, index) => {
            return (
              <>
                <div className="col-lg-4 col-md-4 col-sm-12 mx-auto">
                  <div class="card" style={{ width: "18rem" }} key={item?._id}>
                    <div className="d-flex justify-content-around">
                      <p className="my-2  text-center">
                        {item?.time_to_complete?.slice(0, 10)}
                      </p>
                      <p
                        className={
                          item?.status == "Done"
                            ? "my-2 text-center text-success"
                            : null
                        }
                      >
                        {item?.status == "Done" ? item?.status : null}
                      </p>
                      <p
                        className={
                          item?.status == "Pending"
                            ? "my-2 text-center text-warning"
                            : null
                        }
                      >
                        {item?.status == "Pending" ? item?.status : null}
                      </p>
                      <p
                        className={
                          item?.status == "Missed"
                            ? "my-2 text-center text-danger"
                            : null
                        }
                      >
                        {item?.status == "Missed" ? item.status : null}
                      </p>
                      <p
                        className={
                          item?.status == "Canceled"
                            ? "my-2 text-center text-danger"
                            : null
                        }
                      >
                        {item?.status == "Canceled" ? item?.status : null}
                      </p>
                      <p
                        className=" my-2 text-danger"
                        onClick={() => {
                          deleteTodo(item?._id);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        X
                      </p>
                    </div>

                    <div class="card-body">
                      <h5 class="card-title">{item?.name}</h5>
                      <p class="card-text">{item?.task}</p>
                    </div>
                    <button
                      type="button"
                      class="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setShowModal(!showModal);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>{" "}
                {showModal ? <Modal props={item} /> : null}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ListTodo;
