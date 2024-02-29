import React, { useState } from "react";

const EditTable: React.FC<{
  onClose: () => void;
  editString: string;
  editStringKey: string;
  nameof: string;
  editId:string;
}> = ({ onClose, editString, editStringKey, nameof, editId }) => {
  const [editedString, setEditedString] = useState(editString);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedString(event.target.value);
  };

  const handleSave = () => {
    console.log(nameof)
    fetch(`api/${nameof}`, {
      method: "POST",
      body: JSON.stringify({ [editStringKey]: editedString, id: editId}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          onClose();
        } else {
          throw new Error("Failed to save");
        }
      })
      .catch((error) => {
        console.error("Error saving:", error);
      });
  };

  return (
    <div>
      <input type="text" value={editedString} onChange={handleInputChange} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Exit</button>
    </div>
  );
};

export default EditTable;
