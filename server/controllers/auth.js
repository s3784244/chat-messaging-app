const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat');
const crypto = require('crypto');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

// req - contains information of what we send to frontend
// res - contains information of what we send to backend
const signup = async (req, res) => {
    try {
        // We need to get these things from the frontend
        const { fullName, username, password, phoneNumber } = req.body;

        // Create a new user id for each new user
        const userId = crypto.randomBytes(16).toString('hex');

        // Make a connection to stream
        const serverClient = connect(api_key, api_secret, api_id);

        // This line will turn our plaintext password to hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Use server client to create a new user token
        const token = serverClient.createUserToken(userId)

        // Return this data to the frontend
        // Get these values from the backend as it is more secure that way, to be sure this is the actual user we are creating
        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error});
    }
};

const login = async (req, res) => {
    try {
        // We need to get these things from the frontend
        // req.body is getting populated as we pass data from the frontend from our form which we created previously to the backend
        const { username, password } = req.body;

        // We need to connect to the client
        const serverClient = connect(api_key, api_secret, api_id);

        // Create an instance of stream chat
        const client = StreamChat.getInstance(api_key, api_secret);

        // We need to query all the users in the database that match the specific username
        // Destructure users and find users match with username
        const { users } = await client.queryUsers({ name: username });

        // If there is no user
        if(!users.length) return res.status(400).json({ message: "User not found" })

        // If the user does exist, we need to decrypt the password to check if it matches with the account
        const success = await bcrypt.compare(password, users[0].hashedPassword);

        // Create a new token to send back
        const token = serverClient.createUserToken(users[0].id)

        // If the item is successful we want to send all the data back (send token back)
        if(success) {
            res.status(200).json( {token, fullName: users[0].fullName, username, userId: users[0].id})
        } else {
            res.status(500).json({ message: 'Incorrect password' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error});
    }
};

module.exports = { signup, login }