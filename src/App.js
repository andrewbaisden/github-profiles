import React, { Component } from 'react';

const API = 'http://localhost:3001/githubusers';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      show: true,
    };

    this.getApi = this.getApi.bind(this);
    this.removeElement = this.removeElement.bind(this);
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
  removeElement() {
    console.log(`Remove Element`);
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        {data.map(res => (
          <div key={res.id}>
            {this.state.show && (
              <div className="container">
                <div className="github-user-container">
                  <div className="github-user-image">
                    <img src={res.avatar_url} alt="User Avatar" />
                  </div>
                  <div className="github-user-details">
                    <h1>{res.name}</h1>
                    <p>{res.bio}</p>
                    <p>{res.location}</p>
                    <p>Public Repos: {res.public_repos}</p>
                    <p>Following: {res.following}</p>
                    <p>Followers: {res.followers}</p>
                  </div>
                  <div className="github-user-remove">
                    <button onClick={() => this.removeElement()}>Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
