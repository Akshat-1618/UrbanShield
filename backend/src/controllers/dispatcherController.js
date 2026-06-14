const dispatcher =
require("../algorithms/dispatcher");

exports.getPriorityQueue =
(
  req,
  res
) => {

  return res.status(200).json({

    success: true,

    data: dispatcher.getQueue(),

  });

};