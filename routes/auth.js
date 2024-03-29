const express = require("express");
const router = express.Router();

const template = require("../lib/template.js");

const authData = {
  email: "asdf@asdf.com",
  password: "1234",
  nickname: "egoing"
};

router.get("/login", (request, response) => {
  var title = "WEB - login";
  var list = template.list(request.list);
  var html = template.HTML(
    title,
    list,
    `
        <form action="/auth/login_process" method="post">
          <p>
            <input type="text" name="email" placeholder="email">
          </p>
          <p>
            <input type="password" name="pwd" placeholder="password">
          </p>
          <p>
            <input type="submit" value="login">
          </p>
        </form>
        `,
    ""
  );
  response.send(html);
});

router.post("/login_process", (request, response) => {
  var post = request.body;
  var email = post.email;
  var password = post.pwd;
  if (email === authData.email && password === authData.password) {
    request.session.is_logined = true;
    request.session.nickname = authData.nickname;
    request.session.save(function() {
      response.redirect(`/`);
    });
  } else {
    response.send("Who?");
  }
});

router.get("/logout", (request, response) => {
  request.session.destroy(function(err) {
    response.redirect("/");
  });
});

module.exports = router;
