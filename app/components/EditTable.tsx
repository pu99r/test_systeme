import React, { useState } from "react";

const EditTable: React.FC<{
  onClose: () => void;
  editString: string;
  editStringKey: string;
  nameof: string;
  editId: string;
}> = ({ onClose, editString, editStringKey, nameof, editId }) => {
  const [editedString, setEditedString] = useState(editString);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedString(event.target.value);
  };

  const handleSave = () => {
    fetch(`api/${nameof}`, {
      method: "POST",
      body: JSON.stringify({id: editId, [editStringKey]: editedString }),
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
    <div className="edit-table-overlay">
      <div className="edit-table-container">
        <input type="text" value={editedString} onChange={handleInputChange} />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Exit</button>
      </div>
    </div>
  );
};

export default EditTable;
