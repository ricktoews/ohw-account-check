import React, { Component } from 'react';

class Schools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school_ids: props.school_ids,
      district_id: props.district_id,
      schoolData: props.schoolData
    };
  }

  render() {
    if (!this.state.schoolData) {
      return null;
    } else {
    return (<div className="schools">
      <h2>District</h2>
      <table>
        <thead>
        <tr>
          <th>District ID</th>
          <th>District Name</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{this.state.district_id}</td>
          <td>{this.state.schoolData[this.state.district_id].name}</td>
        </tr>
        </tbody>
      </table>
      <h2>Schools</h2>
      <table>
        <thead>
        <tr>
          <th>School ID</th>
          <th>School Name</th>
        </tr>
        </thead>
        <tbody>
        {this.state.school_ids.map(school_id => (<tr key={school_id}>
          <td>{school_id}</td>
          <td>{this.state.schoolData[school_id] && this.state.schoolData[school_id].name}</td>
        </tr>))}
        </tbody>
      </table>
    </div>);
    } 
  }
}

export default Schools;
