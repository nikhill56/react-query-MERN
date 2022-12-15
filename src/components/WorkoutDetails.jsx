import React from "react";
import { useQueryClient } from "react-query";
const WorkoutDetails = ({ workout }) => {
  //! REACT QUERY
  const queryClient = useQueryClient();
  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });

    //! REACT QUERY

    const json = await response.json();
    if (!response.ok) {
      console.log("Fuck you sumedh");
    }
    if (response.ok) {
      queryClient.invalidateQueries("workoutData");
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
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
