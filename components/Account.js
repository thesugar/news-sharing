import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase";
import Router from "next/router";

class Account extends Component {

    constructor(props){
        console.log('Account.jsのconstructor')
        super(props);
        this.login_check = this.login_check.bind(this);
        this.match_user = this.match_user.bind(this);
    }

    match_user = (result) => {
    
        let db = firebase.firestore();
        // メールアドレスをもとに、マッチするユーザーを探してユーザーIDを取得
        // 下のブロックの中でもresult.userは生きてるので他の認証情報とかを取ってくることもできる
        db.collection("news-user")
        .where('email', '==', result.user.email).get().then((querySnapshot) => {
            // success
            console.log(querySnapshot.docs[0].data());
            this.props.dispatch({
                type: 'UPDATE_USER',
                value: {
                    login: true,
                    userid : querySnapshot.docs[0].data().userid,
                    articles : this.props.articles
                }
            });
        }).catch(error => {
            console.log(error);
            Router.push('/register')
        })
    }

    login(){
        console.log('Account.jsのlogin()')
        let provider = new firebase.auth.GoogleAuthProvider();
        let self = this;
        let db = firebase.firestore();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        firebase.auth().signInWithPopup(provider)
        .then((result) => {
            this.match_user(result);
            //ログイン後に処理を行う場合，以下コメントアウトを解除（onLogined()を呼び出し元でちゃんと定義したうえで）
            //this.props.onLogined();
        });
    }

    logout(){
        console.log("logout");
        firebase.auth().signOut();
        this.props.dispatch({
            type: 'UPDATE_USER',
            value: {
                login: false,
                userid : 'annonymous',
                email: '',
                articles: this.props.articles
            }
        });
        //ログアウト後に処理を行いたい場合（トップページに戻るなど），以下コメントアウトを解除(onLogouted()を呼び出し元で定義したうえで)
        //this.props.onLogouted();
    }

    // check if user is logged in or logged out
    login_check(){
        console.log('Account.jsのlogin_check()');
        if (this.props.login === undefined || this.props.login == false){
            this.login();
        } else {
            this.logout();
        }
    }

    render(){
        console.log('Account.jsのrender()');
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in.
              this.username_ = user.displayName;
            } else {
              // No user is signed in.
            }
          });

        return (
                <span className="acount"
                onClick={this.login_check}>
                    {this.props.userid}
                </span>
        );
    }
}

Account = connect((state) => state)(Account);
export default Account;