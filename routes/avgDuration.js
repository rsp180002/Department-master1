var express = require("express");
var router = express.Router();
const Titles = require("../models/titles");

/* GET Oldest Employee page. */
router.get("/", function(req, res, next) {
  Titles.aggregate(
    [
      // { $match: {} },
      {
        $project: {
          title: "$title",
          time: {
            $subtract: [
              { $dateFromString: { dateString: "$to_date" } },
              { $dateFromString: { dateString: "$from_date" } }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$title",
          durationAvg: { $avg: "$time" }
        }
      },
      {
        $sort: { durationAvg: -1 }
      }
    ],
    (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      // console.log(result);
      const formatedTime = result.map(single => {
        const date = new Date(single.durationAvg);
        const time = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDay()
        };
        single.time = time;
        return single;
      });

      // console.log(formatedTime);
      res.render("avgDuration", { formatedTime });
    }
  );
});

module.exports = router;
