const router = require('express').Router();
const {CommModel} = require('../models');
const middleware = require('../middleware');


// create comment
router.post("/add", middleware.validateSession, async (req, res) => {
    const {content, GameId} = req.body;
    const {id} = req.user;
    const createComment = {
        content: content,
        userId: id,
        GameId: GameId,
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
router.delete('/delete', middleware.validateSession, async (req, res) => {
    const {id} = req.user;
    const {CommentId} = req.body;
    try {
        const deletedComment = await CommModel.destroy({
            where: { 
                userId: id,
                id: CommentId,

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

module.exports = router;