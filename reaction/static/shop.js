var
  Products = window.Products,
  Cart = window.Cart,
  Menu = window.Menu;

var Shop = React.createClass({
  getInitialState: function() {
    return {
      selectedCategory: null,
      cartItems: {}
    };
  },
  onSelectCategory: function(categoryId) {
    console.log(categoryId);
    this.setState({selectedCategory: categoryId});
  },
  onAddProduct: function(productId, productName, productPrice) {
    var items = this.state.cartItems;
    if (productId in items) {
      items[productId].count++
    } else {
      items[productId] = {
        name: productName,
        price: productPrice,
        productId: productId,
        count: 1
      };
    }
    this.setState({cartItems: items});
  },
  onChangeCount: function(productId, value) {
    var items = this.state.cartItems;
    items[productId].count = value;
    this.setState({cartItems: items});
  },
  onDeleteItem: function(productId) {
    var items = this.state.cartItems;
    delete items[productId];
    this.setState({cartItems: items});
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-2">
          <Menu categories={window.categories}
            onSelectCategory={this.onSelectCategory}
            selectedCategory={this.state.selectedCategory}/>
        </div>
        <div className="col-md-7">
          <Products
            data={window.products}
            categoryId={this.state.selectedCategory}
            onAddProduct={this.onAddProduct} />
        </div>
        <div className="col-md-3">
          <Cart
            items={this.state.cartItems}
            onChangeCount={this.onChangeCount}
            onDeleteItem={this.onDeleteItem} />
        </div>
      </div>
    );
  }
});

window.products = [
  {id: 1, name: "Да Хун Пао", price: "120", img: "http://placehold.it/320x200", categoryId: 1},
  {id: 2, name: "Те Гуань Инь", price: "120", img: "http://placehold.it/320x200", categoryId: 1},
  {id: 3, name: "Пуэр 1", price: "120", img: "http://placehold.it/320x200", categoryId: 2},
  {id: 4, name: "Пуэр 2", price: "120", img: "http://placehold.it/320x200", categoryId: 2},
  {id: 5, name: "Зелёный", price: "120", img: "http://placehold.it/320x200", categoryId: 3},
  {id: 6, name: "Седой Граф", price: "120", img: "http://placehold.it/320x200", categoryId: 4}
];

window.categories = [
  {name: "Улун", id: 1},
  {name: "Пуэр", id: 2},
  {name: "Зелёный чай", id: 3},
  {name: "Чёрный чай", id: 4}
];

var routes = (
  <ReactRouter.Route path="/" handler={Shop} />
);

ReactRouter.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById("shop"));
});

