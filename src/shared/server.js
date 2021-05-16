import Parse from "parse";

function server(userEmail, userPwd) {
  // Pass the username and password to logIn function
  let response = Parse.User.logIn(userEmail, userPwd)
    .then((user) => {
      // Do stuff after successful login
      console.log("Logged in user", user);
      return user;
    })
    .catch((error) => {
      console.error("Error while logging in user", error);
    });

  console.log(response);
  return response;
}

export default server;
