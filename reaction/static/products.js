import React from 'react'

export default class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {selected: false};
  }
  render() {
    let productNodes = [];
    const categoryId = this.props.categoryId;
    const onAddProduct = this.props.onAddProduct;
    this.props.data.forEach(function(product, index){
      if (product.categoryId === categoryId || categoryId === null) {
        productNodes.push(
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            img={product.img}
            id={product.id}
            onAddProduct={onAddProduct}
            weighted={product.weighted} />
        );
      }
    });
    return (
      <div className="row">
        {productNodes}
      </div>
    );
  }
}

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {weight: "100"};
    this.handleAdd = this.handleAdd.bind(this);
    this.changeWeight = this.changeWeight.bind(this);
  }
  handleAdd(e) {
    e.preventDefault();
    this.props.onAddProduct(this.props.id, this.props.name, this.props.price, this.state.weight, this.props.weighted);
  }
  changeWeight(e) {
    this.setState({weight: e.target.value});
  }
  render() {
    return (
      <div className="col-sm-6 col-lg-4 col-md-4">
        <div className="thumbnail">
          <img src={this.props.img} alt={this.props.name} />
          <div className="caption">
            <h3>{this.props.name}</h3>
            <p>{this.props.price} грн.</p>
            <p className={this.props.weighted ? '' : 'hidden'}>
              <WeightSelector
                onChangeWeight={this.changeWeight}
                weight={this.state.weight} />
            </p>
            <p>
              <a href="#" className="btn btn-success" onClick={this.handleAdd}>В корзину</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

class WeightSelector extends React.Component {
  render() {
    return (
      <select className="form-control" value={this.props.weight} onChange={this.props.onChangeWeight}>
        <option value="50">50 г.</option>
        <option value="100">100 г.</option>
        <option value="200">200 г.</option>
      </select>
    );
  }
}
