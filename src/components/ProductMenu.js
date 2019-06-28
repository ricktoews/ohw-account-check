import React, { Component } from 'react';

class ProductMenuRow extends Component {
  constructor(props) {
    super(props);
    this.item = props.item;
  }

  render() {
    var item = this.item;
    return (<tr>
      <td dangerouslySetInnerHTML={{ __html: item.name }} />
      <td>{item.course.name} ({item.course.id})</td>
      <td>{item.book.name} ({item.book.id})</td>
    </tr>);
  }
}


function prepareProductData(data) {
  let courses = data.courses;
  let book_list = data.book_list;
  let menu_items = [];

  courses.forEach(course => {
    let menu_item = {};
    let bookObj = book_list[course.book_id] && book_list[course.book_id][0] || {};
    let key = `${bookObj.product_line}-${bookObj.book || ''}`;
    let subject = bookObj.subject_desc || 'none found';
    menu_item.key = key;
    menu_item.subject = subject;
    menu_item.book = { id: bookObj.book_id, name: bookObj.title };
    menu_item.course = { id: course.id, name: course.name };
    if (course.product_name) {
      var displayName = course.product_name.replace('MathX', 'Math<sup>x</sup>') + `(key ${key} mapped; using subject_desc)`;
      menu_item.mapped = true;
      menu_item.name = course.product_name.replace('MathX', 'Math<sup>x</sup>');
      menu_item.product_name = course.product_name;
    } else {
      displayName = `${course.name} (no mapping for ${key}, so using class name; subject_desc ${subject}`;
      menu_item.mapped = false;
      menu_item.name = course.name;
      menu_item.product_name = course.product_name;
    }
    menu_items.push(menu_item);
  });

  menu_items.sort((a, b) => a.name < b.name ? -1 : 1);
  return menu_items;
}

class ProductMenu extends Component {
  constructor(props) {
    super(props);
    this.productMenuItems = prepareProductData({ courses: props.bootstrap.courses, book_list: props.bootstrap.diagnostics['BookInfo:book_list'] });
    this.courses = props.bootstrap.courses;
    this.courses.sort((a, b) => a.name < b.name ? -1 : 1);
  }

  render() {
    let menuItems = this.productMenuItems;

    return (<div className="courses">
      <h2>Product Menu</h2>
      <table>
        <thead>
          <tr>
            <th>Menu item</th>
            <th>Course</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item, i) => <ProductMenuRow key={i} item={item}/>)}
        </tbody>
      </table>
      <h2>Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
          </tr>
        </thead>
        <tbody>
          {this.courses.map((course, i) => <tr><td>{course.id}</td><td>{course.name}</td></tr>)}
        </tbody>
      </table>
    </div>)
  }
}

export default ProductMenu;

