import React from "react";
type Props = {
  params: {
    id: string;
  };
};
async function Description({ params }: Props) {
  const id = params.id;
  return <div>{id}</div>;
}

export default Description;
