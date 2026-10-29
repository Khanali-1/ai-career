
const Job = require("../models/jobs.js");

const getJobs = async (req, res) => {
  try {
    const {
      q,
      location,
      employmentType,
      page = 1,
      limit = 20,
    } = req.query;

    const currentPage = Math.max(1, Number(page) || 1);
    const pageSize = Math.min(
      50,
      Math.max(1, Number(limit) || 20)
    );

    const filter = {};

    // 1. Search by job title or company
    if (q && q.trim()) {
      const keyword = q.trim();
      const safeKeyword = keyword.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$or = [
        { title: { $regex: safeKeyword, $options: "i" } },
        {
          companyName: {
            $regex: safeKeyword,
            $options: "i",
          },
        },
      ];
    }

    // 2. Search by city or remote
    if (location && location.trim()) {
      const safeLocation = location.trim().replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.$and = [
        ...(filter.$and || []),
        {
          $or: [
            {
              locationRestrictions: {
                $regex: safeLocation,
                $options: "i",
              },
            },
            {
              title: {
                $regex: safeLocation,
                $options: "i",
              },
            },
            {
              excerpt: {
                $regex: safeLocation,
                $options: "i",
              },
            },
          ],
        },
      ];
    }

    // 3. Filter by employment type
    if (
      employmentType &&
      employmentType.toLowerCase() !== "all"
    ) {
      filter.employmentType = {
        $regex: `^${employmentType.trim()}$`,
        $options: "i",
      };
    }

    const [jobs, total] = await Promise.all([
      Job.find(filter)
        .sort({ pubDate: -1, createdAt: -1 })
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
        .lean(),

      Job.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      total,
      page: currentPage,
      totalPages: Math.ceil(total / pageSize),
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch jobs",
    });
  }
};

module.exports =  getJobs ;
