import React, {Component} from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import SimpleModal from '../components/Modal'
import AddComment from './AddComment';

class ShareInfo extends Component {

    constructor(props){
        super(props);
    }

    render(){

        console.log('inside ShareInfo.js. this props is')
        console.log(this.props);
        return (
            //TODO: display comment + fromWho & ToWho (who can see their talk), make it possible to reply.
            <div>
                <ul>
                    {
                    <div>
                    <h1>{this.props.articlesSharedByFriends[this.props.shareId]['title']}</h1>
                    <img src={this.props.articlesSharedByFriends[this.props.shareId]['image']} />
                    <p>{this.props.articlesSharedByFriends[this.props.shareId]['description']}</p>
                    <p><a href={this.props.articlesSharedByFriends[this.props.shareId]['url']} target="_blank">全文を読む</a></p>
                    <p>from: {this.props.articlesSharedByFriends[this.props.shareId]['sharedFrom']}<br />
                    to: {this.props.articlesSharedByFriends[this.props.shareId]['sharedTo'].map(value => value + ' ')}</p>
                    {/*<p>{this.props.articlesSharedByFriends[this.props.shareId]['comment']}</p>
                    */}
                    <AddComment shareId={this.props.shareId}/>
                    </div>
                    }
                </ul>
            </div>
        )
    }
}

ShareInfo = connect((state) => state)(ShareInfo);
export default ShareInfo;