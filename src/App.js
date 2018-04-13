import React, { Component } from 'react';

const API = 'http://localhost:3001/githubusers';
class ListItem extends Component {
  render() {
    return (
      <div className="container">
        <div className="github-user-container">
          <div className="github-user-image">
            <img src={this.props.res.avatar_url} alt="User Avatar" />
          </div>
          <div className="github-user-details">
            <h1>{this.props.res.name}</h1>
            <p>{this.props.res.bio}</p>
            <p>{this.props.res.location}</p>
            <p>Public Repos: {this.props.res.public_repos}</p>
            <p>Following: {this.props.res.following}</p>
            <p>Followers: {this.props.res.followers}</p>
          </div>
          <div className="github-user-remove">
            <button onClick={this._onClick.bind(this)}>Delete</button>
            {/* When the button is clicked, the selected user profile component is removed/hidden from the screen. */}
          </div>
        </div>
      </div>
    );
  }

  _onClick() {
    this.props.onItemClick(this.props.res.id);
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    this.getApi = this.getApi.bind(this);
  }

  componentDidMount() {
    this.getApi();
  }

  getApi() {
    fetch(API)
      .then(res => {
        const response = res.json();
        response.then(data => {
          this.setState({ data });
          console.log('Data', data);
        });
        console.log('Response', res);
      })
      .catch(e => {
        console.error('Error', e);
      });
  }
  removeElement(id) {
    console.log(`Remove Element`);
    this.setState(prevState => ({ data: prevState.data.filter(e => e.id !== id)}))
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        {data.map(res => (
          <div key={res.id}>
            <ListItem res={res} onItemClick={this.removeElement.bind(this)} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
