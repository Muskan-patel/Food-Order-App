import { useState, useEffect } from "react";
import MealItem from './MealItem';
import useHttp from "../hooks/useHttp";

const requestConfig = {};
export default function Meals() {
    // const [loadedMeals, setLoadedMeals] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     async function fetchMeals() {
    //         setIsLoading(true);
    //         try {
    //             const response = await fetch('http://localhost:3000/meals');
                
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch meals');
    //             }
                
    //             const meals = await response.json();
    //             setLoadedMeals(meals);
    //         } catch (error) {
    //             setError(error.message || 'Something went wrong!');
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
        
    //     fetchMeals();
    // }, []);

    // if (isLoading) {
    //     return <p className="center">Loading meals...</p>;
    // }

    // if (error) {
    //     return <p className="center error">{error}</p>;
    // }
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp('https://backend-visc.onrender.com/meals',  requestConfig, []);

     

    if (isLoading) {
        return <p className="center">fetching meals...</p>;
    }
     
    // if(!data) {
    //     return <p>No</p>
    // }


    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
}