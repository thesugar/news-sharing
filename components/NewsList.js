import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

class NewsList extends Component {

    constructor(props){
        super(props);
    }

    // get data from Firebase
    getNews = async () => {
        // fill your API key!
        const url = "https://newsapi.org/v2/everything?q=mufg&sortBy=popularity&apiKey=***";
        let self = this;

        const result = await fetch(url);
        const json = await result.json();

        this.props.dispatch({
            type : 'UPDATE_USER',
            value : {
                articles: json.articles
            }
        })
    }

    render() {
        this.props.articles.length === 0 && this.getNews();
        const itemList = [];
        this.props.articles.map((article, index) => {
            itemList.push(
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
        })

        return (
            <div>
            <ul>
                {itemList}
            </ul>
            </div>
        );
    }
}

NewsList = connect((state) => state)(NewsList);
export default NewsList;