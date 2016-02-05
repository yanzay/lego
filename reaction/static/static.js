import React from 'react'

class Static extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            <h1>{this.props.header}</h1>
            {this.props.content}
          </div>
        </div>
      </div>
    )
  }
}

export class About extends React.Component {
  render() {
    return (
      <Static
        header="О нас"
        content="Тут всякий текст, можно с картинками" />
    )
  }
}

export class Delivery extends React.Component {
  render() {
    return (
      <Static
        header="Доставка и оплата"
        content="Описание способов доставки и оплаты" />
    )
  }
}

export class Contacts extends React.Component {
  render() {
    return (
      <Static
        header="Контакты"
        content="Номера телефонов, адреса, скайпы, карты" />
    )
  }
}
