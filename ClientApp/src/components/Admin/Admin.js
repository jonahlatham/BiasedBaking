import React from 'react';
import './Admin.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Admin() {
  const handleGrantAccess = async () => {
    const body = {
      IsActive: true
    };
    const response = await axios.post(`/vote/grantAccess`, body);
  };
  return (
    <div className="Admin-App">
      <Button
        onClick={handleGrantAccess}
        variant="contained"
        className="Admin-button"
      >
        Default
      </Button>
    </div>
  );
}

export default Admin;
