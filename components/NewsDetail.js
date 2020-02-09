import React, {Component} from 'react';
import {connect} from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import ShareNews from '../components/ShareNews'
import SelectWho from '../components/SelectWho'
import SimpleModal from '../components/Modal'

class NewsDetail extends Component {

    constructor(props){
        super(props);
    }

    render(){

        console.log('this props is')
        console.log(this.props);
        return (
            <div>
                <ul>
                    {
                    <div>
                    <h1>{this.props.articles[this.props.newsIndex]['title']}</h1>
                    <img src={this.props.articles[this.props.newsIndex]['urlToImage']} />
                    <p>{this.props.articles[this.props.newsIndex]['description']}</p>
                    <p><a href={this.props.articles[this.props.newsIndex]['url']} target="_blank">提供元サイトで全文を読む</a></p>
                    <SimpleModal buttonText="共有する" content={<SelectWho article={this.props.articles[this.props.newsIndex]} userid={this.props.userid}/>}/>
                    </div>
                    }
                </ul>
            </div>
        )
    }
}

NewsDetail = connect((state) => state)(NewsDetail);
export default NewsDetail;