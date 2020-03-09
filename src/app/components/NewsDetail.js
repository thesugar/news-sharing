import React, {Component} from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import SelectWho from '../components/SelectWho'
import SimpleModal from '../components/Modal'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


class Image extends Component {  
  render() {
    let {mode, src, height, width, style, ...props} = this.props;
    let modes = {
      'fill': 'cover',
      'fit': 'contain'
    };
    let size = modes[mode] || 'contain';

    let defaults = {
      height: height || 100,
      width: width || 100,
      backgroundColor: 'transparent'
    };

    let important = {
      backgroundImage: `url("${src}")`,
      backgroundSize: size,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat'
    };

    return <div {...props} style={{...defaults, ...style, ...important}} />
  }
}

const style = theme => ({
    
    img: {
        maxWidth : '10%'
    },
    
    ul: {
        backgroundColor: theme.palette.background.paper, //リストの背景色いじる場合はここ
        padding: 0,
    },

})

class NewsDetail extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return (
            <div>
                <div>
                <Typography gutterBottom variant="body2" component="div">
                <h1>{this.props.articles[this.props.newsIndex]['title']}</h1>

                <Image src={this.props.articles[this.props.newsIndex]['urlToImage']} width={400} height={300} mode='fit'/>
                <p>
                {this.props.articles[this.props.newsIndex]['description']}
                </p>
                <a href={this.props.articles[this.props.newsIndex]['url']} target="_blank">提供元サイトで全文を読む</a>
                <SimpleModal buttonText="共有する" variant="contained" color="primary" size="medium"
                content={<SelectWho article={this.props.articles[this.props.newsIndex]} userid={this.props.userid}/>}/>
                </Typography>
                </div>
            </div>
        )
    }
}


NewsDetail = withStyles(style)(connect((state) => state)(NewsDetail));
export default NewsDetail;