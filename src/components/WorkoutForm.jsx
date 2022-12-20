import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutForm = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [errors, setErrors] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setErrors("You must be logged in");
      return;
    }
    const workout = { title, load, reps };
    const response = await fetch(`${process.env.REACT_APP_SERVER}/api/workouts`, {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    //! REACT QUERY

    const json = await response.json();
    if (!response.ok) {
      setErrors(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setErrors(null);
      console.log("new workout added", json);
      queryClient.invalidateQueries("workoutData");
    }
  };
  const { error } = useMutation(() =>
    fetch(`${process.env.REACT_APP_SERVER}/api/workouts`, {
      method: "POST",
      body: { title, load, reps },
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
  return (
    <div className="">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add A New Workout</h3>
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => {
            setLoad(e.target.value);
          }}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        <label>Reps (in kg):</label>
        <input
          type="number"
          onChange={(e) => {
            setReps(e.target.value);
          }}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button type="submit">Add Workout</button>
        {(error || errors) && <div className="error">{errors} </div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
