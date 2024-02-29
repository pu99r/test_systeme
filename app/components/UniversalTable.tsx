import React, { useState } from "react";
import EditTable from "./editTable"

type DataType = {
  id: number;
  [key: string]: any;
};

type TableProps = {
  data: DataType[];
};

const UniversalTable: React.FC<TableProps> = ({ data, nameof }) => {
  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [editString, setEditString] = useState<string | null>(null);
  const [editStringKey, setEditStringKey] = useState<string | null>(null);
  const [isEditOpen, setisEditOpen] = useState(false);


  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(search.toLowerCase())
    )
  );

  function formatObject(obj) {
    let formattedString = "";
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        formattedString += `${key} - ${obj[key]}, `;
      }
    }

    formattedString = formattedString.slice(0, -2);
    return formattedString;
  }

  function formatDate(value) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,3}Z$/;
    if (dateRegex.test(value)) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}/${month}/${day} ${hours}:${minutes}`;
    }
    return value;
  }

  const handleEditClick = (id: number) => {
    openEdit()
    const item = filteredData.find((item) => item.id === id);
    if (item) {
      const firstRow = Object.entries(item)
        .filter(([key]) => key !== "id")
        .map(([key, value]) => {
          if (typeof value === "boolean") {
            return value ? "yes" : "no";
          } else if (typeof value === "object") {
            return formatObject(value);
          } else {
            return formatDate(value);
          }
        })[0];
      const firstRowKey = Object.keys(item).find((key) => item[key] === firstRow);
      setEditString(firstRow);
      setEditStringKey(firstRowKey);
    }
    setEditId(id);
  };

  const openEdit = () => setisEditOpen(true);
  const closeEdit = () => setisEditOpen(false);

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map(
              (key) => key !== "id" && <th key={key}>{key}</th>
            )}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              {Object.entries(item).map(
                ([key, value]) =>
                  key !== "id" && (
                    <td key={key}>
                      {typeof value === "boolean"
                        ? value
                          ? "yes"
                          : "no"
                        : typeof value === "object"
                        ? formatObject(value)
                        : formatDate(value)}
                    </td>
                  )
              )}
              <td>
                <button onClick={() => handleEditClick(item.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditOpen && (
        <EditTable
          onClose={closeEdit}
          editId={editId}
          editString={editString}
          editStringKey={editStringKey}
          nameof={nameof}
        />
      )}
    </div>
  );
};

export default UniversalTable;
