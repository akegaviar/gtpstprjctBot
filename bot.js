const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();
const token = process.env.TELEGRAM_TOKEN;
const AuthStr = 'Bearer '.concat(process.env.CHAINSTACK_API_KEY);

let bot = new TelegramBot(token, { polling: true });

// Post project "/newProject name description"
bot.onText(/\/newProject (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const project_name = match[1];
  const project_description = match[2];
  const data = {
    name: project_name,
    description: project_description
};
  axios
    .post(`${process.env.CHAINSTACK_API_URL}/projects/`, data, {
    headers: {
        'Content-Type': 'application/json',
         Authorization: AuthStr
    }
    })
    .then(response => {
      const project_post_id = (response.data.id);
      const project_post_name = (response.data.name);
      const project_post_description = (response.data.description);
      const project_post_type = (response.data.type);
      const project_post_created_at = (response.data.created_at);
      bot.sendMessage(chatId, "*Project ID: *"+project_post_id+"\n*Name: *"+project_post_name+"\n*Description: *"+project_post_description+"\n*Type: *"+project_post_type+"\n*Created on: *"+project_post_created_at,{ parse_mode: 'Markdown' });
    })
    .catch(error => bot.sendMessage(chatId, 'Not found'));
});

// Get project info "/project PR-123-456"
bot.onText(/\/project (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const project = match[1];
  axios
    .get(`${process.env.CHAINSTACK_API_URL}/projects/${project}/`, {
    headers: {
         Authorization: AuthStr
    }
    })
    .then(response => {
      const project_id = (response.data.id);
      const project_name = (response.data.name);
      const project_description = (response.data.description);
      const project_type = (response.data.type);
      const project_members = (response.data.members);
      const project_networks = (response.data.networks);
      const project_created_at = (response.data.created_at);
      const project_organization_id = (response.data.creator.organization.id);
      const project_organization_name = (response.data.creator.organization.name);
      bot.sendMessage(chatId, "*Project ID: *"+project_id+"\n*Name: *"+project_name+"\n*Description: *"+project_description+"\n*Type: *"+project_type+"\n*Members: *"+project_members+"\n*Networks: *"+project_networks+"\n*Created on: *"+project_created_at+"\n*Organization ID: *"+project_organization_id+"\n*Organization name: *"+project_organization_name,{ parse_mode: 'Markdown' });
    })
    .catch(error => bot.sendMessage(chatId, 'Not found'));
});
