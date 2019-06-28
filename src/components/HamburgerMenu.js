import React, { Component } from 'react';

class HamburgerMenu extends Component {
  constructor(props) {
    super(props);
    this.bootstrap = props.bootstrap;

    let product_menu_text = ['Admin', 'Digital Library', 'Assignments', 'Reports', 'Settings', 'Support', 'Logout'];
    let book_nav = props.bootstrap.ebooksData.book_nav;
    this.always_on = {'Settings': true, 'Logout': true};
    this.hamburger_menu = [];
    product_menu_text.forEach(item => {
      this.hamburger_menu.push({ text: item, show: (this.always_on[item] || book_nav[item] ? 'option-available' : 'option-hidden') });
    });
    this.menuItemBooks = props.bootstrap.diagnostics['BookInfo:book_flags'];
console.log('HamburgerMenu, menuItemBooks', this.menuItemBooks);
  }

  render() {
    return (<div className="hamburger-menu">
      <h2>Menu Configuration</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Book IDs</th>
          </tr>
        </thead>
        <tbody>
        {this.hamburger_menu.map(item => {
          let itemBooks;
          if (this.menuItemBooks[item.text]) {
            itemBooks = this.menuItemBooks[item.text].sort((a, b) => a-b).join(', ');
          } else {
            if (!this.always_on[item.text]) {
              itemBooks = 'Not shown';
            }
          }
          return (<tr key={item.text}><td><span className={item.show}>{item.text}</span></td><td>{itemBooks}</td></tr>)
        })}
        </tbody>
      </table>
    </div>);
  }
}

export default HamburgerMenu;
