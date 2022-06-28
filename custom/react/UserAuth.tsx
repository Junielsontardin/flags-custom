import React from "react";
import { ExtensionPoint, Session } from "vtex.render-runtime";

import useSessionResponse from "./hooks/useSessionResponse";

const UserAuth: StorefrontFunctionComponent<any> = () => {
    const sessionResponse = useSessionResponse();

    // console.log("UserAuth");
    // console.log("sessionResponse");
    // console.log(sessionResponse);

    if (sessionResponse) {
        const isAuthenticated = (sessionResponse as Session).namespaces?.profile
            ?.isAuthenticated;

        if (isAuthenticated?.value === "true") {
            return (
                <>
                    {console.log("user-auth-content")}
                    <ExtensionPoint id="user-auth-content" />
                </>
            );
        }
    }

    return (
        <>
            {console.log("user-auth-fallback")}
            <ExtensionPoint id="user-auth-fallback" />
        </>
    );
};

export default UserAuth;
