import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as moment from 'moment';

function Post(props) {
  return (
    <div>
      <div className='post-container'>
        <div class='main-line'>
          <a href={props.url} class='post-title' target="_blank" rel='noopener noreferrer'>{props.title}</a>
          <p class='post-time'>{props.time}</p>
        </div>
        <div class='secondary-line'>
          <small>/u/{props.author}</small>
        </div>
      </div>
    </div>

  )
}

function PostList(props) {

  return props.posts.data.map(post => (
    <Post title={post.title} time={moment(post.created_utc * 1000).format('L LT')} url={post.url} author={post.author}></Post>
  ))

}



class App extends Component {

  state = {
    posts: { data: [] }
  };

  async componentDidMount() {
    this.makeApiCall();

    this.interval = setInterval(() => {
      this.makeApiCall()
    }, 15000)

  }

  makeApiCall() {

    fetch('http://api.pushshift.io/reddit/search/submission/?q=mookie&subreddit=baseball')
      .then(res => {
        return res.json()
      })
      .then(data => {

        this.setState({ posts: data })
      }).catch(console.log)
  }


  render() {
    return (
      <div class='main-container'>
        <h1>this is why we f5</h1>
        <small class='name-label'>by /u/cityinspain</small>

        <PostList posts={this.state.posts}></PostList>
      </div>

    );
  }
}

export default App;
