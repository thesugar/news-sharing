import React, {Component} from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import SimpleModal from '../components/Modal'
import AddComment from './AddComment';
import Typography from '@material-ui/core/Typography';

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

class ShareInfo extends Component {

    constructor(props){
        super(props);
    }

    render(){

        if (this.props.userid === undefined || this.props.userid === 'annonymous'){
            Router.push('/')
            return null
        }

        return (
            //TODO: display comment + fromWho & ToWho (who can see their talk), make it possible to reply.
            <div>
                <ul>
                    {
                    <div>
                    <Typography gutterBottom variant="body2" component="body">
                    <h1>{(this.props.articlesSharedByFriends[this.props.shareId] || this.props.articlesSharedToFriends[this.props.shareId])['title']}</h1>
                    <Image src={(this.props.articlesSharedByFriends[this.props.shareId] || this.props.articlesSharedToFriends[this.props.shareId])['image']} width={400} height={300} mode='fit'/>
                    <p>{(this.props.articlesSharedByFriends[this.props.shareId] || this.props.articlesSharedToFriends[this.props.shareId])['description']}</p>
                    <p><a href={(this.props.articlesSharedByFriends[this.props.shareId] || this.props.articlesSharedToFriends[this.props.shareId])['url']} target="_blank">全文を読む</a></p>
                    <p>from: {(this.props.articlesSharedByFriends[this.props.shareId] || this.props.articlesSharedToFriends[this.props.shareId])['sharedFrom']}<br />
                    to: {(this.props.articlesSharedByFriends[this.props.shareId] || this.props.articlesSharedToFriends[this.props.shareId])['sharedTo'].map(value => value + ' ')}</p>
                    {/*<p>{this.props.articlesSharedByFriends[this.props.shareId]['comment']}</p>
                    */}
                    <AddComment shareId={this.props.shareId}/>
                    </Typography>
                    </div>
                    }
                </ul>
            </div>
        )
    }
}

ShareInfo = connect((state) => state)(ShareInfo);
export default ShareInfo;