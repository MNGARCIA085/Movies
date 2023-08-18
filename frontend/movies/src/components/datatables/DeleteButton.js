import React, { useState } from 'react';
import axios from 'axios';

const DeleteButton = ({ id, onDelete }) => {
  const [isLoading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setLoading(true);
      try {
        await axios.delete(`API_ENDPOINT_URL/${id}`);
        onDelete(id);
      } catch (error) {
        console.error('Error deleting item:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button class="btn btn-danger" onClick={handleDelete} className="delete-button" disabled={isLoading}>
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
