import React from 'react'
import { Link } from 'react-router'

export default class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" href="javascript:void(0);" to="/">
              Чайная Гильдия
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav" id="navigation">
              <li>
                <Link to="/about" className="navlink">О нас</Link>
              </li>
              <li>
                <Link to="/delivery" className="navlink">Доставка и оплата</Link>
              </li>
              <li>
                <Link to="/contacts" className="navlink">Контакты</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
