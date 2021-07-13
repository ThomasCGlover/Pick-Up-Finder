const router = require('express').Router();
const {CommModel, UserModel} = require('../models');
const middleware = require('../middleware');


// create comment
router.post("/add/:GameId", middleware.validateSession, async (req, res) => {
    const {content} = req.body;
    const {id, username} = req.user;
    const createComment = {
        content: content,
        userId: id,
        GameId: req.params.GameId,
        username: username
    }

    try{
        const newComment = await CommModel.create(
            createComment
        );

        res.status(201).json({
            message: 'Comment successfully posted',
            newComment
        })
    } catch(err){
        res.status(500).json({
            message: 'Failed to create Game',
            error: `${err}`
        })
    }
})

// allows user to delete comment they've created
router.delete('/delete/:commentId', middleware.validateSession, async (req, res) => {
    const {id} = req.user;
    try {
        const deletedComment = await CommModel.destroy({
            where: { 
                userId: id,
                id: req.params.commentId,

            }
        })
        res.status(200).json({
            message: "Comment successfully deleted",
            deletedComment: deletedComment === 0? 'none' : deletedComment,
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete comment: ${err}`
        })
    }
})

//allows user to edit comment they've created
router.put('/edit/:id', middleware.validateSession, async (req, res) =>{
    const {content} = req.body;
    const {id} = req.user;
    try{
        const commUpdate = await CommModel.update({
            content},
            {where: { 
                id: req.params.id,
                userId: id,

            }}
            )
            res.status(200).json({
                message: `Comment successfully updated`,
                commUpdate
            })
    }catch(err) {
        res.status(500).json({
            message: `Failed to update comment: ${err}`
        })
    }
})

// gets all comments for individual user
router.get('/mycomments', middleware.validateSession, async (req, res) => {
    const {id} = req.user;
    try{
        const userComments = await CommModel.findAll({
            where: {
                userId: id
            }
        })
        res.status(200).json({
            userComments
        })
    }catch(err){
        res.status(500).json({
            message: `Failed to get comments: ${err}`
        })
    }
})

//get username for comment
// router.get('/getusername', middleware.validateSession, async (req, res) => {
//     const {id} = req.user;
//     try{
//         const userComments = await CommModel.One({
//             where: {
//                 userId: id
//             }
//         })
//         res.status(200).json({
//             userComments
//         })
//     }catch(err){
//         res.status(500).json({
//             message: `Failed to get comments: ${err}`
//         })
//     }
// })

module.exports = router;