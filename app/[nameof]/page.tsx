interface ParamsType {
  nameof: string;
}

import MainTable from "../components/MainTable";

export default function Table({ params }: { params: ParamsType }) {
  return (
    <div>
      <MainTable nameof={params.nameof} />
    </div>
  );
}
