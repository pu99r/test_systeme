"use client";

import React, { useEffect, useState } from "react";
import EditTable from "./EditTable";

type DataType = {
  id: number;
  [key: string]: any;
};

const UniversalTable: React.FC<{ nameof: string }> = ({ nameof }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [editId, setEditId] = useState<number | null>(null);
  const [editString, setEditString] = useState<string | null>(null);
  const [editStringKey, setEditStringKey] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, [isEditOpen]);

  const fetchData = () => {
    fetch(`api/${nameof}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };
  const filteredData = data.filter(
    (item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(search.toLowerCase())
      ) &&
      (activeFilter === "all" ||
        (activeFilter === "yes" &&
          Object.values(item).some(
            (value) =>
              value === true ||
              (typeof value === "string" && value.toLowerCase() === "yes")
          )) ||
        (activeFilter === "no" &&
          Object.values(item).some(
            (value) =>
              value === false ||
              (typeof value === "string" && value.toLowerCase() === "no")
          )))
  );
  const formatDate = (value: any): any => {
    console.log(typeof value);
    console.log(value);
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
  };
  const handleEditClick = (id: number) => {
    openEdit();
    setEditId(id);
    const item = filteredData.find((item) => item.id === id);
    if (item) {
      let firstRowEntry = Object.entries(item)
        .find(([key]) => key !== "id");
  
      if (firstRowEntry) {
        const [firstRowKey, firstRowValue] = firstRowEntry;
        if (typeof firstRowValue === "string") {
          setEditString(firstRowValue);
          setEditStringKey(firstRowKey);
        }
      }
    }
  };
  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);
  if (data.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        value={activeFilter}
        onChange={(e) => setActiveFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
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
              {Object.entries(item).map(([key, value]) => {
                if (key !== "id") {
                  const cellValue =
                    typeof value === "boolean" ? (value ? "yes" : "no") : value;
                  return <td key={key}>{cellValue}</td>;
                }
              })}
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
          editId={editId !== null ? editId.toString() : ''}
          editString={editString !== null ? editString.toString() : ''}
          editStringKey={editStringKey !== null ? editStringKey.toString() : ''}
          nameof={nameof !== null ? nameof.toString() : ''}
        />
      )}
    </div>
  );
};

export default UniversalTable;
