import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const schema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters"],
            maxlength: [20, "Username cannot exceed 20 characters"],
            lowercase: true,
            index: true
        },

        firstname: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minlength: [2, "First name must be at least 2 characters"],
            maxlength: [30, "First name cannot exceed 30 characters"]
        },

        lastname: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            minlength: [2, "Last name must be at least 2 characters"],
            maxlength: [30, "Last name cannot exceed 30 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please enter a valid email address"
            ]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false
        },

        phone: {
            type: String,
            trim: true,
            match: [
                /^[0-9]{10,15}$/,
                "Phone number must contain 10 to 15 digits"
            ]
        },

        gender: {
            type: String,
            enum: {
                values: ["male", "female"],
                message: "Gender must be male or female"
            }
        },

        isActive: {
            type: Boolean,
            default: true
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        profile_picture: {
            type: String,
            trim: true,
            match: /\.(jpg|jpeg|png|webp)$/i
        },
        refreshToken: {
            type: String,
            select: false
        }
    },
    {
        timestamps: true
    }
);

/* Password hashing */
schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 12);
    next;
});

/* Compare password */
schema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

/* Hide sensitive fields */
schema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

const Model = mongoose.model("User", schema);
export default Model;
