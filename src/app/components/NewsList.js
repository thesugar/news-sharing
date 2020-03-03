import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Link from 'next/link';
import NewsCard from '../components/NewsCard';
import Account from '../components/Account';
import firebase from "firebase";
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';

class NewsList extends Component {

    constructor(props){
        console.log('NewsListのconstructor');
        super(props);
        this.logined = this.logined.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            getHeadline : true,
            category : false,
            country : "jp",
            sortBy : "popularity",
            pageSize : 100,
            fetch : true,
            query : ""
        }

    }

    // get data from Firebase
    getNews = async () => {
        // fill your API key!

        let url;
        url = this.state.getHeadline ?
            "https://newsapi.org/v2/top-headlines?country="+this.state.country+"&apiKey=30d451b495234aae8b35d83d68082817&pageSize="+this.state.pageSize+"&sortBy="+this.state.sortBy:
        (this.state.category) ?
            // category 指定があるとき（Chipを選択したとき）
            "https://newsapi.org/v2/top-headlines?country="+this.state.country+"&apiKey=30d451b495234aae8b35d83d68082817&pageSize="+this.state.pageSize+"&sortBy="+this.state.sortBy+"&category="+this.state.category:
            // query指定あるとき（検索時）（country指定はできない）
            "https://newsapi.org/v2/everything?q="+this.state.query+"&apiKey=30d451b495234aae8b35d83d68082817&pageSize="+this.state.pageSize+"&sortBy="+this.state.sortBy;

        console.log('inside getNews')
        console.log(url);
        
        const result = await fetch(url);
        const json = await result.json();

        let itemList = [];
        json.articles.map((article, index) => {
            itemList.push(
                <Grid item xs={12} sm={4}><NewsCard title={article['title']} image={article['urlToImage']} description={article['description']} index={index} /></Grid>
            );
        })

        this.props.dispatch({
            type : 'UPDATE_USER',
            value : {
                login: this.props.login,
                articles: json.articles,
                userid : this.props.userid,
                itemList : itemList
            }
        })

        this.setState({fetch : false});
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

    handleSubmit = event => {
        event.preventDefault();
        this.setState({query: this.state.value, value: '', getHeadline:false, category: false, fetch:true})
    }

    render() {
        console.log('NewsListのrender()');
        console.log('今のthis.propsは');
        console.log(this.props);
        this.state.fetch && this.getNews();

        let category;
        let getHeadline;

        return (
            <>
            <div>
            <Grid container direction="row" justify="center" alignItems="center" spacing={5}>
                <Grid item><Chip clickable color={this.state.getHeadline? "primary" : "inherit"} label="Headline" onClick={() =>this.setState({getHeadline:true, fetch:true, query: '', category: false})}/></Grid>
                <Grid item><Chip clickable color={this.state.category === "technology" ? "primary" : "inherit"} label="Technology" onClick={() =>this.setState({category :'technology', getHeadline: false, fetch: true, query: ''})}/></Grid>
                <Grid item><Chip clickable color={this.state.category === "business"   ? "primary" : "inherit"} label="Business" onClick={() =>this.setState({category :'business', getHeadline: false, fetch: true, query: ''})}/></Grid>
                <Grid item><Chip clickable color={this.state.category === "entertainment" ? "primary" : "inherit"} label="Entertainment" onClick={() =>this.setState({category :'entertainment', getHeadline: false, fetch: true, query: ''})}/></Grid>
                <Grid item><Chip clickable color={this.state.category === "sports" ? "primary" : "inherit"} label="Sports" onClick={() =>this.setState({category :'sports', getHeadline: false, fetch: true, query: ''})}/></Grid>
                <Grid item><Chip clickable color={this.state.category === "science" ? "primary" : "inherit"} label="Science" onClick={() =>this.setState({category :'science', getHeadline: false, fetch: true, query: ''})}/></Grid>
                <Grid item><Chip clickable color={this.state.query === "三菱UFJ" ? "primary" : "inherit"} label="MUFG" onClick={() =>this.setState({query:'三菱UFJ', getHeadline: false, category:false, fetch: true})}/></Grid>
                <Grid item>
                <div>
                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                        <Grid item>
                            <SearchIcon />
                        </Grid>
                        <Grid>
                        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                        <TextField id="filled-basic" label="Search" variant="filled" size="small" onChange={(event)=>this.setState({value:event.target.value})}/>
                        </form>
                        </Grid>
                    </Grid>
                </div>
                </Grid>
            </Grid>
            </div>
            <div>
                <Typography variant="body2" color='primary' gutterBottom>
                <br />
                {this.props.itemList === null || this.props.itemList === undefined || this.props.itemList.length === 0 ? this.state.query + "の検索結果はありませんでした":
                (this.state.query && this.state.query !== '三菱UFJ') ? this.state.query + "の検索結果を表示しています" : null}
                </Typography>
                <Grid container spacing={6}>{this.props.itemList}</Grid>
            </div>
            </>
        );
    }
}

NewsList = connect((state) => state)(NewsList);
export default NewsList;