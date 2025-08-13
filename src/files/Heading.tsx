import React from "react";

function Heading({ message }) {
  return (
    <h1 className="text-2xl text-center sm:pb-5  relative top-0 text-slate-700 pb-2 dark:text-slate-200">
      {message}
    </h1>
  );
}

export default Heading;
