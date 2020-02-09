import React, {Component} from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from '@material-ui/core/Typography';

class SelectWho extends Component {

    constructor(props){
        super(props);
        if (this.props.login == false) {
            Router.push('/');
        }
        this.state = {
            userList : [],
            textAreaValue : '',
            message : null,
            currentSelectedUsers : []
        }

        this.logined = this.logined.bind(this);
        //this.onChecked = this.onChecked.bind(this);
        this.doAction = this.doAction.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    // login, logout 処理
    logined(){
        console.log('logined.');
    }

    logouted(){
        Router.push('/');
    }

    /*　自前で書いたけど、handleToggleで代用できるから不要になった。
    onChecked(userid, e) {
        const currentSelectedUsers = this.state.currentSelectedUsers ? this.state.currentSelectedUsers : [];
        currentSelectedUsers.push(userid)
        // はまりポイント：
        // 以下で {currentSelectedUsers : currentSelectedUsers.push(userid)}としたら
        // currentSelectedUsers に 1 という数字が入って配列じゃないためpushできないという現象
        // Array.push は 戻り値として length を返すため
        e.target.checked ? 
        this.setState({currentSelectedUsers : currentSelectedUsers})
        :
        this.setState({currentSelectedUsers : currentSelectedUsers.filter(elem => elem !== userid)})
    }
    */

    handleToggle = userid => () => {
        const currentIndex = this.state.currentSelectedUsers.indexOf(userid);
        const newChecked = [...this.state.currentSelectedUsers];
    
        console.log('inside HANDLETOGGLE')
        console.log(currentIndex)
        console.log(newChecked)
        console.log('what is this.state?')
        console.log(this.state);
        if (currentIndex === -1) {
          newChecked.push(userid);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        this.setState({currentSelectedUsers : newChecked});
    };

    getUserList = (self = this) => {
        console.log('now inside getUserList function.');
        let db = firebase.firestore(); // firestore のオブジェクト取得
    
        db.collection('news-user')
        .get()
        .then(function(querySnapshot) {
            let userList = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            userList.push(
                doc.id
            );
            })
            self.setState({userList: userList});
        });
    }

    onChangeText = e => {
        this.setState({textAreaValue: e.target.value});
    }

    // データの登録処理
    doAction = (article, userid, e) => {    
        console.log('doActionの中');
        console.log('userid is');
        console.log(userid);
        let db = firebase.firestore();
        const date = firebase.firestore.Timestamp.fromDate(new Date());
        // Firestore の登録処理

        if (this.state.currentSelectedUsers.length === 0 || this.state.currentSelectedUsers === null || this.state.currentSelectedUsers === undefined){
            this.setState({message : '共有する相手を1人以上選択してください'});
            return null;
        }

        db.collection('share').add({
            title: article.title,
            description: article.description,
            image: article.urlToImage,
            url: article.url,
            sharedFrom: userid,
            sharedTo : this.state.currentSelectedUsers,
            comment : 
            {
                // 同時に複数ユーザーからコメントがあっても上書きされないように
                // key はタイムスタンプ（1970-01-01 0時からの経過秒数）+ userid にしている
                // 別案：date.nanoseconds を使えば + userid としなくてもかぶることは基本的にないだろうとは思われる
                [date.seconds+userid]: 
                    {
                        speaker: userid,
                        text: this.state.textAreaValue,
                        date: date
                    }
            }
        })
        .then((doc) => {
            console.log(`共有しました`);
            this.setState({message: '共有しました！続けて別の人やグループに共有することもできます。', textAreaValue: '', currentSelectedUsers: []});
            setTimeout(() => {this.setState({message: null})}, 2000);
        })
        .catch((error) => {
            console.log(`共有に失敗しました。リトライしてください。`);
            this.setState({message: '共有に失敗しました。リトライしてください。', textAreaValue: '', currentSelectedUsers: []});
            setTimeout(() => {this.setState({message: null})}, 2000);
        });

        this.setState({
            title: '',
            description: '',
            image: '',
            url: '',
            sharedFrom : '',
            sharedTo : '',
            comment : '',
        })
    }

    render(){
        const article = this.props.article;
        const userid = this.props.userid;
        (this.state.userList.length === 0 || this.state.userList === undefined) && this.getUserList();
        let dispList = [];
        this.state.userList.map(userid => dispList.push(
            <ListItem key={userid} role={undefined} dense button onClick={this.handleToggle(userid)}>
            <ListItemIcon>
            <Checkbox
                edge="start"
                tabIndex={-1}
                checked={this.state.currentSelectedUsers.indexOf(userid) !== -1}
                disableRipple
                inputProps={{ 'aria-labelledby': userid }}
            />
            </ListItemIcon>
            <ListItemText id={userid} primary={userid}/>
            </ListItem>)
        );

        return (
            <div>
                <Typography variant="body1" gutterBottom>誰に共有しますか？</Typography>
                <List>
                    {dispList}
                </List>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Comment"
                    placeholder="コメントを入力（任意）"
                    multiline
                    rowsMax="5"
                    size="medium"
                    value={this.state.textAreaValue}
                    onChange={this.onChangeText}
                    variant="outlined"
                    />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={(e) => this.doAction(article, userid, e)}>確定</Button>
                    </Grid>
                </Grid>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

SelectWho = connect((state) => state) (SelectWho);
export default SelectWho;