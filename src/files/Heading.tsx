import React from "react";
type Props = {
  message: string;
};
function Heading({ message }: Props) {
  return (
    <h1 className="text-2xl text-center sm:pb-5  relative top-0 text-slate-700 pb-2 dark:text-slate-200">
      {message}
    </h1>
  );
}

export default Heading;
