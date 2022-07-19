import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    color: "#3f8acd",
  });
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("create");
  const [message2, setMessage2] = useState("");

  //function for updating values
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  //Submit handler
  async function onSubmit(e) {
    e.preventDefault();
    setMessage("inserting Item");
    const newItem = { ...form };
    console.log(form);
    await axios
      .post("https://t-odolistserver.herokuapp.com/insert", {
        title: newItem.title,
        description: newItem.description,
        color: newItem.color,
      })
      .then(function (response) {
        setName(response.data.item.title);
        console.log(response);
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
    setMessage("create");
    setForm({ title: "", description: "", color: "" });
  }
  //

  // Fetch data
  useEffect(() => {
    axios
      .get("https://t-odolistserver.herokuapp.com/")
      .then(function (response) {
        let data2 = response.data;
        setData(data2);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [message,message2]);

  //Delete handler
  const deleteItem = (id) => {
    const confirmation=window.confirm("Do you Really want to delete ?");
    if(confirmation){
      axios.delete(`https://t-odolistserver.herokuapp.com/${id}`)
      .then(function(response){
        console.log(response.data.message)
        setMessage2(response.data.message);
        setTimeout(() => {
          setMessage2("");
        }, 1000);
      })
    }
}
  //Update handler
  const updateHandler =async  (id) => {
    setMessage2("Item is updated Succefully")
    let newColor=prompt("Write Your new color")
    let newDescription=prompt("Write Your new Description")
    await axios.put('https://t-odolistserver.herokuapp.com/',{
      newColor:newColor,
      newDescription:newDescription,
      id:id,
    }).then(function(response){
      setTimeout(() => {
        setMessage2("");
      }, 1000);
    })
  };


  return (
    <div className="container pb-5">
      <div className="row">
        <h4 id="show"></h4>
        <div className="col-md-6 container">
          <h3 className="fw-semibold text-center">CREATE ToDo ITEM</h3>
          <form
            className="p-4 bg-primary bg-opacity-25 mt-4 shadow"
            onSubmit={onSubmit}
          >
            <div className="mb-3">
              <p className="fs-5 text-center lh-1" htmlFor="title">
                Title
              </p>
              <input
                className="form-control"
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => {
                  updateForm({ title: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <p className="fs-5 text-center lh-1" htmlFor="title">
                Description
              </p>
              <textarea
                className="form-control"
                name="description"
                rows="5"
                value={form.description}
                onChange={(e) => {
                  updateForm({ description: e.target.value });
                }}
              />
            </div>
            <div className="mb-5">
              <p htmlFor="exampleColorInput" className="fs-5 text-center lh-1">
                Choose a Priority Color
              </p>
              <input
                type="color"
                className="form-control form-control-color rounded-0 mx-auto"
                id="exampleColorInput"
                value={form.color}
                title="Choose your color"
                onChange={(e) => {
                  updateForm({ color: e.target.value });
                }}
              />
            </div>
            <button className="btn btn-primary rounded-0 d-block mx-auto fw-bold fs-5">
              {message}
            </button>
          </form>
        </div>
        <div className="col-md-6 container">
          <h3 className="fw-semibold text-center">ToDo List</h3>
          <h5 className="text-center fw-bold text-success">{message2}</h5>
          <table className="table mt-4 table-striped table-borderless shadow">
            <thead>
              <tr className="bg-primary bg-opacity-25">
                <th scope="col">Priority</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
              {data.map((data) => (
                <tr key={data._id} className="bg-light">
                  <td>
                    <p
                      className="color-circle"
                      style={{ background: data.color }}
                    ></p>
                  </td>
                  <td className="p-2">{data.title}</td>
                  <td className="p-2">{data.description}</td>
                  <td className="d-flex justify-content-evenly align-items-cente p-2">
                    <span
                      id="btns"
                      onClick={() => {
                        deleteItem(data._id);
                      }}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </span>
                    |
                    <span id="btns" onClick={()=>updateHandler(data._id)}>
                    <i className="bi bi-pen"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Todo;
