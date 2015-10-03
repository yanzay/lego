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

React.render(<Cart items={window.items} />, document.getElementById("cart"))
