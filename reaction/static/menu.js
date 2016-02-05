import React from 'react'
import { Link } from 'react-router'

export default class Menu extends React.Component {
  render() {
    const selectedCategory = this.props.selectedCategory;
    const menuNodes = this.props.categories.map((category, index) =>
      <MenuItem
        name={category.name}
        id={category.id}
        slug={category.slug}
        key={index}
        active={category.id == selectedCategory ? "active" : ""}/>
    );
    return (
      <ul className="nav navbar-nav" role="group" id="menu">
        {menuNodes}
      </ul>
    );
  }
}

class MenuItem extends React.Component {
  render() {
    return (
      <li>
        <Link className={this.props.active} role="group" to={`/${this.props.slug}`}>
          {this.props.name}
        </Link>
      </li>
    );
  }
}

