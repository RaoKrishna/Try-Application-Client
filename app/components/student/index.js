import Student from './components/Student';

module.exports = {
    path: 'student',
    getComponent(location, cb) {
        require.ensure([], (require) => {
            cb(null, Student);
        });
    }
};