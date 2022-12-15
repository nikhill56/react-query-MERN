import React, { useState } from "react";
import { useMutation ,useQueryClient} from "react-query";
const WorkoutForm = () => {
    const queryClient=useQueryClient();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [errors, setErrors] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //! REACT QUERY

    const json = await response.json();
    if (!response.ok) {
      setErrors(json.error);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setErrors(null);
      queryClient.invalidateQueries('workoutData')
    }
  };
  const { isError, isLoading, error, mutate } = useMutation(() =>
    fetch("/api/workouts", {
      method: "POST",
      body: { title, load, reps },
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
  return (
    <div className="">
      <form
        className="create"
        onSubmit={handleSubmit}
      >
        <h3>Add A New Workout</h3>
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => {
            setLoad(e.target.value);
          }}
          value={load}
        />
        <label>Reps (in kg):</label>
        <input
          type="number"
          onChange={(e) => {
            setReps(e.target.value);
          }}
          value={reps}
        />
        <button type="submit">Add Workout</button>
        {error && <div className="error">{error} </div>}
      </form>
    </div>
  );
};

export default WorkoutForm;
