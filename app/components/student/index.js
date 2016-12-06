import Student from './components/Student';

module.exports = {
    path: 'submission',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, Student);
        });
    }
};