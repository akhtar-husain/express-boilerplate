class UserController {
    async profile(req, res, next) {
        if (req.user) {
            return res.status(200).send({
                status: true,
                data: req.user
            });
        }
        return res.status(400).send({
            status: false,
            message: "User not found"
        });
    }
}

module.exports = UserController;