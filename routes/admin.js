/**
 * Admin Routes
 */
module.exports.create = express => {
    const router = express.Router();
    
    router.get('/', (req, res) => {
        res.render('admin/pages/home', {
            viewId: 'admin_home',
            viewRoot: '',
            title: 'Admin'
        });
    });

    router.get('/circuits', (req, res) => {
        res.render('admin/pages/circuits', {
            viewId: 'admin_circuits',
            viewRoot: 'anagrafiche',
            title: 'Circuiti'
        });
    });

    return router;
}
