const uuid = require('uuid/v4')

const bookmarks = [
  {
    id: uuid(),
    title: 'Google',
    url: 'https://www.google.com',
    description: 'Great website',
    rating: 4
  },
  {
    id: uuid(),
    title: 'Facebook',
    url: 'https://www.facebook.com',
    description: 'Not a fan of this website',
    rating: 1
  },
  {
    id: uuid(),
    title: 'Youtube',
    url: 'https://www.youtube.com',
    description: 'So many entertaining videos!',
    rating: 5
  },
]

module.exports = { bookmarks }