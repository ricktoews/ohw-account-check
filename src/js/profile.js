function userSection(profileData) {
  var obj = {};
  
  return obj;
}

function createProfile(data) {
  var profile = {
    userStatus: data[0],
    bootstrap: data[1],
    schoolData: data[2]
  };

  return profile;
}

export default createProfile;
