module.exports = {
  randomEmail() {
    const timestamp = Date.now();
    return `user_${timestamp}@teste.com`;
  },

  randomName() {
    return `User ${Math.floor(Math.random() * 9999)}`;
  },

  randomPassword() {
    return `Senha${Math.floor(Math.random() * 9999)}!`;
  }
};
