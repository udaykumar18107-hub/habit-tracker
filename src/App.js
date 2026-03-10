import React, { useState, useEffect } from "react";

function App() {

  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

  // Load habits from local storage
  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits"));
    if (storedHabits) {
      setHabits(storedHabits);
    }
  }, []);

  // Save habits to local storage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (e) => {
    e.preventDefault();

    if (habit.trim() === "") return;

    const newHabit = {
      id: Date.now(),
      text: habit,
      completed: false
    };

    setHabits([...habits, newHabit]);
    setHabit("");
  };

  const toggleHabit = (id) => {
    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, completed: !h.completed } : h
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  return (
    <div className="container">

      <h1>Daily Habit Tracker</h1>

      <form onSubmit={addHabit}>
        <input
          type="text"
          placeholder="Enter a habit"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {habits.length === 0 ? (
        <p className="empty">No habits added</p>
      ) : (
        <ul>
          {habits.map((h) => (
            <li key={h.id} className={h.completed ? "done" : ""}>

              <span onClick={() => toggleHabit(h.id)}>
                {h.text}
              </span>

              <button onClick={() => deleteHabit(h.id)}>
                Delete
              </button>

            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default App;