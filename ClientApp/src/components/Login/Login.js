import React from 'react';
import './Login.css';
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

function Login(props) {
  const [nickname, setNickname] = React.useState('');

  const classes = useStyles();

  const handleLogin = async () => {
    const body = {
      Name: nickname
    };
    if (!nickname) {
      alert('Put a nickname');
    } else {
      const user = await axios.post(`/user/login`, body);
      await handleNickname('');
      await localStorage.setItem('nickname', user.data.id);
      if (user.data) {
        props.history.push('/vote');
      } else {
        alert('Incorrect User');
      }
    }
  };

  const handleNickname = payload => {
    setNickname(payload);
  };

  return (
    <div className="Login-App">
      <form className={classes.root} noValidate autoComplete="off">
        <div className="Login-container">
          <TextField
            id="outlined-search"
            label="Insert Nickname"
            placeholder="Poolslug"
            variant="outlined"
            onChange={e => handleNickname(e.target.value)}
            value={nickname}
          />
          <div style={{ display: 'flex' }}>
            <Link className="link" to="/">
              <Button className="Login-button" color="primary">
                Register
              </Button>
            </Link>
            <Button
              onClick={handleLogin}
              className="Login-button"
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

export default Login;
