const Job = require('../models/Job');


async function getAllJobs() {
    return Job.find({}).lean();
}

async function createJobAd(job) {
    const result = new Job(job);

    await result.save();
    return result;
}

async function getJobById(id) {
    return Job.findById(id).lean();
}

async function getJobsAndUsers(id) {
    return Job.findById(id).populate('owner').populate('users').lean();
}

async function updateJob(id, job) {
    const existing = await Job.findById(id);

    existing.headline = job.headline;
    existing.location = job.location;
    existing.companyName = job.companyName;
    existing.companyDescription = job.companyDescription;


    await existing.save();
}

async function deleteById(id) {
    await Job.findByIdAndDelete(id);
}

async function getFirstJobs() {
        return Job.find({}).sort({createdAt:1}).limit(3).lean();
}

async function apply(jobId, userId) {
    const job = await Job.findById(jobId);
 
    if(job.users.includes(userId)) {
        throw new Error('User is already part of the trip');
    }  
 
    job.users.push(userId);
    await job.save();
 }



module.exports = {
    getAllJobs,
    createJobAd,
    getJobById,
    getJobsAndUsers,
    updateJob,
    deleteById,
    getFirstJobs,
    apply
}
