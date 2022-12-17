import React from "react";
import { useQueryClient } from "react-query";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
const WorkoutDetails = ({ workout }) => {
  //! REACT QUERY
  const queryClient = useQueryClient();
  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });

    //! REACT QUERY

    if (!response.ok) {
      console.log("Error");
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
      <p className="text-xl">
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;
