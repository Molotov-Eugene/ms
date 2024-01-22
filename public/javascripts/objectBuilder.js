function getDate() {
  return new Date().toLocaleDateString('ru-RU')
};

function objectBuilder(data, user, action) {
  var newData = { ...data },
    newUser = { ...user, email: user.email.toLowerCase() };


  var userIndex = action === 'add'
    ? data.users.indexOf(data.users.find(x => x.email === user.email.toLowerCase()))
    : data.users.indexOf(data.users.find(x => x.email === user.oldEmail.toLowerCase()))

  newUser.created = newData.users[userIndex] ? newData.users[userIndex].created : getDate();
  newUser.updated = action === 'update' ? getDate() : 'Not changed';

  switch (action) {
    case ('add'):
      newData.users.push(newUser);
      break;
    case ('update'):
      newData.users[userIndex] = newUser;
      break;
    default:
      console.error('unknown action');
  }

  return newData;
}

module.exports = objectBuilder;
