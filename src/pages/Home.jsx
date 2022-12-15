import React, { useState, useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
// import axios from 'axios';

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  // useEffect(() => {
  //   const fetchWorkouts = async () => {
  //     const response = await fetch("/api/workouts");
  //     const json = await response.json();
  //     console.log(json);
  //     if (response.ok) {
  //       setWorkouts(json);
  //     }
  //   };
  //   fetchWorkouts();
  // }, []);

  const { isLoading, error, data, isFetching } = useQuery(
    "workoutData",
    () =>
      fetch("http://localhost:5000/api/workouts").then((res) => {
        console.log("Res", res);
        return res.json();
      }),
    {                                                             //! REACT QUERY FETCH
      cacheTime: 3000,
      staleTime: 0,
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
    }
  );

  // return (
  //   <div className="home">
  //     <div className="workouts">
  //       {workouts &&
  //         workouts.map((workout) => (
  //           <WorkoutDetails key={workout._id} workout={workout} />
  //         ))}
  //     </div>
  //     <WorkoutForm />
  //   </div>
  // );

  //! REACT QUERY EXAMPLE

  if (isLoading) return "Loading...";
  console.log("Data is", data);

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
