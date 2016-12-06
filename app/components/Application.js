import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

@connect(state => ({state}))
export default class Application extends React.Component {

    constructor(props, context) {
        super(props, context);
    };

    render() {
        return (
            <div>
                <div>
                    {
                        this.props.children &&
                        React.cloneElement(
                            this.props.children,
                            {dispatch: this.props.dispatch, ...this.props.state}
                        )
                    }
                </div>
            </div>
        );
    }
}