import React from "react";

import { ErrorLike } from "./types";

export type ErrorContext = {
    error?: ErrorLike;
};

export type ErrorHandlerContext = {
    handleError: (error: ErrorLike) => boolean;
};

export const ErrorHandlerContext = React.createContext<ErrorHandlerContext | undefined>(undefined);

export const ErrorContext = React.createContext<ErrorContext | undefined>(undefined);
