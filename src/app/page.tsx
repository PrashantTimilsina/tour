import React from "react";
import TourCart from "@/files/TourCart";
import connect from "@/db/db";
connect();
function App() {
  return (
    <div>
      <TourCart />
    </div>
  );
}

export default App;
