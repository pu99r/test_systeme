import MainTable from "../components/MainTable"
export default function Table({params}) {
  return (
    <div>
      <MainTable nameof = {params.nameof}/>
    </div>
  );
}