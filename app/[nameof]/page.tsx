
import MainTable from "../components/mainTable"
export default function Table({params}) {
  return (
    <div>
      <MainTable nameof = {params.nameof}/>
    </div>
  );
}