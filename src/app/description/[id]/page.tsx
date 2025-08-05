import Description from "@/files/Description";

type Props = {
  params: {
    id: Promise<{ id: string }>;
  };
};

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  return <Description id={resolvedParams.id} />;
}
