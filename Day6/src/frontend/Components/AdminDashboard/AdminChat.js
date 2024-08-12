import React, { useEffect, useState } from 'react';
import '../Assests/css/AdminChat.css'
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; // Add this import for the Send icon
import axios from 'axios';

const AdminChat = ({ chatId, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/getInquiryChat/${chatId}`)
            .then(response => {
                setMessages(response.data);
                console.log(messages);
            })
            .catch(error => {
                console.error('Error fetching inquiries:', error);
            });
    }, [chatId]);

    const getDateTime = (t) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const d = new Date(t); // Parse the timestamp string directly
        const month = monthNames[d.getMonth()];
        const day = d.getDate().toString().padStart(2, '0');
        const hour = d.getHours().toString().padStart(2, '0');
        const min = d.getMinutes().toString().padStart(2, '0');
        return `${month} ${day} ${hour}:${min}`;
    };

    const handleSend = () => {
        if (newMessage.trim() !== '') {
            axios.post(`http://localhost:8080/api/saveAdminChat/${chatId}/${'admin'}/${newMessage}`)
                .then(response => {
                    setMessages(response.data);
                    setNewMessage('');
                    console.log(messages);
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className='adminchatmessage'>
            <div id="adminviewport">
                <Button sx={{ backgroundColor: 'rgb(203, 52, 52)', marginRight: "91%" }} variant="contained" color='secondary' onClick={onBack}>Back</Button>
                <div className="adminchatbox" id="adminchatbox">
                    <div className="adminchats">
                        <ul>
                            {messages.map((message, index) => (
                                <li key={index}>
                                    <div className={`adminmsg ${message.role === 'admin' ? 'adminhim' : 'adminyou'}`}>
                                        <span className="adminpartner">{message.role}</span>
                                        {message.message}
                                        <span className="admintime">{getDateTime(message.date)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="adminsendBox">
                        <input
                            type="text"
                            placeholder="Type Here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <Button onClick={handleSend} color="primary">
                            <SendIcon/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminChat;
