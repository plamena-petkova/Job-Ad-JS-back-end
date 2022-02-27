

const jobService = require('../services/job');

function preload(populate) {
    return async function(req, res, next) {
        const id = req.params.id;
        if(populate) {
            res.locals.job = await jobService.getJobsAndUsers(id);
        } else {
            res.locals.job = await jobService.getJobById(id)
        }
        
        next();
    }
}

module.exports = preload;