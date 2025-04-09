import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import {getReceiverSocketId, io} from "../lib/socket.js";

export const getUsersForSidebar = async (req, res)=> {
    try {
        const loggedInId = req.user._id;
        const filterUser = await User.find({_id: {$ne: loggedInId}}).select("-password");
        return res.status(200).json(filterUser);
    }catch (error) {
        console.log("Error in getUsersForSidebar controller: ", error);
        return res.status(500).json({message: 'Internal server Error!'});
    }
}

export const getMessages = async (req, res)=> {
    try {
        const {id: chatUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({$or: [
                {senderId: myId, receiverId: chatUserId},
                {senderId: chatUserId, receiverId: myId}
            ]});
        return res.status(200).json(messages);
    }catch (error) {
        console.log("Error in getMessages controller: ", error);
        return res.status(500).json({message: 'Internal server Error!'});
    }
}

export const sendMessage = async (req, res)=> {
    try {
        const {text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId, receiverId, text, image
        });
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json(newMessage);
    }catch (error) {
        console.log("Error in getMessages controller: ", error);
        return res.status(500).json({message: 'Internal server Error!'});
    }
}