// roles and roleRights are used to define the roles and the rights of each role.
// for hado we have the following roles: admin, user
// admin can do everything
// users are three types: student, receiver,
// student can create his own profile, update it, delete it.
// reciver or requestor can create his own profile, update it, delete it. and can create a request, update it, delete it.
// admin can create, update, delete all users and requests.

const rolesAssumed = ['user', 'admin', 'operator'];
const allRights = {
  student: ['getUser', 'updateUser', 'createUser','deleteUser'],
  operator: ['getUser', 'getUsers', 'updateUser', 'createUser', 'deleteUser'],
  admin: ['getUser', 'getUsers', 'updateUser', 'createUser', 'deleteUser']
};

const allRoles = {
  student: [...allRights.student],
  operator: [...allRights.operator],
  admin: [...allRights.admin],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
