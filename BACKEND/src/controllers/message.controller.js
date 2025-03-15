const Message = require('../models/message.model');

class MessageController {
    // Tạo message mới cho một phiên chat
    static async saveMessage(req, res) {
        try {
            const { session_id, content, role } = req.body;
            if (!session_id || !content || !role) {
                return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
            }

            await Message.createMessage(session_id, content, role);
            res.status(201).json({ message: 'Tin nhắn đã lưu' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Lấy tất cả các message theo session_id
    static async getMessages(req, res) {
        try {
            const { session_id } = req.params;
            if (!session_id) {
                return res.status(400).json({ error: 'Thiếu session_id' });
            }

            const messages = await Message.getMessagesBySession(session_id);
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MessageController;
