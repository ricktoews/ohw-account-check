import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
    this.product_id = props.id;
    this.courses = props.courses;
    this.courses.sort((a, b) => a.book_id - b.book_id);
  }

  render() {
    return (<div>
      <h2>Products</h2>
      <h3>{this.product_id}</h3>
      <p>{this.courses.map(c => `${c.id} (${c.book_id})`).join(', ')}</p>
    </div>);
  }
}

class Courses extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.bootstrap = props.bootstrap;
    this.products = this.getProducts();
    this.courses = this.getCourses();
  }

  getCourses() {
    let courses = [];
    this.bootstrap.courses.forEach(c => {
//      let filterBy = c.product_name || c.name;
    });
    return courses;
  }

  getProducts() {
    let products = {};
    this.bootstrap.courses.forEach(c => {
      let key = `${c.product} - ${c.subject_name}`;
      if (!products[key]) products[key] = [c];
      else products[key].push(c);
    });

    return products;
  }

  render() {
    return (<div className="courses">
      <h2>Courses</h2>
      {this.bootstrap.courses.map(c => {
        return <p key={c.id}>{c.id}: {c.name}; product_name {c.product_name}, name: {c.name}</p>
      })}
      <h2>Products, Courses</h2>
      {Object.keys(this.products).sort().map(p => {
        return <Product key={p} id={p} courses={this.products[p]} />
      })}
    </div>);
  }
}

export default Courses;
