import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase";
import Router from "next/router";
import Grid from '@material-ui/core/Grid';
import NewsCard from '../components/NewsCard';
import TextField from '@material-ui/core/TextField';

class MyDrawer extends Component {

    constructor(props){
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.sideList = this.sideList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            left: false,
            getHeadline : false,
            category : false,
            country : "jp",
            sortBy : "popularity",
            pageSize : 100,
            fetch : true,
            query : ""
        }
    }

    toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({ ...this.state, [side]: open });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({query: this.state.value, value: '', getHeadline:false, category: false, fetch:true, ['left']: false})
    }

    getNews = async () => {
        console.log('drawerのgetNews')

        // 以下の早期 return がないと、Drawerがレンダリングされるたびに、state（正確にはreduxのstore）に
        // 保持する記事が書き換わって、特定のカテゴリーを選択しても裏で持ってる記事はつねにHeadlineになってしまう
        if (!this.state.getHeadline && !this.state.category && !this.state.query) { return }

        let url;
        url = this.state.getHeadline ?
            "https://newsapi.org/v2/top-headlines?country="+this.state.country+"&apiKey=30d451b495234aae8b35d83d68082817&pageSize="+this.state.pageSize+"&sortBy="+this.state.sortBy:
        (this.state.category) ?
            // category 指定があるとき（Chipを選択したとき）
            "https://newsapi.org/v2/top-headlines?country="+this.state.country+"&apiKey=30d451b495234aae8b35d83d68082817&pageSize="+this.state.pageSize+"&sortBy="+this.state.sortBy+"&category="+this.state.category:
            // query指定あるとき（検索時）（country指定はできない）
            "https://newsapi.org/v2/everything?q="+this.state.query+"&apiKey=30d451b495234aae8b35d83d68082817&pageSize="+this.state.pageSize+"&sortBy="+this.state.sortBy;
        
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
                itemList : itemList,
                articlesSharedByFriends : this.props.articlesSharedByFriends
            }
        })

        this.setState({fetch : false});
    }
    
    sideList = side => (
        <div
          className="drawer"
          role="presentation"
          //onClick={this.toggleDrawer(side, false)}
          //onKeyDown={this.toggleDrawer(side, false)}
        >
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <TextField id="filled-basic" label="Search" variant="filled" size="small" onChange={(event)=>this.setState({value:event.target.value})}/>
          </form>
          <List>
              <ListItem button key="Headline">
                  <ListItemText primary="Headline" onClick={()=>this.setState({getHeadline:true, fetch:true, query: '', category: false, [side]: false})}/>
              </ListItem>
            {['Technology', 'Business', 'Entertainment', 'Sports', 'Science'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} onClick={()=>
                    this.setState({category :text, getHeadline: false, fetch: true, query: '', [side]: false})
                }/>
              </ListItem>
            ))}
          </List>
        </div>
    );
    
    render(){
        console.log('drawerのrender')
        console.log(this.state)
        this.state.fetch && this.getNews();

        return (
            <>
            <span>
            <MenuIcon onClick={this.toggleDrawer('left', true)} />
            <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                {this.sideList('left')}
            </Drawer>
            </span>
            </>
        );
    }
}

MyDrawer = connect((state) => state)(MyDrawer);
export default MyDrawer;