import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    const response = await fetch("/api/workouts" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h2>{workout.title}</h2>
      <p className="text-2xl">
        <strong>Load(kg):</strong>
        {"  "}
        {workout.load}
      </p>
      <p className="text-xl">
        <strong>Reps(kg):</strong>
        {"  "}
        {workout.reps}
      </p>
      <p className="text-xl">{workout.createdAt}</p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;
