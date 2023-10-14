const { HealthBlog } = require('../models/index');
const { User } = require('../models/index');
const { Review } = require('../models/index');


// router.get('/healthblogs', healthBlogController.getAllHealthBlogs);
// router.get('/healthblogs/:id', healthBlogController.getHealthBlog);
// router.post('/healthblogs', healthBlogController.createHealthBlog);
// router.put('/healthblogs/:id', healthBlogController.updateHealthBlog);
// router.delete('/healthblogs/:id', healthBlogController.deleteHealthBlog);

// const healthBlogSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     title: String,
//     content: String,
//     tags: [String],
//     likes: [mongoose.Schema.Types.ObjectId],
//     dislikes: [mongoose.Schema.Types.ObjectId],
//     reviews: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Review'
//     }],
// }, { timestamps: true });


//@ROUTE: GET /api/healthblogs
//@DESC: Get all healthblogs
//@ACCESS: Public

const getAllHealthBlogs = async (req, res) => {
    try {
        const healthBlogs = await HealthBlog.find();
        res.status(200).json({
            success: true,
            data: healthBlogs,
            messsage: 'Successfully fetched all healthblogs'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }
}


//@ROUTE: GET /api/healthblogs/:id
//@DESC: Get a healthblog by id
//@ACCESS: Public

const getHealthBlog = async (req, res) => {
    try {
        const healthBlog = await HealthBlog.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: healthBlog,
            messsage: 'Successfully fetched healthblog'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }

}


//@ROUTE: POST /api/healthblogs
//@DESC: Create a new healthblog
//@ACCESS: Public

const createHealthBlog = async (req, res) => {
    const { body } = req;
    try {
        const healthBlog = await HealthBlog.create(body);
        res.status(200).json({
            success: true,
            data: healthBlog,
            messsage: 'Successfully created healthblog'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        })
    }
}


//@ROUTE: PUT /api/healthblogs/:id
//@DESC: Update a healthblog
//@ACCESS: Public

const updateHealthBlog = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const healthBlog = await HealthBlog.findByIdAndUpdate(id, body, { new: true });
        res.status(200).json({
            success: true,
            data: healthBlog,
            messsage: 'Successfully updated healthblog'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });
    }

}


//@ROUTE: DELETE /api/healthblogs/:id
//@DESC: Delete a healthblog
//@ACCESS: Public

const deleteHealthBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const healthBlog = await HealthBlog.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: healthBlog,
            messsage: 'Successfully deleted healthblog'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });

    }
}


//@ROUTE: POST /api/healthblogs/:id/like
//@DESC: Like a healthblog
//@ACCESS: Public

const likeHealthBlog = async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    try {
        const healthBlog = await HealthBlog.findById(id);
        const userExists = healthBlog.likes.includes(user);

        if (userExists) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'User already liked this healthblog'
            });
        }
        else {
            healthBlog.likes.push(user);
            await healthBlog.save();
            res.status(200).json({
                success: true,
                data: healthBlog,
                messsage: 'Successfully liked healthblog'
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });

    }
}


//@ROUTE: POST /api/healthblogs/:id/dislike
//@DESC: Dislike a healthblog
//@ACCESS: Public

const dislikeHealthBlog = async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    try {
        const healthBlog = await HealthBlog.findById(id);
        const userExists = healthBlog.dislikes.includes(user);

        if (userExists) {
            res.status(400).json({
                success: false,
                data: null,
                message: 'User already disliked this healthblog'
            });
        }
        else {
            healthBlog.dislikes.push(user);
            await healthBlog.save();
            res.status(200).json({
                success: true,
                data: healthBlog,
                messsage: 'Successfully disliked healthblog'
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message
        });

    }
}


//@ROUTE: POST /api/healthblogs/:id/review
//@DESC: Create a review for a healthblog
//@ACCESS: Public

const createHealthBlogReview = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const healthBlog = await HealthBlog.findById(id);
        const review = await Review.create(body);
        healthBlog.reviews.push(review._id);
        await healthBlog.save();
        res.status(200).json({
            success: true,
            data: healthBlog,
            messsage: 'Successfully created review for healthblog'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message,
        });
    }
}


//@ROUTE: GET /api/healthblogs/:id/review/:reviewId
//@DESC: Get a review for a healthblog
//@ACCESS: Public

const getHealthBlogReview = async (req, res) => {
    const { id, reviewId } = req.params;

    try {
        const healthBlog = await HealthBlog.findById(id);
        const review = await Review.findById(reviewId);
        res.status(200).json({
            success: true,
            data: review,
            messsage: 'Successfully fetched review for healthblog'
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            data: null,
            message: err.message,
        });
    }
}




module.exports = {
    getAllHealthBlogs,
    getHealthBlog,
    createHealthBlog,
    updateHealthBlog,
    deleteHealthBlog,
    likeHealthBlog,
    dislikeHealthBlog,
    createHealthBlogReview,
    getHealthBlogReview
}