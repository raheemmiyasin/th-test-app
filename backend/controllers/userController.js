const User = require('../models/user');

exports.list = async (req, res) => {
    let keyword = req.query.keyword;

    if(keyword){
        let user = await User.find({
            "name": {
                $regex: new RegExp(keyword, "i")
            }
        }).exec();

        res.json(user);
    } else {
        let user = await User.find().exec();

        res.json(user);
    }
    
};
