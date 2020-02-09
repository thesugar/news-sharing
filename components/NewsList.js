import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Link from 'next/link';
import NewsCard from '../components/NewsCard';
import Account from '../components/Account';
import firebase from "firebase";
import Grid from '@material-ui/core/Grid';

class NewsList extends Component {

    constructor(props){
        console.log('NewsListのconstructor');
        super(props);
        this.logined = this.logined.bind(this);
    }

    // get data from Firebase
    getNews = async () => {
        // fill your API key!
        const url = "https://newsapi.org/v2/top-headlines?country=jp&apiKey=30d451b495234aae8b35d83d68082817";
        let self = this;

        const result = await fetch(url);
        const json = await result.json();

        this.props.dispatch({
            type : 'UPDATE_USER',
            value : {
                articles: json.articles,
                userid : this.props.userid
            }
        })
    }

    logined(){
        console.log('loginしました');
        //this.getFireData();
    }

    logouted(){
        console.log('logoutしました');
    }
    
    /*
            <li key={index.toString}>
                <Link href="/p/[id]" as={`/p/${index}`}>
                {article['title']}
                </Link>
            <ul>
                <li key="0"><img src={article['urlToImage']} width="100" height="100" /></li>
                <li key="1">{article['description']}</li>
                <li key="2">{article['content']}</li>
            </ul>
            </li>);
    */

    render() {
        console.log('NewsListのrender()');
        console.log('今のthis.propsは');
        console.log(this.props);
        this.props.articles.length === 0 && this.getNews();
        const itemList = [];
        this.props.articles.map((article, index) => {
            itemList.push(
                <Grid item xs={4}><NewsCard title={article['title']} image={article['urlToImage']} description={article['description']} index={index} /></Grid>
            );
        })

        return (
            <div>
                <Grid container spacing={6}>{itemList}</Grid>
            </div>
        );
    }
}

NewsList = connect((state) => state)(NewsList);
export default NewsList;