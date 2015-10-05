window.Menu = React.createClass({
  render: function() {
    var selectedCategory = this.props.selectedCategory;
    var categoryHandler = this.props.onSelectCategory;
    var menuNodes = this.props.categories.map(function(category, index) {
      return <MenuItem
        name={category.name}
        id={category.id}
        key={index}
        onSelectCategory={categoryHandler}
        active={category.id == selectedCategory}/>
    });
    return (
      <div className="list-group row">
        {menuNodes}
      </div>
    );
  }
});

var MenuItem = React.createClass({
  handleCategory: function(e) {
    e.preventDefault();
    this.props.onSelectCategory(this.props.id)
  },
  render: function() {
    var className = "list-group-item"
    var link = "/category/" + this.props.name
    if (this.props.active) {
      className += " active"
    }
    return (
      <a className={className} onClick={this.handleCategory} href={link}>
        {this.props.name}
      </a>
    );
  }
});

