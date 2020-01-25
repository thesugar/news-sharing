import React, {Component} from 'react';

export default class NewsList extends Component {

    state = {
        articles: [],
        refreshing: false,
    }

    getNews = async () => {
        this.setState({ refreshing: true });
        // fill your API key!
        const url = "https://newsapi.org/v2/everything?q=mufg&from=2019-12-25&to=2020-01-24&sortBy=popularity&apiKey=*********";
        try {
            const result = await fetch(url);
            const json = await result.json();
            // console.log(json);
            this.setState({
                articles: json.articles,
                refreshing: false
            });
        } catch (e) {
            this.setState({ refreshing: false });
            console.log(e);
        }
    }

    componentDidMount = () => { 
        this.getNews();
    }

    render() {
        const itemList = [];
        this.state.articles.map(article => {
            itemList.push(
            <li>
                {article['title']}
            <ul>
                <li><img src={article['urlToImage']} width="100" height="100" /></li>
                <li>{article['description']}</li>
                <li>{article['content']}</li>
            </ul>
            </li>);
        })
        
        console.log(this.state.articles);
        return (
            <div>
            <ul>
                {itemList}
            </ul>
            </div>
        );
    }
}
