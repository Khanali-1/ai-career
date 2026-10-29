const Job = require("../models/jobs.js");

const API_URL = "https://himalayas.app/jobs/api";

const syncJobs = async () => {
  const response = await fetch(
    `${API_URL}?limit=20`,
    {
      signal: AbortSignal.timeout(15000),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Himalayas API failed: ${response.status}`
    );
  }

  const data = await response.json();

  if (!Array.isArray(data.jobs)) {
    throw new Error("Invalid jobs API response");
  }

  let savedCount = 0;

  for (const job of data.jobs) {
    // Stable ID ke baghair job save nahi karni.
    if (!job.guid || !job.title) {
      continue;
    }

    const jobData = {

      // here source : tittle and companyName is our mdoel feild 
      // but this job.title is our external api feilds
      source: "himalayas",
      // here we r converting the job id into string as dfien dinto model
      externalId: String(job.guid),

      title: job.title,
      companyName: job.companyName || "Unknown company",
      companySlug: job.companySlug,
      companyLogo: job.companyLogo,

      excerpt: job.excerpt,
      description: job.description,

      employmentType: job.employmentType,
      categories: job.categories || [],
      seniority: job.seniority || [],

      locationRestrictions:
        job.locationRestrictions || [],

      timezoneRestrictions:
        job.timezoneRestrictions || [],

      minSalary: job.minSalary ?? null,
      maxSalary: job.maxSalary ?? null,
      currency: job.currency,
      salaryPeriod: job.salaryPeriod,

      applicationLink: job.applicationLink,

      // here we r convertingd ate in js

      pubDate: job.pubDate
        ? new Date(job.pubDate * 1000)
        : undefined,

      expiryDate: job.expiryDate
        ? new Date(job.expiryDate * 1000)
        : undefined,

      lastSyncedAt: new Date(),
    };


    // find and update operation or method in mongodb 

    await Job.findOneAndUpdate(
    // find job from source we have provided himaliysan external api an dcheck the id also 
      {
        source: "himalayas",
        externalId: String(job.guid),
      },
      // here we r updating the values directly into it
      {
        $set: jobData,
      },
      // here we r updateing and inserting itautomatic update and if not find then insert
      {
        upsert: true,
        // it will follow models rules of job while udpating or inserting into mongodb 
        runValidators: true,
      }
    );

    savedCount++;// 1 value thne next an dthennext 
  }

  return {
    // if all thing good then true 
    success: true,
    fetched: data.jobs.length,// length
    savedOrUpdated: savedCount,// how mnay value sor values 
    totalAvailable: data.totalCount,// total values job or cunt
  };
};

module.exports = syncJobs;
