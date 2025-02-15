const profileService = require('../services/profile.service');
const { userValidationSchema } = require('../validations/user.validation');
const handleResponse = require('../utils/responseHandler');
const catchAsync = require('../utils/catchAsync');

const getProfiles = catchAsync(async (req, res) => {
  const users = await profileService.getProfiles();

  if (!users) {
    return handleResponse(res, 404, 'Users not found.');
  }

  handleResponse(res, 200, 'Success get users!', users);
});

const getProfile = catchAsync(async (req, res) => {
  const user = await profileService.getProfile(req.params.id);

  if (!user) {
    return handleResponse(res, 404, 'User not found.');
  }

  handleResponse(res, 200, 'Success get user!', user);
});

const updateProfile = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, role } = req.body;
  const { error } = userValidationSchema.validate(req.body);
  const existingUser = await profileService.getProfile(userId);
  const isEmailChanged = email && email !== existingUser.email;

  if (error) {
    return handleResponse(res, 400, 'Validation Error', null, error.details[0].message);
  }

  if (!existingUser) {
    return handleResponse(res, 404, 'User not found.');
  }

  if (isEmailChanged) {
    const allUsers = await profileService.getProfiles();
    const isEmailTaken = allUsers.some((user) => user.email === email);

    if (isEmailTaken) {
      return handleResponse(res, 400, 'User email already exists.');
    }
  }

  const updatedUser = await profileService.updateUser(userId, {
    name,
    email,
    password,
    role,
  });

  handleResponse(res, 200, 'Success update profile!', updatedUser);
});

module.exports = {
  getProfiles,
  getProfile,
  updateProfile,
};
