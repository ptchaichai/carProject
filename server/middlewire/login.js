export default {
  authUser: (req, res, next) => {
    if (!req.session && req.session.user) {
      res.json({
        status: 2,
        data: '请重新登录'
      })
    } else {
      next();
    }
  }
}