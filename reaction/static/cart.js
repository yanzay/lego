import React from 'react'

export default class Cart extends React.Component {
  toggleShow() {
    this.show = !this.show;
  }
  render() {
    var
      itemNodes = [],
      items = this.props.items,
      totalPrice = 0;
    itemNodes = items.map((item) => {
      const itemPrice = item.price * item.count * (item.weight / 100);
      totalPrice += itemPrice
      return <CartItem
          key={item.productId + item.weight}
          productId={item.productId}
          name={item.name}
          price={item.price}
          count={item.count}
          weight={item.weight}
          weighted={item.weighted}
          itemPrice={itemPrice}
          onChangeCount={this.props.onChangeCount}
          onDelete={this.props.onDeleteItem} />
    });
    return (
      <div className="cart">
        <div className="panel panel-success">
          <div className="panel-heading">Корзина</div>
          <table className="table table-condensed table-hover">
            <tbody>
              {itemNodes}
            </tbody>
          </table>
          <div className="panel-footer">Всего: {totalPrice} грн.</div>
        </div>
        <a href="javascript:void(0);" className="btn btn-primary">Оформить заказ</a>
      </div>
    );
  }
}

var CartItem = React.createClass({
  handleChange: function(e) {
    if (e.target.value > 0) {
      this.props.onChangeCount(this.props.productId, this.props.weight, e.target.value);
    }
  },
  handleDelete: function(e) {
    this.props.onDelete(this.props.productId, this.props.weight);
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.name} {this.props.weighted ? this.props.weight + 'г' : ''}</td>
        <td>
            <input type="number"
              value={this.props.count}
              style={{width: '2.5em'}}
              onChange={this.handleChange} />
        </td>
        <td>{this.props.itemPrice} грн.</td>
        <td>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={this.handleDelete}>
            <span aria-hidden="true">&times;</span>
          </button>
        </td>
      </tr>
    );
  }
});
