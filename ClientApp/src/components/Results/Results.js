import React from 'react';
import './Results.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

function Results() {
  const [results, setResults] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    const getStuff = async () => {
      const stuff = await axios.get(`/vote/results`);
      await setResults(stuff.data);
    };
    getStuff();
  }, []);

  const crap = results.reduce((r, e) => {
    r[e.id] = e.votes.reduce((y, x) => {
      y += x.rank;
      return y;
    }, 0);
    return r;
  }, {});

  const myCrap = results
    .map((e, i) => {
      e.score = crap[e.id];
      return e;
    })
    .sort((a, b) => {
      return a.score - b.score;
    });

  const badgeNum = i => {
    if (i + 1 === 1) {
      return `${i + 1}st`;
    } else if (i + 1 === 2) {
      return `${i + 1}nd`;
    } else if (i + 1 === 3) {
      return `${i + 1}rd`;
    } else {
      return `${i + 1}th`;
    }
  };

  const badgeCol = i => {
    if (i + 1 === 1) {
      return 'error';
    } else if (i + 1 === 2) {
      return 'primary';
    } else if (i + 1 === 3) {
      return 'secondary';
    } else {
      return '';
    }
  };

  const showCrap = myCrap.map((e, i) => {
    const votesR = e.votes.map((y, z) => {
      if (z % 2 !== 0) {
        return (
          <div>
            {y.username}: {y.rank}
          </div>
        );
      }
    });
    const votesL = e.votes.map((y, z) => {
      if (z % 2 === 0) {
        return (
          <div>
            {y.username}: {y.rank}
          </div>
        );
      }
    });
    return (
      <div className="Results-pies">
        <Badge badgeContent={badgeNum(i)} color={badgeCol(i)}>
          <Card className={classes.root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {e.name}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                style={{ marginBottom: '10px' }}
              >
                <i>by {e.user}</i>
              </Typography>
              <Divider />
              <div class="Results-results">
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {votesL}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {votesR}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Badge>
      </div>
    );
  });

  console.log(myCrap);

  return (
    <div>
      <div>{showCrap}</div>
    </div>
  );
}

export default Results;
