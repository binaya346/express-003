import jwt from "jsonwebtoken";
const {
    JWT_ACCESS_SECRET,
    ACCESS_TOKEN_EXPIRES,
    JWT_REFRESH_SECRET,
    REFRESH_TOKEN_EXPIRES
} = process.env;

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        JWT_ACCESS_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        JWT_REFRESH_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES }
    );
};