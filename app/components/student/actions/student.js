import axios from 'axios';
import {
    SET_LOADING,
    FILE_FORMATS,
    MANDATORY_FILES,
    SET_SUCCESS_MSG,
    POPULATE_COURSES,
    FILE_FORMAT_BLOCK,
    POPULATE_ASSIGNMENTS,
    POPULATE_INSTRUCTORS,
    SET_SCRIPTS_RESPONSE,
    FILE_FORMAT_BLOCK_MSG
} from '../../../helpers/constants';
import * as localStorage from '../../../helpers/localStorage';

export function fetchInstructors() {
    return dispatch => {
        axios.get(`https://ec2-35-163-206-61.us-west-2.compute.amazonaws.com:5000/student/instructors/`)
            .then(function(response) {
                console.log('Instrcutors: ', response.data);
                dispatch({
                    type: POPULATE_INSTRUCTORS,
                    instructors: response.data
                });
                dispatch({
                    type: SET_LOADING,
                    loading: false
                })
            }).catch(function(err) {
            console.log('Error is => ', err);
        })
    }
}

export function fetchCourses(instructorId) {
    console.log('Fetching courses');
    return dispatch => {
        axios.get(`https://ec2-35-163-206-61.us-west-2.compute.amazonaws.com:5000/student/${instructorId}/courses/`)
            .then(function(response) {
                console.log('Courses: ', response.data);
                dispatch({
                    type: POPULATE_COURSES,
                    courses: response.data
                });
                dispatch({
                    type: SET_LOADING,
                    loading: false
                })
            }).catch(function(err) {
                console.log('Error is => ', err);
            })
    }
}

export function fetchAssignments(instructorId, courseId) {
    return dispatch => {
        axios.get(`https://ec2-35-163-206-61.us-west-2.compute.amazonaws.com:5000/student/${instructorId}/${courseId}/assignments/`)
            .then(function(response) {
                console.log('Assignments: ', response.data);
                dispatch({
                    type: POPULATE_ASSIGNMENTS,
                    assignments: response.data
                });
                dispatch({
                    type: SET_LOADING,
                    loading: false
                })
            }).catch(function(err) {
            console.log('Error is => ', err);
        })
    }
}

export function fetchFileFormats(instructorId, courseId, assignmentId) {
    return dispatch => {
        axios.get(`https://ec2-35-163-206-61.us-west-2.compute.amazonaws.com:5000/student/${instructorId}/${courseId}/${assignmentId}/fileformat/`)
            .then(function(response) {
                var formats = response.data;
                console.log(formats);
                if(formats.length != 0) {

                    dispatch({
                        type: FILE_FORMAT_BLOCK,
                        show: true
                    });

                    var message = formats.reduce((msg, format) => {
                            if (format.trim().indexOf("Restricted") == 0) {
                                format = format.substring(format.indexOf(":") + 1, format.length);
                                msg += "You can only submit files having following extensions: " + format + ".\n";

                                dispatch({
                                    type: FILE_FORMATS,
                                    formats: format
                                })

                            } else {
                                format = format.substring(format.indexOf(":") + 1, format.length);
                                msg += "You should submit following files: " + format + ".\n";

                                dispatch({
                                    type: MANDATORY_FILES,
                                    files: format
                                })
                            }
                        return msg;
                    }, '');

                    console.log("in action: " + message);

                    dispatch({
                        type: FILE_FORMAT_BLOCK_MSG,
                        message: message
                    });

                } else {
                    dispatch({
                        type: FILE_FORMAT_BLOCK,
                        show: false
                    });

                    dispatch({
                        type: FILE_FORMATS,
                        formats: ""
                    });

                    dispatch({
                        type: MANDATORY_FILES,
                        files: ""
                    })
                }
            }).catch(function(err) {
            console.log('Error is => ', err);
        })
    }
}

export function submitAssignment(student) {
    return dispatch => {
        console.log('submitting: ', student);
        var promises = [];
        for(var i = 0; i < student.file.length; i++) {
            let req = new XMLHttpRequest();
            let file = new FormData();
            file.append('file', student.file[i]);
            file.append('fieldname', 'upl');
            req.open('POST', `https://ec2-35-163-206-61.us-west-2.compute.amazonaws.com:5000/student/submission/${student.instructorId}/${student.courseId}/${student.assignmentId}/`);
            let auth = localStorage.get('auth') || {};
            if (auth.token) {
             req.setRequestHeader('Authorization', ('Bearer ' + auth.token));
             }
            req.send(file);
            req.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    promises.push(Promise.resolve(1));
                    console.log('Doneee: ', req.status)
                    dispatch({
                        type: SET_SUCCESS_MSG,
                        message: 'Files uploaded successfully. Running scripts...'
                    })
                }
            });
        }
        var interval = setInterval(intt, 100);
        function intt() {
            Promise.all(promises).then(value => {
                console.log(value);
                axios.get(`https://ec2-35-163-206-61.us-west-2.compute.amazonaws.com:5000/student/submission/${student.instructorId}/${student.courseId}/${student.assignmentId}/runScript/`)
                    .then(function(response) {
                        console.log('Output: ', response.data);
                        dispatch({
                            type: SET_SCRIPTS_RESPONSE,
                            response: response.data
                        });
                    }).catch(function(err) {
                    console.log('Error is => ', err);
                })
                clearInterval(interval);
            }, reason => {
                console.log(reason)
            });
        }

        //console.log(promises);
    }
}