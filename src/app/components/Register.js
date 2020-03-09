import React, {Component} from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
            textAreaValue : '',
            message : null,
            ok : false
        }

        this.doAction = this.doAction.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        
    }

    onChangeText = e => {
        this.setState({textAreaValue: e.target.value});
        this.checkId(e.target.value);
    }

    // データの登録処理
    doAction = (userid, e) => {    

        let db = firebase.firestore();

        // Firestore の登録処理
        db.collection('news-user').doc(userid).set({
            userid : userid,
            email : firebase.auth().currentUser.email
        })
        .then((doc) => {
            this.setState({message: 'ID登録が完了しました', textAreaValue: ''});
            this.props.dispatch({
                type: 'UPDATE_USER',
                value: {
                    login: true,
                    userid: userid,
                    email: firebase.auth().currentUser.email,
                    articles: this.props.articles,
                    itemList : this.props.itemList,
                    articlesSharedByFriends : this.props.articlesSharedByFriends,
                    articlesSharedToFriends: this.props.articlesSharedToFriends,
                    fetchSharedBy : this.props.fetchSharedBy,
                    fetchSharedTo : this.props.fetchSharedTo
                }
            });
            setTimeout(() => {Router.push('/')}, 2000);
        })
        .catch((error) => {
            console.log(`登録に失敗しました。リトライしてください。`);
            this.setState({message: 'ID登録に失敗しました。リトライしてください。', textAreaValue: ''});
            setTimeout(() => {this.setState({message: null})}, 2000);
        });
    }

    checkId = userId => {

        if (userId === '' || userId === undefined || userId === null){
            return null;
        }

        if (!userId.match(/^[A-Za-z0-9]*$/)){
            this.setState({message: 'ユーザーIDには半角英数字のみ利用できます。', ok:false})
            return null
        }

        if (userId.length > 15){
            this.setState({message: 'ユーザーIDは半角英数字で15字以内にしてください。', ok:false})
            return null
        }

        let db = firebase.firestore();
        
        // 入力のたびに Firestore に照会行くのやばい？
        // 一回だけユーザーリスト取得しきって，あとはアプリ内でチェックすると DBアクセス的には優しい
        // でも上記のやり方だと，規模が大きくなったら，そうしてる間にIDの衝突が発生しそう．
        db.collection("news-user").where("userid", "==", userId)
        .get().then((querySnapshot) => {

            if (querySnapshot.docs[0].id === undefined){
                this.setState({message : userId + 'はユーザーIDとして登録できます。', ok:true})
            } else {
                this.setState({message : userId + 'はすでに存在します。', ok: false})
            }
        }).catch(error => {
            console.log(error);
            this.setState({message : userId + 'はユーザーIDとして登録できます。', ok:true})
        })
    }


    render(){

        return (
            <div>
                <Typography variant="body1" gutterBottom>ユーザー登録</Typography>
                <Grid container spacing={3} alignItems="center">
                    <Grid item>メールアドレス：</Grid>
                    <Grid item>{firebase.auth().currentUser.email}</Grid>
                </Grid>
                <br />
                <Typography variant="body1" color="primary" gutterBottom>このアプリで使うIDを登録しよう！</Typography>
                <br />
                <Typography variant="body2" color="primary" gutterBottom>登録したIDは他のユーザーにも表示されます。<br/>
                メールアドレスは他のユーザーには表示されません。</Typography>
                <br />
                <Grid container spacing={8} alignItems="center">
                    <Grid item>
                    <form className='id-box' noValidate autoComplete="off">
                    <TextField id="filled-basic" label="ID" variant="filled" size="small"
                    value={this.state.textAreaValue} onChange={this.onChangeText}/>
                    </form>
                    </Grid>
                    <Grid item>
                        {this.state.ok ? 
                        <Button variant="contained" color="primary" onClick={(e) => this.doAction(this.state.textAreaValue, e)}>登録</Button>
                        :
                        <Button variant="contained" disabled>登録</Button>}
                    </Grid>
                </Grid>
                <Typography variant="body1" color={this.state.ok ? "textPrimary" : "error"} gutterBottom>
                {this.state.message}
                </Typography>
            </div>
        );
    }
}

Register = connect((state) => state) (Register);
export default Register;