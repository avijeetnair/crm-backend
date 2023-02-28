const authJwt = require("../middlewares/authjwt");

module.exports = function(app) {
    app.get("/crm/api/users", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => res.send(req.body) );
    //send a jwtToken (route) -> verify and get userId (middleware) -> get userId and send response(controller)
    //only admin can see all users, so isAdmin
}
