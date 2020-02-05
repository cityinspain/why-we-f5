import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as moment from 'moment';

import { disableBodyScroll } from 'body-scroll-lock';

function Post(props) {
  return (
    <div>
      <div className='post-container'>
        <div class='main-line'>
          <a href={props.url} class='post-title' target="_blank" rel='noopener noreferrer'>{props.title}</a>

        </div>
        <div class='secondary-line'>
          <span>/u/{props.author}</span>
          <span class='time-label'>{props.time}</span>
        </div>
      </div>
    </div>

  )
}

function PostList(props) {

  return(
  <div className='posts-list'>
    {props.posts.data.filter(post => post.title.toLowerCase().includes("mookie") || post.title.toLowerCase().includes("betts")).map(post => (
    <Post className='posts-list' title={post.title} time={moment(post.created_utc * 1000).format('L LT')} url={post.url} author={post.author}></Post>
  ))}

  </div>
)

}



class App extends Component {

  state = {
    posts: { data: [] },
    loading: true,
    hasCompletedInitialLoad: false
  };

  async componentDidMount() {
    this.makeApiCall();

    this.interval = setInterval(() => {
      this.makeApiCall()
    }, 15000)

  }

  makeApiCall() {
    this.setState({loading: true})

    fetch('http://api.pushshift.io/reddit/search/submission/?subreddit=baseball&size=500')
      .then(res => {
        return res.json()
      })
      .then(data => {

        this.setState({ posts: data, loading: false, hasCompletedInitialLoad: true })
      }).catch(console.log)
  }


  render() {
    return (
      <div className='App'>

<div class='main-container'>
        <div className='header'>
          <div className='header-title'>
            this is why we f5
          </div>
          <div className='author-label'>
            by <a href='https://reddit.com/u/cityinspain' target='_blank' rel='noopener noreferrer'>/u/cityinspain</a>
          </div>
          <div className='description'>
            <p>the data on this page will refresh every 15 seconds.</p>
            <p>currently F5ing for "mookie betts"</p>
          </div>
        </div>
        <div className='content-container'>
          <div className='loading-indicator-container'>
            {this.state.loading === true && <p>{this.state.hasCompletedInitialLoad ? 'refreshing...' : 'loading...'}</p>}
          </div>

          <PostList posts={this.state.posts}></PostList>
          

        </div>

      </div>

      </div>
      

    );
  }
}

export default App;
