import React, { Component } from 'react';
import { createStore } from 'redux';

import { apicall, setEnv } from './js/api';
import createProfile from './js/profile';
import './css/App.css';
import User from './components/User';
import Books from './components/Books';
import Schools from './components/Schools';
import ProductMenu from './components/ProductMenu';
import HamburgerMenu from './components/HamburgerMenu';
import Courses from './components/Courses';

/*
const config = {
  config3: {
    admin: 1,
    digitalLibrary: 1,
    assignments: 0,
    reports: 0,
    settings: 1,
    support: 1
  }
};
*/

const credentials = [
  { email: 'config1_teacher@mailinator.com', pw: 'Cccccc1' },
  { email: 'config2_teacher@mailinator.com', pw: 'Cccccc1' },
  { email: 'config3_teacher@mailinator.com', pw: 'Cccccc1' },
  { email: 'config4_teacher@mailinator.com', pw: 'Cccccc1' },
  { email: 'config5_teacher@mailinator.com', pw: 'Cccccc1' },
  { email: 'config6_teacher@mailinator.com', pw: 'Cccccc1' },
  { email: 'neisd_teacher_1e@mailinator.com', pw: 'Nnnnnn1' },
  { email: 'neisd_teacher_1s@mailinator.com', pw: 'Nnnnnn1' },
  { email: 'drdoom@mailinator.com', pw: 'Dddddd1' },
  { email: 'hyrum@mailinator.com', pw: 'Hhhhhh1' },
];

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = { profile: {}, bootstrapData: {}, user: {}};
  }

  componentDidMount() {
    setEnv('test');
    apicall('login', credentials[8]).then(data => {
      let promises = [];
      this.login = data;

      let p = apicall('status');
      promises.push(p);
      p.then(data => {
        this.setState({
          user: data
        });
      });

      p = apicall('bootstrap');
      promises.push(p);
      p.then(data => {
        this.setState({
          bootstrapData: data,
          booksUserHasAccessTo: data.diagnostics['User:books_user_has_access_to:books'],
          licenses: data.diagnostics['User:books_user_has_access_to:license_data'],
          courses: data.courses,
          school_ids: data.diagnostics['User:books_user_has_access_to:school_ids'],
          district_id: data.diagnostics['User:books_user_has_access_to:district_id']
        });
      });

      p = apicall('schools');
      promises.push(p);
      p.then(data => {
        let schools = {};
        data.forEach(s => {
          schools[s.school_id] = s;
        });
        this.setState({
          schoolData: schools
        });
      });

      Promise.all(promises).then(res => {
        console.log('all promises fulfilled', res);
        this.setState({ profile: createProfile(res) });
      });
    }); 
  }

  render() {
    if (this.state.profile && this.state.bootstrapData.user_id && this.state.schoolData) {
      return (
      <div className="App">
        <div className="App-header">
          <h2>Bootstrap Data Analysis</h2>
        </div>
        <div className="bootstrap-report">
          <User profile={this.state.profile} bootstrap={this.state.bootstrapData} status={this.state.user} schoolData={this.state.schoolData}/>
          <ProductMenu bootstrap={this.state.bootstrapData}/>
          <Schools school_ids={this.state.school_ids} district_id={this.state.district_id} schoolData={this.state.schoolData}/>
          <Books schoolLicensed={this.state.bootstrapData.ebooksData.schoolLicensedBooks} books={this.state.booksUserHasAccessTo} licenses={this.state.licenses}/>
          <HamburgerMenu bootstrap={this.state.bootstrapData}/>
        </div>
      </div>
      );
    } else {
      return null;
    }
  }
}

export default App;
