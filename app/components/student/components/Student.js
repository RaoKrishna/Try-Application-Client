import React, { Component, PropTypes } from 'react';
import {
    fetchCourses,
    fetchFileFormats,
    fetchAssignments,
    submitAssignment,
    fetchInstructors
} from '../actions/student';
import {
    SET_ERROR,
    SET_COURSE,
    SET_LOADING,
    UPLOAD_FILE,
    FILE_FORMATS,
    PAST_DUE_DATE,
    SET_ASSIGNMENT,
    DISABLE_SUBMIT,
    SET_INSTRUCTOR,
    MANDATORY_FILES,
    SET_SUCCESS_MSG,
    FILE_FORMAT_BLOCK,
    DISABLE_UPLOAD_FILE,
    POPULATE_ASSIGNMENTS,
    SET_SCRIPTS_RESPONSE,
    FILE_EXTENSION_ERROR_MSG,
    MANDATORY_FILES_ERROR_MSG
} from '../../../helpers/constants';
import FileUpload from '../../common/FileUpload';
import Header from '../../../components/common/Header';

export default class Student extends Component {

    submit() {
        let student = this.props.student;
        console.log(student);
        this.props.dispatch(submitAssignment(student));
    }

    componentWillMount() {
        this.props.dispatch({
            type: SET_LOADING,
            loading: true
        });
        this.props.dispatch(fetchInstructors());
    }

    resetValues() {
        this.props.dispatch({
            type: SET_ERROR,
            errorMessage: ''
        });
        this.props.dispatch({
            type: FILE_FORMAT_BLOCK,
            show: false
        });
        this.props.dispatch({
            type: FILE_FORMATS,
            formats: ""
        });
        this.props.dispatch({
            type: MANDATORY_FILES,
            files: ""
        });
        this.props.dispatch({
            type: UPLOAD_FILE,
            file: []
        });
        this.props.dispatch({
            type: MANDATORY_FILES_ERROR_MSG,
            message: ''
        });
        this.props.dispatch({
            type: FILE_EXTENSION_ERROR_MSG,
            message: ''
        });
        this.props.dispatch({
            type: DISABLE_SUBMIT,
            disable: true
        });
        this.props.dispatch({
            type: SET_SCRIPTS_RESPONSE,
            scriptsResponse: ''
        });
        this.props.dispatch({
            type: SET_SUCCESS_MSG,
            message: ''
        });
        this.props.dispatch({
            type: PAST_DUE_DATE,
            pastDueDate: false
        });
        this.props.dispatch({
            type: DISABLE_UPLOAD_FILE,
            disableUploadFile: true
        });
    }

    changeInstructor(e) {

        this.props.dispatch({
            type: SET_INSTRUCTOR,
            instructor: e.target.value
        });
        this.props.dispatch({
            type: SET_COURSE,
            course: ''
        });
        this.props.dispatch({
            type: SET_ASSIGNMENT,
            assignment: ''
        });
        this.resetValues();

        if(e.target.value != "default") {
            this.props.dispatch({
                type: SET_LOADING,
                loading: true
            });
            let instructorId = e.target.value;
            this.props.dispatch(fetchCourses(instructorId));
        } else {
            this.props.dispatch({
                type: POPULATE_ASSIGNMENTS,
                assignments: []
            })
        }
    }

    changeCourses(e) {

        this.props.dispatch({
            type: SET_COURSE,
            course: e.target.value
        });
        this.props.dispatch({
            type: SET_ASSIGNMENT,
            assignment: ''
        });
        this.resetValues();

        if(e.target.value != "default") {
            this.props.dispatch({
                type: SET_LOADING,
                loading: true
            });
            let instructorId = this.props.student.instructorId;
            let courseId = e.target.value;
            this.props.dispatch(fetchAssignments(instructorId, courseId));
        } else {
            this.props.dispatch({
                type: POPULATE_ASSIGNMENTS,
                assignments: []
            })
        }
    }

    changeAssignment(e) {

        this.props.dispatch({
            type: SET_ASSIGNMENT,
            assignment: e.target.value
        });
        this.resetValues();


        if(e.target.value != "default") {
            this.props.dispatch({
                type: SET_LOADING,
                loading: true
            });
            this.props.dispatch({
                type: DISABLE_UPLOAD_FILE,
                disableUploadFile: false
            });
            let instructorId = this.props.student.instructorId;
            let courseId = this.props.student.courseId;
            let assignmentId = e.target.value;
            this.props.dispatch(fetchFileFormats(instructorId, courseId, assignmentId));
        } else {
            // disable the upload button here
        }
    }

    render() {
        let loading = this.props.application.loading;
        let instructors = this.props.student.instructors && this.props.student.instructors.map((instructor) => {
                return <option key={instructor} value={instructor}>{instructor}</option>
            });
        let courses = this.props.student.courses && this.props.student.courses.map((course) => {
            return <option key={course} value={course}>{course}</option>
            });
        let assignments = this.props.student.assignments && this.props.student.assignments.map((assignment) => {
                return <option key={assignment} value={assignment}>{assignment}</option>
            });
        let instructorId = this.props.student.instructorId || '';
        let courseId = this.props.student.courseId || '';
        let assignmentId = this.props.student.assignmentId || '';
        let successMsg = this.props.student.successMsg;
        let showFileFormatBlock = this.props.student.showFileFormatBlock;
        let uploadFileFormats = this.props.student.uploadFileFormats || '';
        let mandatoryFiles = this.props.student.mandatoryFiles || '';
        let errorMessage = this.props.student.errorMessage || '';
        let disableSubmit = this.props.student.disableSubmit || errorMessage != ''
            || instructorId == '' || courseId == ''
            || assignmentId == '';
        let fileExtensionErrorMsg = this.props.student.fileExtensionErrorMsg || '';
        let mandatoryFileErrorMsg = this.props.student.mandatoryFileErrorMsg || '';
        let fileFormatListElements = this.props.student.fileFormatMessage &&
            this.props.student.fileFormatMessage.split("\n").map((formatMsg) => {
                return (
                    <li>
                        {formatMsg}
                    </li>
                );
            });
        let submittedFiles = [];
        if(this.props.student.file) {
            for(var i = 0; i < this.props.student.file.length; i++) {
                submittedFiles.push(
                    <li>
                        {this.props.student.file[i].name}
                    </li>
                )
            }
        }
        let scriptsResponse = this.props.student.scriptsResponse || '';
        if(scriptsResponse != '') {
            scriptsResponse = scriptsResponse.split("\n").map((response) => {
                return (
                    <li>
                        {response}
                    </li>
                );
            });
        }
        if(errorMessage != '') {
            errorMessage = errorMessage.split("\n").map((response) => {
                return (
                    <li>
                        {response}
                    </li>
                );
            });
        }

        let pastDueDate = this.props.student.pastDueDate || false;
        let disableUploadFile = this.props.student.disableUploadFile;

        return (
            <div className="main-content">
                <Header showSignOut="true" dispatch={this.props.dispatch} />
                <table className="studentTable">
                    <tbody>
                    <tr>
                        <td>
                            <label className="label">Select the instructor: </label>
                        </td>
                        <td>
                            <select onChange={this.changeInstructor.bind(this)} className="dropdown"
                                    value={instructorId == '' ? "default" : instructorId} >
                                <option key="default" value="default">Select an instructor</option>
                                {instructors}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="label">Select the course: </label>
                        </td>
                        <td>
                            <select onChange={this.changeCourses.bind(this)} className="dropdown"
                                    value={courseId == '' ? "default" : courseId}>
                                <option key="default" value="default">Select a course</option>
                                {courses}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label className="label">Select the assignment: </label>
                        </td>
                        <td>
                            <select onChange={(e) => this.changeAssignment(e)} className="dropdown"
                                    value={assignmentId == '' ? "default" : assignmentId}>
                                <option key="default" value="default">Select an assignment</option>
                                {assignments}
                            </select>
                        </td>
                    </tr>
                    {
                        showFileFormatBlock &&
                        <tr>
                            <td colSpan="2">
                                {
                                    fileFormatListElements && fileFormatListElements.length > 0 &&
                                    <ul>
                                        {fileFormatListElements}
                                    </ul>
                                }
                            </td>

                        </tr>
                    }
                    <tr>
                        <td colSpan="2">
                            <FileUpload dispatch={this.props.dispatch}
                                        fileFormats={uploadFileFormats}
                                        mandatoryFiles={mandatoryFiles}
                                        disabled={disableUploadFile}
                            />
                        </td>
                    </tr>
                    {
                        (mandatoryFileErrorMsg != "" || fileExtensionErrorMsg != "") &&
                        <tr>
                            <td colSpan="2">
                                <ul>
                                    {
                                        mandatoryFileErrorMsg != "" &&
                                        <li className="file-upload-error">{mandatoryFileErrorMsg}</li>
                                    }
                                    {
                                        fileExtensionErrorMsg != "" &&
                                        <li className="file-upload-error">{fileExtensionErrorMsg}</li>
                                    }
                                </ul>
                            </td>
                        </tr>
                    }
                    {
                        pastDueDate &&
                        <tr>
                            <td colSpan="2">
                                <ul>
                                    <li className="file-upload-error">Due date has passed. You cannot submit now!</li>
                                </ul>
                            </td>
                        </tr>
                    }
                    <tr>
                        {
                            submittedFiles.length > 0 &&
                            <td colSpan="2">
                                {
                                    <div className="submitted-files-box">
                                        <p>You are submitting the following files:</p>
                                        <ul>
                                            {submittedFiles}
                                        </ul>
                                    </div>
                                }
                            </td>
                        }
                    </tr>
                    <tr>
                        <td colSpan="2" className="submit-btn-td">
                            <button className="submit-btn" disabled={disableSubmit} onClick={() => this.submit()}>Submit</button>
                        </td>
                    </tr>
                    <tr />
                    <tr>
                        <td colSpan="2">
                            {
                                scriptsResponse == '' ? <label className="label">{successMsg}</label> :
                                <div className="submitted-files-box">
                                    <ul>
                                        {scriptsResponse}
                                    </ul>
                                </div>
                            }

                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            {
                                errorMessage != '' &&
                                    <div className="submitted-files-box">
                                        <ul>
                                            {errorMessage}
                                        </ul>
                                    </div>
                            }

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}