

function getUsers(req, res){
    res.send(req.body);
}
function getUser(req, res){
    res.send(req.body);
}
function sendUser(req, res){
    res.send(req.body.user);
}
export default {getUsers, getUser, sendUser}