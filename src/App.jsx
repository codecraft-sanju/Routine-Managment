import React, { useState, useEffect } from "react";
import RoutineApp from "./components/RoutineApp";
import Signup from "./components/Signup.jsx";

const App = () => {
  const [username, setUsername] = useState(null);

  
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleSignUp = (name) => {
    setUsername(name);
    localStorage.setItem("username", name); // Save username to localStorage
  };

  return (
    <div className="App">
      {username ? (
        <RoutineApp username={username} />
      ) : (
        <Signup onSignUp={handleSignUp} />
      )}
    </div>
  );
};

export default App;
