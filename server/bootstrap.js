import Moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { Chats, Messages } from '../lib/collections';
 
Meteor.startup(function() {
  if (Chats.find().count() !== 0) return;
 
  Messages.remove({});
 
  const messages = [
    {
      text: 'You on your way?',
      timestamp: Moment().subtract(1, 'hours').toDate()
    },
    {
      text: 'Hey, it\'s me',
      timestamp: Moment().subtract(2, 'hours').toDate()
    },
    {
      text: 'I should buy a boat',
      timestamp: Moment().subtract(1, 'days').toDate()
    },
    {
      text: 'Look at my mukluks!',
      timestamp: Moment().subtract(4, 'days').toDate()
    },
    {
      text: 'This is wicked good ice cream.',
      timestamp: Moment().subtract(2, 'weeks').toDate()
    }
  ];
 
  messages.forEach((m) => {
    Messages.insert(m);
  });
 
  const chats = [
    {
      name: 'Legao',
      picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
    },
    {
      name: 'Tom Hiddleston',
      picture: 'tom-hiddleston.jpeg'
    },
    {
      name: 'Maja Peterson',
      picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg'
    },
    {
      name: 'pipi',
      picture: 'url(/pipi.jpg)'
    },
    {
      name: 'Oscar ',
      picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg'
    }
  ];
 
  chats.forEach((chat) => {
    const message = Messages.findOne({ chatId: { $exists: false } });
    chat.lastMessage = message;
    const chatId = Chats.insert(chat);
    Messages.update(message._id, { $set: { chatId } });
  });
});