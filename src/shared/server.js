import Parse from "parse";

const server = (userEmail, userPwd) => {
  // Pass the username and password to logIn function
  Parse.User.logIn(userEmail, userPwd)
    .then((user) => {
      // Do stuff after successful login
      console.log("Logged in user", user);
      return user;
    })
    .catch((error) => {
      console.error("Error while logging in user", error);
    });
};

export default server;
