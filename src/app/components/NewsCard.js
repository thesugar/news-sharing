import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import SelectWho from '../components/SelectWho'
import SimpleModal from '../components/Modal'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
  },
  media: {
    height: 300,
  },
}));

export default function NewsCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
      <Link href="/p/[id]" as={`/p/${props.index}`}>
        <CardMedia
          className={classes.media}
          image={props.image}
          title={props.title}
        />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="body2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {String(props.description).slice(0, 50)}…
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <SimpleModal buttonText="共有する" color='inherit' size='small' content={<SelectWho article={props.article} userid={props.userid}/>}/>
        <Link href="/p/[id]" as={`/p/${props.index}`}>
        <Button size="small">
          詳細を見る
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}