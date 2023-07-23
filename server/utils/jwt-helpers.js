const jwt = require('jsonwebtoken');

function jwtTokens({user_id, first_name, last_name, email}) {
    const user = {user_id, first_name, last_name, email};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '50m' });
    return ({ accessToken, refreshToken });
};

module.exports = jwtTokens;