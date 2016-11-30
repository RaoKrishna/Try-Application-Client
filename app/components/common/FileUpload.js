import React, { Component, PropTypes } from 'react';
import {
    UPLOAD_FILE,
    DISABLE_SUBMIT,
    SET_SUCCESS_MSG,
    FILE_EXTENSION_ERROR_MSG,
    MANDATORY_FILES_ERROR_MSG
} from '../../helpers/constants';

export default class FileUpload extends Component {

    selectFiles(event) {

        this.props.dispatch({
            type: SET_SUCCESS_MSG,
            message: ''
        });

        if(event.target.files.length > 0) {

            var canProceed = true;

            if(this.props.fileFormats != "") {
                var formats = this.props.fileFormats.split(",");
                var filesAreValid = true;
                for(var i = 0; i < event.target.files.length; i++) {
                    var name = event.target.files[i].name.trim();
                    var extension = name.substr(name.lastIndexOf('.'), name.length - name.lastIndexOf('.')).trim();
                    console.log(extension);

                    filesAreValid = formats.reduce((isValid, file) => {
                        return (file.trim().indexOf(extension) != -1) && isValid
                    }, true);
                }
                if(!filesAreValid) {
                     this.props.dispatch({
                         type: DISABLE_SUBMIT,
                         disable: true
                     });

                     this.props.dispatch({
                         type: FILE_EXTENSION_ERROR_MSG,
                         message: 'Some of the selected files have invalid extension.'
                     });

                    canProceed = false;
                } else {
                    this.props.dispatch({
                        type: FILE_EXTENSION_ERROR_MSG,
                        message: ''
                    });
                }
            }

            if(this.props.mandatoryFiles != "") {
                var mandatoryFiles = this.props.mandatoryFiles.split(",");
                console.log(mandatoryFiles);
                var filesPresent = true;
                filesPresent = mandatoryFiles.every((file) => {
                    console.log(file);
                    for(var i = 0; i < event.target.files.length; i++) {
                        var name = event.target.files[i].name.trim();
                        console.log(name);
                        if(file.trim() === name) {
                            return true;
                        }
                    }
                    return false;
                });
                console.log("Files present: " + filesPresent);
                if(!filesPresent) {
                    this.props.dispatch({
                        type: DISABLE_SUBMIT,
                        disable: true
                    });

                    this.props.dispatch({
                        type: MANDATORY_FILES_ERROR_MSG,
                        message: 'Some of the mandatory files are missing.'
                    });

                    canProceed = false;
                } else {
                    this.props.dispatch({
                        type: MANDATORY_FILES_ERROR_MSG,
                        message: ''
                    });
                }
            }

            if(canProceed) {
                this.props.dispatch({
                    type: UPLOAD_FILE,
                    file: event.target.files
                });

                this.props.dispatch({
                    type: DISABLE_SUBMIT,
                    disable: false
                });
            }
        }
    }

    render() {

        var formats = "";
        if(this.props.fileFormats != "") {
            formats = this.props.fileFormats.split(",");
            formats = formats.reduce((totalFormat, format) => {
                totalFormat += format + ",";
                totalFormat += 'application/' + format + ",";
                return totalFormat;
            }, '');
            formats = formats.slice(0, formats.length - 1);
        }
        console.log("Disable upload: ", this.props.disabled);

        return (
            <div className="file-upload">
                <label className={this.props.disabled ? "disable-button" : "button"} disabled={this.props.disabled}> Click to upload files
                    <input type="file" multiple onChange={(file) => this.selectFiles(file)} accept={formats} hidden disabled={this.props.disabled} />
                </label>
            </div>
        )
    }
}