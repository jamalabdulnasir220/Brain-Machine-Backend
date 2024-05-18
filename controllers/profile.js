
const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    // let found;
    db.select('*').from('users').where({
        id: id
    }).then(user => {
            if (user.length) {
                res.json(user[0])
            } 
            else {
                res.status(400).json('Not found')
            }
            
        })
        .catch(err => res.status(400).json('error getting user'))
    // if(!found) {
    //     res.status(400).json("no found")
    // }
}

module.exports = {
    handleProfileGet: handleProfileGet
}