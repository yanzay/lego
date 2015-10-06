window.Products = React.createClass({
  getInitialState: function() {
    return {selected: false};
  },
  render: function() {
    var productNodes = [];
    var categoryId = this.props.categoryId;
    var onAddProduct = this.props.onAddProduct;
    this.props.data.forEach(function(product, index){
      if (product.categoryId === categoryId || categoryId === null) {
        productNodes.push(
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            img={product.img}
            id={product.id}
            onAddProduct={onAddProduct} />
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
  handleAdd: function(e) {
    e.preventDefault();
    this.props.onAddProduct(this.props.id, this.props.name, this.props.price);
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
              <select>
                <option value="50">50 г.</option>
                <option value="100">100 г.</option>
                <option value="200">200 г.</option>
              </select>
            </p>
            <p>
              <a href="#" className="btn btn-success" onClick={this.handleAdd}>В корзину</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
});

