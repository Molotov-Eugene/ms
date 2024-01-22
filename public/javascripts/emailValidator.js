function emailValidator(data, email) {
  var list = data.users.map(x => x.email.toLowerCase());
  if (list.indexOf(email.toLowerCase()) === -1) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  console.log('wrong email')
  return false;
}

module.exports = emailValidator;
