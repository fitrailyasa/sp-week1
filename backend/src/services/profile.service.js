const bcrypt = require('bcrypt');
const prisma = require('../../prisma/client');

const getProfiles = async () => {
  const users = await prisma.user.findMany();

  return users;
};

const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return user;
};

const updateProfile = async (userId, { name, email, password, role }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.update({
    where: { id: userId },
    data: { name, email, password: hashedPassword, role },
  });

  return user;
};

module.exports = {
  getProfiles,
  getProfile,
  updateProfile,
};
