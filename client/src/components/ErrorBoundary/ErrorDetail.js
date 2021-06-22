import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    .details {
        margin-top: 10%;
        width: 50vw;
        max-width: 50vw;

        pre {
            white-space: pre-wrap;
            word-break: break-word;
        }
    }
`;

const ErrorDetail = ({error, info}) => (
    <Container>
        <div className="details">
            <h2>Something went wrong.</h2>
            <details>
                <pre>{error && error.toString()}</pre>
                <br />
                <pre>{info && info.componentStack}</pre>
            </details>
        </div>
    </Container>
);

export default ErrorDetail;
