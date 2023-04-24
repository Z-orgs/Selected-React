import React from "react";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/common/ErrorComponent";

const LayoutAuthentication = (props) => {
    const { children, heading = "" } = props;
    return (
        <form>
            <h2>{heading}</h2>
            <label htmlFor="username">User name:</label>
            <input type="text" name="username" id="" />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="" />
            <button>{heading}</button>
        </form>
    );
};

LayoutAuthentication.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
};
export default withErrorBoundary(LayoutAuthentication, {
    FallbackComponent: ErrorComponent,
});