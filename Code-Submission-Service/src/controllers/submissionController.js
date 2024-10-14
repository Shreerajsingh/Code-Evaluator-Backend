async function pingRequest(req, res) {
    console.log(this.submissionService);
    const response = await this.submissionService.pingCheck();
    return res.send({message: response});
}

// TODO: Add validation layer
async function createSubmission(req, res) {
    const response = await this.submissionService.addSubmission(req.body);
    
    return res.status(201).send({
        success: true,
        message: "",
        data: response,
        error: {}
    });
}

module.exports = {
    pingRequest,
    createSubmission
};