import React from "react";
type Props = {
  params: {
    id: string | Promise<{ id: string }>;
  };
};
async function Description({ params }: Props) {
  const { id } = await params;
  return <div>{id as string}</div>;
}

export default Description;
