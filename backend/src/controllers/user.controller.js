import ApiResponse from "../helper/ApiResponse.js"
import { validateEmail, validatePhoneNumber, validateURL } from "../helper/validation.js"
import userModal from "../models/user.model.js"


export const createUser = async (req, res) => {
    try {
        let { name, email, phone, web } = req.body

        if (!name || !email | !phone || !web) {
            return ApiResponse.error(res, "All fields are required")
        }

        const isEmailValid = validateEmail(email)

        if (!isEmailValid) {
            return ApiResponse.validationError(res, "Email is not valid")
        }

        const isUserExist = await userModal.findOne({ email, phone })

        if (isUserExist) {
            return ApiResponse.error(res, "email or phone no is alredy exist")
        }

        const isPhoneNoValid = validatePhoneNumber(phone)

        if (!isPhoneNoValid) {
            return ApiResponse.validationError(res, "phone no is not valid")
        }

        const newUser = new userModal({
            name,
            email,
            phone,
            web
        })

        const savedUser = await newUser.save()

        if (!savedUser) {
            return ApiResponse.error(res, "error while saving user")
        }

        return ApiResponse.success(res, "User create successfully", 201)

    } catch (error) {
        return ApiResponse.error(res, error, "internal server error", 500)
    }

}

export const getUsers = async (req, res) => {
    try {

        const users = await userModal.find()

        if (!users || users.length == 0) {
            return ApiResponse.notFound(res, "Users not found")
        }

        return ApiResponse.success(res, users, "user fetched successfully")

    } catch (error) {
        return ApiResponse.error(res, error, "internal server error", 500)
    }
}

export const updateUser = async (req, res) => {
    try {

        const userId = req.params.id;
        const { name, email, phone, web } = req.body;

        if (!userId || !name || !email || !phone || !web) {
            return ApiResponse.validationError(res, 'All fields are required');
        }

        const isEmailValid = validateEmail(email)

        if (!isEmailValid) {
            return ApiResponse.validationError(res, "email is not valid")
        }

        const user = await userModal.findById(userId);

        if (!user) {
            return ApiResponse.notFound(res, 'User not found');
        }

        user.name = name;
        user.email = email;
        user.phone = phone;
        user.web = web
        const updatedUser = await user.save();

        return ApiResponse.success(res, updatedUser, 'User details updated successfully');

    } catch (error) {
        return ApiResponse.error(res, error, "internal server error", 500);
    }
};

export const toggleLike = async (req, res) => {
    try {
        let { id, like } = req.body

        if (!id || like.length == 0) {
            return ApiResponse.error(res, "All fields are required")
        }

        const updatedUser = await userModal.findByIdAndUpdate(id, { $set: { liked: like } }, { new: true, returnDocument: "after" })

        if (!updatedUser) {
            return ApiResponse.error(res, "update while toggle like")
        }

        return ApiResponse.success(res, "like toggle successfullly")


    } catch (error) {
        return ApiResponse.error(res, error, "internal server error", 500)
    }
}

export const deleteUser = async (req, res) => {
    try {
        let id = req.params.id

        const deleteUser = await userModal.findByIdAndDelete(id)

        return ApiResponse.success(res, "user deleted successfully")

    } catch (error) {
        return ApiResponse.error(res, error, "internal server error", 500)
    }
}