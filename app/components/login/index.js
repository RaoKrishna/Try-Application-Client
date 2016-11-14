import Login from './components/Login';

module.exports = {
    path: 'login',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, Login);
        });
    }
};