import User from "../model/users.js";
import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/jwt.js";
import jwt from "jsonwebtoken";

/* REGISTER */
export const register = async (req, res) => {
    try {
        if (req.file) {
            req.body.profile_picture = req.file.filename;
        }
        const user = await User.create(req.body);
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/* LOGIN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            accessToken,
            refreshToken
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/* REFRESH TOKEN */
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token required" });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const user = await User.findById(decoded.id).select("+refreshToken");
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        user.refreshToken = newRefreshToken;
        await user.save();

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        res.status(403).json({ message: "Token expired or invalid" });
    }
};

/* LOGOUT */
export const logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("+refreshToken");
        user.refreshToken = null;
        await user.save();

        res.json({ message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};