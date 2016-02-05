import { Router, Route, Link, IndexRoute } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Products from './products'
import Navigation from './navigation'
import Cart from './cart'
import Menu from './menu'
import { About, Delivery, Contacts } from './static'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

class Shop extends React.Component {
  constructor(props) {
    super(props)
    this.onAddProduct = this.onAddProduct.bind(this);
    this.onChangeCount = this.onChangeCount.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    const slug = this.props.params.category;
    const category = window.categories.filter(c => c.slug == slug)[0];
    let categoryId = null;
    if (category) {
      categoryId = category.id
    }

    this.state = {
      cartItems: [],
      selectedCategory: categoryId,
      categories: window.categories,
      products: window.products
    };
  }
  componentWillReceiveProps(props) {
    const slug = props.params.category;
    const category = this.state.categories.filter(c => c.slug == slug)[0];
    let categoryId = null;
    if (category) {
      categoryId = category.id
    }

    this.setState({selectedCategory: categoryId})
  }
  onAddProduct(productId, productName, productPrice, productWeight, weighted) {
    const items = this.state.cartItems;
    let found = false;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.productId == productId && item.weight == productWeight) {
        items[i].count++;
        found = true;
      }
    }
    if (!found) {
      items.push({
        name: productName,
        price: productPrice,
        productId: productId,
        count: 1,
        weight: productWeight,
        weighted: weighted
      });
    }
    this.setState({
      cartItems: items
    });
  }
  onChangeCount(productId, weight, value) {
    let items = this.state.cartItems;
    for (let i = 0; i < items.length; i++) {
      if (items[i].productId == productId && items[i].weight == weight) {
        items[i].count = value;
      }
    }
    this.setState({
      cartItems: items
    });
  }
  onDeleteItem(productId, productWeight) {
    let items = this.state.cartItems;
    let index = items.findIndex((item) => {
      return item.productId == productId && item.weight == productWeight;
    });
    items.splice(index, 1);
    this.setState({
      cartItems: items
    });
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-default" id="menubar" role="navigation">
          <div className="container">
                <Menu categories={ this.state.categories }
                      selectedCategory={ this.state.selectedCategory }/>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <Products data={ this.state.products }
                        categoryId={ this.state.selectedCategory }
                        onAddProduct={ this.onAddProduct } />
            </div>
            <div className="col-md-3" id="cart">
              <Cart items={ this.state.cartItems }
                    onChangeCount={ this.onChangeCount }
                    onDeleteItem={ this.onDeleteItem }
                    show={ this.show }
                    toggleCart={ this.toggleCart } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

window.products = [{
  id: 1,
  name: "Да Хун Пао",
  price: "120",
  img: "http://placehold.it/250x250",
  categoryId: 1,
  weighted: true
}, {
  id: 2,
  name: "Те Гуань Инь",
  price: "120",
  img: "http://placehold.it/250x250",
  categoryId: 1,
  weighted: true
}, {
  id: 3,
  name: "Пуэр 1",
  price: "120",
  img: "http://placehold.it/250x250",
  categoryId: 2,
  weighted: true
}, {
  id: 4,
  name: "Пуэр 2",
  price: "120",
  img: "http://placehold.it/250x250",
  categoryId: 2,
  weighted: true
}, {
  id: 5,
  name: "Зелёный",
  price: "120",
  img: "http://placehold.it/250x250",
  categoryId: 3,
  weighted: true
}, {
  id: 6,
  name: "Седой Граф",
  price: "120",
  img: "http://placehold.it/250x250",
  categoryId: 4,
  weighted: false
}];

window.categories = [{
  name: "Улун",
  id: 1,
  slug: "oolong"
}, {
  name: "Пуэр",
  id: 2,
  slug: "puer"
}, {
  name: "Зелёный чай",
  id: 3,
  slug: "green"
}, {
  name: "Чёрный чай",
  id: 4,
  slug: "black"
}];

ReactDOM.render((
  <Router history={ createBrowserHistory() }>
    <Route path="/" component={ App }>
      <IndexRoute component={ Shop } />
      <Route path="/about" component={ About } />
      <Route path="/delivery" component={ Delivery } />
      <Route path="/contacts" component={ Contacts } />
      <Route path="/:category" component={ Shop } />
    </Route>
  </Router>
), document.getElementById("shop"));
