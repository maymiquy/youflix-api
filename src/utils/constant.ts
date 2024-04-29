const jwt = {
  secret: process.env.JWT_SECRET,
  expires: process.env.JWT_EXPIRES,
};

export default jwt;
