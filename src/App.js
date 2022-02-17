import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";




dayjs.extend(relativeTime);

const issueIcon = (
  <svg
    viewBox="0 0 14 16"
    version="1.1"
    width="14"
    height="16"
    aria-hidden="true"
    fill="#28a745"
  >
    <path
      fillRule="evenod"
      d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
    />
  </svg>
);



const IssueRow = ({ issue }) => {
  const userLoginName = issue.user.login;
  const createdTimeAgo = dayjs().to(dayjs(issue.created_at));
  const subtitle = `# ${issue.id} opened ${createdTimeAgo} by `;
  const lName = issue.labels.map((label) => label.name ? label.name : "")
  console.log(lName)
  return (
    <a href={issue.html_url}>
      <div className="issue-row">
        <div className="issue-icon">{issueIcon}</div>
        <div className="issue-text">
          <div className="issue-title">{issue.title} {" "}
            <span className="issue-bug">issue: bug report</span>
            {" "}
            <span className="issue-name">{lName[0]}</span>
          </div>
          <div className="issue-subtitle">
            {subtitle}
            <a
              href={`https://github.com/facebook/create-react-app/issues/created_by/${userLoginName}`}
            >
              {" "}
              {userLoginName}
            </a>
          </div>
        </div>
      </div>
    </a>
  );
};


class App extends Component {
  state = {
    data: false,
    search: ""
  };



  updateSearch(event) {
    this.setState({ search: event.target.value });
  }


  componentDidMount() {
    fetch("https://api.github.com/repos/facebook/create-react-app/issues")
      .then(function (response) {
        return response.json();
      })
      .then(json => {
        this.setState({ data: json });
        console.log("parsed json", json);
      })
      .catch(function (ex) {
        console.log("parsing failed", ex);
      });
  }


  render() {
    const { data } = this.state;

    if (!data || !data.length) {
      return <div className="loader">Loading...</div>; //todo loader svg
    }

    const filteredData = data.filter(issue => {
      const lowerCaseTitle = issue.title.toLowerCase();
      const lowerCaseUser = issue.user.login.toLowerCase();
      const lowerCaseSearch = this.state.search.toLowerCase();

      return (
        lowerCaseTitle.includes(lowerCaseSearch) ||
        lowerCaseUser.includes(lowerCaseSearch)
      );

    });

    return (
      <div className="App">
        <Header />

        <div className="issue_table_head main" style={{ height: "96px" }}>

          <div className="" >
            <div className="facebook" >facebook <span style={{ fontWeight: "bold" }}>/create-react-app</span></div>
            <div className="issue_table_head_left bottom">
              <p className="grey" >Code</p>
              <p className="grey" >Issues</p>
              <p className="grey" >Pull Request</p>
              <p className="grey" >Discussions</p>
              <p className="grey" >Actions</p>
              <p className="grey" >Projects</p>
              <p className="grey" >Security</p>
              <p className="grey" >Insights</p>
            </div>

          </div>
          <div className="issue_table_head_right media">
            <p className="grey border_head top" >


              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-heart icon-sponsor mr-1 color-fg-sponsors">
                <path fillRule="evenodd" d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"></path>
              </svg>

              Sponser

            </p>
            <p className="grey border_head top" >
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-eye">
                <path fillRule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>Watch
              <span className="round" >
                1.9k
              </span>
            </p>

            <p className="grey border_head top" >
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-repo-forked mr-2">
                <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
              </svg>
              Fork

              <span className="round" >
                23.9k
              </span>
            </p>
            <p className="grey border_head top" >
              <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-star d-inline-block mr-2">
                <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
              </svg>
              Star
              <span className="round" >
                93.4k
              </span>
            </p>
          </div>

        </div>

        <div className="Issue">
          <p className="border" >Filters</p>
          <input
            className="input"
            type="text"
            placeholder="is:issue is:open "
            autoFocus
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />

          <p className="border" >Labels </p>
          <p className="border" >Milestones </p>
          <button className="issue_button" >New Issue</button>

        </div>


        <div className="issues-table">

          <div className="issue_table_head">

            <div className="issue_table_head_left">
              <p className="grey" style={{ fontWeight: '600', color: 'black' }} >1,195 Open</p>
              <p className="grey" >6,326 Closed</p>
            </div>


            <div className="issue_table_head_right">
              <p className="grey" >Author </p>
              <p className="grey" >Label</p>
              <p className="grey" >Projects</p>
              <p className="grey" >Milestones</p>
              <p className="grey" >Assignee</p>
              <p className="grey" >Sort</p>

            </div>
          </div>

          {filteredData.map(issue => (
            <IssueRow key={`${issue.id} _issue_row`} issue={issue} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;