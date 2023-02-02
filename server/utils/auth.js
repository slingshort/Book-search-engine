const jwt = require('jsonwebtoken');
const { response } = require('express');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.body?.token || req.headers?.authorization || req.query?.token;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers?.authorization) {
      token = token.split(' ').pop().trim();
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // req.user = data;
      return { user: data };
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'invalid token!' });
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
