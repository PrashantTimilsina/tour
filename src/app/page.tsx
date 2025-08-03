import React from "react";
import Home from "@/files/Home";
import connect from "@/db/db";
connect();
function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
