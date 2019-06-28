var rest = {
  test: {
    login: { url: 'http://test.kineticmath.com/rest/users/login', method: 'post' },
    status: { url: 'http://test-ohw.kineticmath.com/rest/rest.php/users/status', method: 'get' },
    bootstrap: { url: 'http://test-ohw.kineticmath.com/rest/endpoint.php/bootstrap', method: 'get' },
    userBookshelf: { url: 'http://test-ohw.kineticmath.com/rest/endpoint.php/bootstrap/lti', method: 'post' },
    schools: { url: 'http://test-ohw.kineticmath.com/rest/endpoint.php/admin/district/schools/all', method: 'get' },
  },
  live: {
    login: { url: 'https://ohw.perfectionlearning.com/api/login/users/login', method: 'post' },
    status: { url: 'https://ohw.perfectionlearning.com/api/rest/users/status', method: 'get' },
    bootstrap: { url: 'https://ohw.perfectionlearning.com/api/endpoint/bootstrap', method: 'get' },
    userBookshelf: { url: 'http://test-ohw.kineticmath.com/rest/endpoint.php/bootstrap/lti', method: 'post' },
    schools: { url: 'https://ohw.perfectionlearning.com/api/endpoint/admin/district/schools/all', method: 'get' }
  }
};

var apiEnv = 'test';

function apicall(api, payload = {}) {
  var options = {
    credentials: 'include',
    method: rest[apiEnv][api].method
  };

  if (options.method !== 'get') {
    options.headers = new Headers({ 'Content-type': 'application/json' });
    options.body = JSON.stringify(payload);
  }

  return fetch(rest[apiEnv][api].url, options).then(res => {
    return res.json().then(payload => {
      let data = payload.hasOwnProperty('data') ? payload.data : payload;
      return data;
    });
  });
}

function setEnv(env) {
  apiEnv = env;
}

export { apicall, setEnv };
