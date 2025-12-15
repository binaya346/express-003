import Model from '../model/users.js';

export const getUsers = async (req, res) => {
    try {
        const response = await Model.find();
        res.send(response);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch books' });
    }
}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, firstname, lastname, password, email, phone, gender, isActive, role } = req.body;
        const profile_picture = req.file ? req.file.filename : "";
        const response = await Model
            .findByIdAndUpdate(
                id,
                {
                    username,
                    firstname,
                    lastname,
                    password,
                    email,
                    phone,
                    gender,
                    isActive,
                    role,
                    profile_picture
                },
                {
                    new: true
                }
            );
        res.status(200).send({ "message": `Successfully Updated! ${response}` })
    } catch (err) {
        console.log(err + " err");
        res.status(500).send({ "Error": err });
    }
};

// Delete Users


export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Model.findByIdAndDelete(id);
        if (response) {
            res.send({ "message": `User with id ${id} deleted successfully.` });
        } else {
            res.status(404).send({ "message": `User with id ${id} not found.` });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete User' });
    }
};