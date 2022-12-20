import React from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useQuery } from "react-query";
import { useAuthContext } from "../hooks/useAuthContext";
const Home = () => {
  const { user } = useAuthContext();
  const { isLoading, error, data } = useQuery(
    "workoutData",
    () =>
      fetch("http://localhost:5000/api/workouts", {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      }).then((res) => {
        console.log("Res", res);
        return res.json();
      }),
    {
      //! REACT QUERY FETCH
      cacheTime: 3000,
      staleTime: 0,
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
    }
  );

  //! REACT QUERY EXAMPLE

  if (isLoading) return "Loading...";
  // console.log("Data is", data);

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="home">
      <div className="workouts">
        {data &&
          data.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
