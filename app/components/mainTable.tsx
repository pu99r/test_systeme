"use client";

import React, { useEffect, useState } from "react";
import UniversalTable from "./UniversalTable";

export default function MainTable({ nameof }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`api/${nameof}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  });

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return <UniversalTable data={data} nameof={nameof}  />;
}