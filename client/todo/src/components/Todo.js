import React, { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../env";
const Todo = () => {
  const name = useRef();
  const task = useRef();
  const status = useRef();
  const time_to_complete = useRef();
  // const [name, setName] = useState("");
  // const [task, setTask] = useState("");
  // const [status, setStatus] = useState("");
  // const [time_to_complete, setTimeToComplete] = useState("");
  const [response, setResponse] = useState("");
  const [server_res, setServerResponse] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name.current.value,
      task: task.current.value,
      status: status.current.value,
      time_to_complete: time_to_complete.current.value,
    };
    console.log("Data before submitting", data);
    window.location.reload(false);
    fetch(BASE_URL + "/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("result", result);
        setServerResponse(!server_res);
        setResponse(result.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-fluid">
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
              // value={name.current.value}
              ref={name}
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
              // value={task.current.value}
              ref={task}
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
              ref={status}
              // value={status.current.value}
              // onChange={(e) => {
              //   setStatus(e.target.value);
              // }}
              required
            >
              <option selected>Status</option>
              <option value="Done" className="bg-success">
                Done
              </option>
              <option value="Pending" className="bg-warning">
                Pending
              </option>
              <option value="Missed" className="bg-danger">
                Missed
              </option>
              <option value="Canceled" className="bg-danger">
                Canceled
              </option>
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
              // value={time_to_complete}
              ref={time_to_complete}
              min={new Date().toISOString().split("T")[0]}
              // onChange={(e) => {
              //   setTimeToComplete(e.target.value);
              // }}
            />
          </div>

          <button
            class="btn btn-primary"
            // onClick={() => {
            //   handleSubmit();
            // }}
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </div>

        {server_res ? response : null}
      </div>
    </>
  );
};

export default Todo;
