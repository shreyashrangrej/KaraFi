exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.companyAdminBoard = (req, res) => {
    res.status(200).send("Company Admin Content.");
};

exports.projectManager = (req, res) => {
    res.status(200).send("Project Manager Content.");
};