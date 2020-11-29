import React from 'react';
import './Register.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

function Register(props) {
  const [nickname, setNickname] = React.useState('');
  const [pie, setPie] = React.useState('');

  const classes = useStyles();

  const handleSubmit = async () => {
    const body = {
      Name: nickname
    };
    if (!nickname) {
      alert('You need to put a nickname');
    } else {
      const response = await axios.post(`/user/register`, body);
      const body2 = {
        Name: pie,
        UserId: response.data.id
      };
      if (body2.Name !== '') {
        await axios.post(`/user/pie`, body2);
      }
      await handleNickname('');
      await handlePie('');
      await localStorage.setItem('nickname', response.data.id);
      if (response.data) {
        props.history.push('/vote');
      } else {
        alert('Times up');
      }
    }
  };

  const handleNickname = payload => {
    setNickname(payload);
  };

  const handlePie = payload => {
    setPie(payload);
  };

  return (
    <div className="Register-App">
      <form className={classes.root} noValidate autoComplete="off">
        <div className="Register-container">
          <TextField
            id="outlined-search"
            label="Add Nickname"
            placeholder="Poolslug"
            variant="outlined"
            onChange={e => handleNickname(e.target.value)}
            value={nickname}
          />
          <TextField
            id="outlined-search"
            label="Add a pie"
            placeholder="Pumpkin Pie"
            variant="outlined"
            onChange={e => handlePie(e.target.value)}
            value={pie}
          />
          <div style={{ display: 'flex' }}>
            <Link className="link" to="/login">
              <Button className="Login-button" color="primary">
                Login
              </Button>
            </Link>
            <Button
              onClick={handleSubmit}
              className="Register-button"
              variant="contained"
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
