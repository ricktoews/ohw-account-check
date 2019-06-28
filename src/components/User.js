import React, { Component } from 'react';

function prepareUserData(profile) {
  let bootstrap = profile.bootstrap;
  let schoolData = profile.schoolData;
  let status = profile.status;

  let email = status.email;
  let user_id = status.user_id;
  let fullname = `${status.first} ${status.last}`;
  let usertype = status.type;

  let is_district_account = !!bootstrap.district_id;
  let is_district = bootstrap.school_id === bootstrap.district_id;

  let school = {};
  school.id = status.school_id;
  school.name = status.school_name;
  school.type = is_district ? 'district' :
                      (is_district_account ? 'school within district' : 'standalone school');

  let district = {};
  district.id = bootstrap.district_id;
  district.name = schoolData[district.id].name;

  if (!is_district_account) {
    school.sentence = '';
  } else if (is_district) {
    school.sentence = `This user's school is a district. Schools within this district:`;
  } else {
    school.sentence = `This user's school is within district ${district.name} (${district.id}). Other schools within this district:`;
  }

  let school_ids_in_district = Object.keys(schoolData).filter(school_id => {
    return school_id !== district.id && school_id !== status.school_id;
  });
  
  let schools_in_district = [];
  school_ids_in_district.forEach(school_id => {
    schools_in_district.push({ name: schoolData[school_id].name, id: school_id });
  });

  let userData = {
    email,
    user_id,
    fullname,
    usertype,
    school,
    is_district_account,
    is_district,
    district,
    schools_in_district
  };
  return userData;
}

/*
 * This user's school is a district. Schools within this district:
 * This user's school belongs to district X. Other schools within the district:
 */
class User extends Component {
  constructor(props) {
    super(props);
    this.userData = prepareUserData(props);
  }

  render() {
    let profile = this.userData;

    return (<div className="user">
      <h2>User</h2>
      <p>{profile.email}. ID {profile.user_id}, name {profile.fullname} ({profile.usertype}) school {profile.school.name} ({profile.school.id}) - {profile.school.type}</p>
      <p>{profile.school.sentence}</p>
      <ul>
      {profile.schools_in_district.map(school => {
        return <li>{school.name} ({school.id})</li>
      })}
      </ul>
    </div>)
  } 
}

export default User;
