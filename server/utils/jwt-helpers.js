const jwt = require('jsonwebtoken');

function jwtTokens({user_id, first_name, email}) {
    const user = {user_id, first_name, email};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2s' });
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5s' });
    return ({ accessToken, refreshToken });
};

module.exports = jwtTokens;