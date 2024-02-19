import { SignUp } from "../models/users.js";
import { Session } from "../models/sessions.js";
import { Access } from "../models/access.js";

async function getUserFunction() {
  return await SignUp.findAll();
}

// async function searchFunction(search) {
//   const searchResult = (await SignUp.findAll()).filter((obj) => {
//     var temp = obj.toJSON();
//     for (let key in temp) {
//       if (typeof temp[key] === "string" && temp[key].includes(search)) {
//         var temp1 = temp;
//       }
//     }
//     return temp1;
//   });

//   return searchResult;
// }

async function insertUserFunction(username, password, roleid) {
  try {
    return await SignUp.create({ username, password, roleid });
  } catch (error) {
    return { msg: error.errors.map((ele) => ele.message).join() };
  }
}

async function createSessionFunction(userid, token) {
  return await Session.create({ userid, token });
}

async function checkUserFunction(username) {
  const obj = await SignUp.findOne({
    where: {
      username: username,
    },
  });
  return obj;
}

async function updateProfileFunction(token, profile) {
  const NOT_FOUND_MSG = { msg: "user not found" };

  const userSession = await Session.findOne({
    where: {
      token: token,
    },
  });
  const id = userSession.userid;

  const obj = await SignUp.update(
    { profile },
    {
      where: {
        id: id,
      },
    }
  );

  //response.send(obj ? obj : NOT_FOUND_MSG);
  const res =
    obj[0] >= 1 ? { msg: "Profile Updated" } : { msg: "cannot upload profile" };
  return res;
}

async function logoutProfileFunction(token) {
  const NOT_FOUND_MSG = { msg: "user not found" };
  const obj = await Session.update(
    { expiry: "yes" },
    {
      where: {
        token: token,
        expiry: "no",
      },
    }
  );
  //response.send(obj ? obj : NOT_FOUND_MSG);
  const res =
    obj[0] >= 1 ? { msg: "logout successful" } : { msg: "not logged in" };
  return res;
}

async function deleteProfileFunction(token) {
  const userSession = await Session.findOne({
    where: {
      token: token,
      expiry: "no",
    },
  });
  const id = userSession.userid;

  const userRole = await SignUp.findOne({
    where: {
      id: id,
    },
  });
  const rid = userRole.roleid;
  console.log("rid :" + rid);

  const userAccess = await Access.findOne({
    where: {
      roleid: rid,
    },
  });
  const rname = userAccess.rolename;
  console.log("rolename :" + rname);
  return rname;
}

async function deleteFunction(id) {
  return await SignUp.destroy({
    where: {
      id: id,
    },
  });
}

export default {
  insertUserFunction,
  getUserFunction,
  checkUserFunction,

  createSessionFunction,
  updateProfileFunction,
  logoutProfileFunction,
  deleteProfileFunction,
  deleteFunction,
};
