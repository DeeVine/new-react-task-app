import React from 'react'

    window.API = {
      fetchPopularRepos(language) {
        // "language" can be "javascript", "ruby", "python", or "all"
        const encodedURI = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
        return fetch(encodedURI)
          .then((data) => data.json())
          .then((repos) => repos.items)
          .catch((error) => {
            console.warn(error)
            return null
          });
      }
    }

    class Loading extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          text: 'Loading',
        };
      }
      componentDidMount() {
        const stopper = this.state.text + '...';
        this.interval = window.setInterval(() => {
          this.state.text === stopper
            ? this.setState(() => ({ text: 'Loading' }))
            : this.setState((prevState) => ({ text: prevState.text + '.' }))
        }, 300)
      }
      componentWillUnmount() {
        window.clearInterval(this.interval);
      }
      render() {
        return (
          <p>
            {this.state.text}
          </p>
        )
      }
    }

    function Nav (props) {

      const repos = ['all', 'javascript', 'ruby', 'python']

      return (
        <div>
          <h1>Language Repos</h1>
          <ul>
            {repos.map((lang) => {
              return (
                <li key={lang} onClick={() => props.onSelectLanguage(lang)}>
                  {lang}
                </li>
              )
            })}
          </ul>
        </div>
      )
    }

    function RepoGrid(props) {
      console.log(props);
      return (
        <div>
          {/*change to repo name name*/}
          <h1 style={{textAlign: 'center'}}>{props.activeLanguage}</h1>
          <ul style={{display: 'flex', flexWrap: 'wrap'}}>
            {props.repos.map(function({name, owner, stargazers_count, html_url}) {
              return (
                <li key={name} style={{margin:'30px'}}>
                  <ul >
                    <li><a href={html_url}>{name}</a></li>
                    <li>@{owner.login}</li>
                    <li>Star{stargazers_count}</li>
                  </ul>
                </li>
                //add click handler
              )
            })}
          </ul>
        </div>
      )
    }

    export default class Bootcamp extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          repos: [],
          activeLanguage: 'all',
          loading: true,
        }
        this.handleSelectLanguage = this.handleSelectLanguage.bind(this)
      }

      handleSelectLanguage (lang) {
        this.setState({
          activeLanguage: lang
        })
      }

      fetchPopularRepos(language) {
        this.setState({
          loading: true
        })
        window.API.fetchPopularRepos(language)
          .then((lang) => {
            console.log('lang', lang)
            this.setState({
              repos: lang,
              activeLanguage: language,
              loading: false
            })
          })
      }

      componentDidMount() {
        this.fetchPopularRepos(this.state.activeLanguage)
      }

      componentDidUpdate(prevProps, prevState) {
        if (prevState.activeLanguage !== this.state.activeLanguage) {
          this.fetchPopularRepos(this.state.activeLanguage)
        }
        console.log('--componentDidUpdate--')
      }

      componentWillUnmount() {
        console.log('--componentWillUnmount')
      }

      render() {
        // if (this.state.loading) {
        //   return <Loading />
        // }
        return (
          <div>
            {this.state.loading === true
              ? <Loading />
              : <div>
                  <div>
                    <Nav
                      onSelectLanguage={this.handleSelectLanguage}
                    />
                  </div>
                  <div>
                    <RepoGrid
                      repos={this.state.repos}
                      activeLanguage={this.state.activeLanguage}
                    />
                  </div>
                </div>
            }
          </div>
        )

      }
    }
