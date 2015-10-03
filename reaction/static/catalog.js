var Shop = React.createClass({
  getInitialState: function() {
    return {selectedCategory: null};
  },
  onSelectCategory: function(categoryId) {
    console.log(categoryId);
    this.setState({selectedCategory: categoryId});
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-2">
          <Menu categories={window.categories} onSelectCategory={this.onSelectCategory} />
          <div id="menu"></div>
        </div>
        <div className="col-md-7">
          <Products data={window.products} categoryId={this.state.selectedCategory} />
          <div id="products"></div>
        </div>
        <div className="col-md-3">
          <Cart items={window.items} />
          <div id="cart"></div>
        </div>
      </div>
    );
  }
});

var Menu = React.createClass({
  render: function() {
    var that = this
    var menuNodes = this.props.categories.map(function(category, index) {
      return <MenuItem name={category.name} id={category.id} key={index} onSelectCategory={that.props.onSelectCategory} />
    });
    return (
      <div className="list-group row">
        {menuNodes}
      </div>
    );
  }
});

var MenuItem = React.createClass({
  handleCategory: function() {
    this.props.onSelectCategory(this.props.id)
  },
  render: function() {
      return (
        <a className="list-group-item" onClick={this.handleCategory} href="javascript:void(0);">
          {this.props.name}
        </a>
      );
  }
});

var Products = React.createClass({
  getInitialState: function() {
    return {selected: false};
  },
  render: function() {
    var productNodes = [];
    var categoryId = this.props.categoryId;
    this.props.data.forEach(function(product, index){
      if (product.categoryId == categoryId || categoryId == null) {
        productNodes.push(
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            img={product.img} />
        );
      }
    });
    return (
      <div className="row">
        {productNodes}
      </div>
    );
  }
});

var ProductCard = React.createClass({
  handleAdd: function() {
    console.log(this.props.name);
  },
  render: function() {
    return (
      <div className="col-sm-6 col-lg-4 col-md-4">
        <div className="thumbnail">
          <img src={this.props.img} alt={this.props.name} />
          <div className="caption">
            <h3>{this.props.name}</h3>
            <p>{this.props.price} грн.</p>
            <p>
              <a href="#" className="btn btn-success" onClick={this.handleAdd}>В корзину</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
});

var Cart = React.createClass({
  render: function() {
    var itemNodes = this.props.items.map(function(item, index){
      return <CartItem
        key={index}
        name={item.name}
        price={item.price}
        count={item.count} />
    });
    return (
      <div className="row">
        <div className="panel panel-success">
          <div className="panel-heading">Корзина</div>
          <table className="table table-condensed table-hover">
            <tbody>
              {itemNodes}
            </tbody>
          </table>
          <div className="panel-footer">Всего: 1000 грн.</div>
        </div>
        <a href="javascript:void(0);" className="btn btn-primary">Оформить заказ</a>
      </div>
    );
  }
});

var CartItem = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
            <input type="number" value={this.props.count} style={{width: 2 + 'em'}} />
        </td>
        <td>{this.props.price}</td>
        <td><button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></td>
      </tr>
    );
  }
});

window.items = [
  {name: "Чай не скучай", price: "120", count: "1"},
  {name: "Те Гуань Инь", price: "140", count: "2"}
];

window.products = [
  {name: "Да Хун Пао", price: "120", img: "http://placehold.it/320x200", categoryId: 1},
  {name: "Те Гуань Инь", price: "120", img: "http://placehold.it/320x200", categoryId: 1},
  {name: "Пуэр 1", price: "120", img: "http://placehold.it/320x200", categoryId: 2},
  {name: "Пуэр 2", price: "120", img: "http://placehold.it/320x200", categoryId: 2},
  {name: "Зелёный", price: "120", img: "http://placehold.it/320x200", categoryId: 3},
  {name: "Седой Граф", price: "120", img: "http://placehold.it/320x200", categoryId: 4}
];

window.categories = [
  {name: "Улун", id: 1},
  {name: "Пуэр", id: 2},
  {name: "Зелёный чай", id: 3},
  {name: "Чёрный чай", id: 4}
];

React.render(<Shop />, document.getElementById("shop"))
