var Menu = React.createClass({
  render: function() {
    return (
      <div className="list-group row">
        <MenuItem name="Улун" />
        <MenuItem name="Пуэр" />
        <MenuItem name="Зелёный чай" />
        <MenuItem name="Чёрный чай" />
      </div>
    );
  }
});

var MenuItem = React.createClass({
  render: function() {
    return (
      <a href="#" className="list-group-item">{this.props.name}</a>
    );
  }
});

var Products = React.createClass({
  getInitialState: function() {
    return {selected: false};
  },
  render: function() {
    var nodes = this.props.data.map(function(product, index){
      return <ProductCard
        key={index}
        name={product.name}
        price={product.price}
        img={product.img} />
    });
    return (
      <div className="row">
        {nodes}
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

window.products = [
  {name: "Чай не скучай", price: "120", img: "http://placehold.it/320x200"},
  {name: "Чай не скучай", price: "120", img: "http://placehold.it/320x200"},
  {name: "Чай не скучай", price: "120", img: "http://placehold.it/320x200"},
  {name: "Чай не скучай", price: "120", img: "http://placehold.it/320x200"},
  {name: "Чай не скучай", price: "120", img: "http://placehold.it/320x200"},
  {name: "Чай не скучай", price: "120", img: "http://placehold.it/320x200"}
];

React.render(<Menu />, document.getElementById("menu"))
React.render(<Products data={window.products} />, document.getElementById("products"))

