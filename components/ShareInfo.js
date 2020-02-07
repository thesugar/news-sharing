import React, {Component} from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import SimpleModal from '../components/Modal'

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
                    <img src={this.props.articlesSharedByFriends[this.props.shareId]['urlToImage']} />
                    <p>{this.props.articlesSharedByFriends[this.props.shareId]['description']}</p>
                    <p><a href={this.props.articlesSharedByFriends[this.props.shareId]['url']} target="_blank">全文を読む</a></p>
                    </div>
                    }
                </ul>
            </div>
        )
    }
}

ShareInfo = connect((state) => state)(ShareInfo);
export default ShareInfo;