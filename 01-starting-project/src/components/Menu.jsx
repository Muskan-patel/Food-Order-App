import { useState, useEffect } from "react";
import MealItem from './MealItem';
import useHttp from "../hooks/useHttp";
import "./Menu.css";

const requestConfig = {};

export default function Menu() {
    const {
        data: loadedMeals,
        isLoading,
        error,
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Fetching our delicious meals...</p>;
    }

    if (error) {
        return <p className="center error">Failed to load menu: {error}</p>;
    }

    return (
        <section className="menu-section">
            <div className="menu-header">
                <h2>Our Menu</h2>
                <p>Explore our delicious selections made with fresh ingredients</p>
            </div>
            
            <div className="menu-filters">
                <button className="filter-btn active">All</button>
                <button className="filter-btn">Main Dishes</button>
                <button className="filter-btn">Sides</button>
                <button className="filter-btn">Desserts</button>
                <button className="filter-btn">Drinks</button>
            </div>
            
            <ul id="meals">
                {loadedMeals.map((meal) => (
                    <MealItem key={meal.id} meal={meal} />
                ))}
            </ul>
        </section>
    );
}