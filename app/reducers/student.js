import {
    SET_ERROR,
    SET_COURSE,
    UPLOAD_FILE,
    FILE_FORMATS,
    PAST_DUE_DATE,
    SET_ASSIGNMENT,
    SET_INSTRUCTOR,
    DISABLE_SUBMIT,
    MANDATORY_FILES,
    SET_SUCCESS_MSG,
    POPULATE_COURSES,
    FILE_FORMAT_BLOCK,
    DISABLE_UPLOAD_FILE,
    POPULATE_ASSIGNMENTS,
    POPULATE_INSTRUCTORS,
    SET_SCRIPTS_RESPONSE,
    FILE_FORMAT_BLOCK_MSG,
    FILE_EXTENSION_ERROR_MSG,
    MANDATORY_FILES_ERROR_MSG
} from '../helpers/constants';
import createReducer from '../helpers/create-reducer';

const initialState = {
    successMsg: '',
    showFileFormatBlock: false,
    disableSubmit: true,
    scriptsResponse: '',
    disableUploadFile: true
};

const actionHandlers = {
    [POPULATE_INSTRUCTORS]: (state, action) =>  ({
        instructors: action.instructors
    }),
    [POPULATE_COURSES]: (state, action) =>  ({
        courses: action.courses
    }),
    [POPULATE_ASSIGNMENTS]: (state, action) =>  ({
        assignments: action.assignments
    }),
    [UPLOAD_FILE]: (state, action) => ({
        file: action.file
    }),
    [SET_INSTRUCTOR]: (state, action) => ({
        instructorId: action.instructor
    }),
    [SET_COURSE]: (state, action) => ({
        courseId: action.course
    }),
    [SET_ASSIGNMENT]: (state, action) => ({
        assignmentId: action.assignment
    }),
    [SET_SUCCESS_MSG]: (state, action) => ({
        successMsg: action.message
    }),
    [FILE_FORMAT_BLOCK]: (state, action) => ({
        showFileFormatBlock: action.show
    }),
    [FILE_FORMAT_BLOCK_MSG]: (state, action) => ({
      fileFormatMessage: action.message
    }),
    [FILE_FORMATS]: (state, action) => ({
        uploadFileFormats: action.formats
    }),
    [DISABLE_SUBMIT]: (state, action) => ({
        disableSubmit: action.disable
    }),
    [MANDATORY_FILES]: (state, action) => ({
        mandatoryFiles: action.files
    }),
    [FILE_EXTENSION_ERROR_MSG]: (state, action) => ({
        fileExtensionErrorMsg: action.message
    }),
    [MANDATORY_FILES_ERROR_MSG]: (state, action) => ({
        mandatoryFileErrorMsg: action.message
    }),
    [SET_SCRIPTS_RESPONSE]: (state, action) => ({
        scriptsResponse: action.response
    }),
    [SET_ERROR]: (state, action) => ({
        errorMessage: action.errorMessage,
        disableSubmit: true
    }),
    [PAST_DUE_DATE]: (state, action) => ({
        pastDueDate: action.pastDueDate
    }),
    [DISABLE_UPLOAD_FILE]: (state, action) => ({
        disableUploadFile: action.disableUploadFile
    })
 };

export default createReducer(initialState, actionHandlers);