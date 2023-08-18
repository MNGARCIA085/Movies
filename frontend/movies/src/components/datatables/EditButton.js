import React from 'react';
import { Link } from 'react-router-dom';

const EditButton = ({ id }) => {
  return (
    <Link to={`/edit/${id}`} className="edit-button">
      Edit
    </Link>
  );
};

export default EditButton;
