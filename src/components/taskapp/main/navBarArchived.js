import React from 'react'
import PropTypes from 'prop-types'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(evt) {
    evt.preventDefault();
    this.props.onClickHandler(this.refs.searchBox.value);
  }
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-brand">
            test
          </div>
          <div className="collapse navbar-collapse">
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" ref="searchBox" className="form-control" placeholder={this.props.hint} />
                <button className="btn btn-info" onClick={this.clickHandler}>test</button>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

// NavBar.propTypes = {
//   title: PropTypes.string,
//   hint: PropTypes.string,
//   buttonTxt: PropTypes.string,
//   onClickHandler: PropTypes.func
// };
//
// NavBar.defaultProps = {
//   title: 'Github',
//   hint: 'Github Username',
//   buttonTxt: 'Search',
//   onClickHandler: () => {}
// };

// App
