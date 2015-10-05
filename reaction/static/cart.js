window.Cart = React.createClass({
  render: function() {
    var
      itemNodes = [],
      items = this.props.items,
      totalPrice = 0;
    for (var productId in items) {
      totalPrice += items[productId].price * items[productId].count;
      itemNodes.push(
        <CartItem
          key={productId}
          productId={productId}
          name={items[productId].name}
          price={items[productId].price}
          count={items[productId].count}
          onChangeCount={this.props.onChangeCount}
          onDelete={this.props.onDeleteItem} />
      );
    }
    return (
      <div className="row">
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
});

var CartItem = React.createClass({
  handleChange: function(e) {
    if (e.target.value > 0) {
      this.props.onChangeCount(this.props.productId, e.target.value);
    }
  },
  handleDelete: function(e) {
    this.props.onDelete(this.props.productId);
  },
  render: function() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>
            <input type="number"
              value={this.props.count}
              style={{width: '2.5em'}}
              onChange={this.handleChange} />
        </td>
        <td>{this.props.price * this.props.count} грн.</td>
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
