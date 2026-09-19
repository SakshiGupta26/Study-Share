import config from "../config/env.js";
import jwt from 'jsonwebtoken';

export const generateToken = ({userId}) => {
    const accessToken = jwt.sign(
        {id : userId},
        config.ACCESS_TOKEN_SECRET,
        {expiresIn:config.ACCESS_TOKEN_EXPIRES_IN}
    );
    const refreshToken = jwt.sign({id : userId},
        config.REFRESH_TOKEN_SECRET,
        {expiresIn : config.REFRESH_TOKEN_EXPIRES_IN}
    );
    return {accessToken,refreshToken};
};

export function verifyRefreshToken(token) {
    const decoded = jwt.verify(token,config.REFRESH_TOKEN_SECRET);
    return decoded;
}

export function verifyAccessToken(token) {
    const decoded = jwt.verify(token,config.ACCESS_TOKEN_SECRET);
    return decoded;
}