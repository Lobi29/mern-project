import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';

// Registering a new User
export const registerUser = async(req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    req.body.password = hashedPassword;

    const newUser = new UserModel(req.body);

    const { username } = req.body

    try {
        // !it will pause all the functionality of the programe untill the new user will be save.

        const oldUser = await UserModel.findOne({username})

        if (oldUser) {
            return res.status(400).json({message: "username is already registered!"})
        }


        await newUser.save()
        res.status(200).json(newUser)
    } catch ( error ) {
        res.status(500).json({ message: error.message })
    }
}

// login user
export const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await UserModel.findOne({ username: username });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            validity ? res.status(200).json(user) : res.status(400).json("Wrong Password");
        } else {
            res.status(404).json("User does not exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}