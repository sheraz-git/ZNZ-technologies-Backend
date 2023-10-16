const AdvanceResults = (model, populate) => {
  return async (req, res, next) => {
    let BlogQuery = model.find();
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit);
    const skip = (page - 1) * limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCounts = await model.count();

    if (req.query.topic) {
      BlogQuery = BlogQuery.find({
        topic: { $regex: req.query.topic, $options: "i" },
      });
    }
    const Pagination = {};

    if (endIndex < totalCounts) {
      Pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      Pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    if (populate) {
      BlogQuery = BlogQuery.populate(populate);
    }
    const blogs = await BlogQuery.find({}).skip(skip).limit(limit);
    res.results = {
      totalCounts,
      Pagination,
      data: blogs,
    };
    next();
  };
};
module.exports = AdvanceResults;
