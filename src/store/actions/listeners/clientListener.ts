import { Client } from "@twilio/conversations";
import { Dispatch } from "redux";
import log from "loglevel";

import { sessionDataHandler } from "../../../sessionDataHandler";
import { notifications } from "../../../notifications";
import { addNotification, removeNotification } from "../genericActions";
import { ACTION_UPDATE_SESSION_DATA } from "../actionTypes";

export const initClientListeners = (conversationClient: Client, dispatch: Dispatch) => {
    const tokenAboutToExpireEvent = "tokenAboutToExpire";
    const connectionStateChangedEvent = "connectionStateChanged";

    // remove any other refresh handler added before and add it again
    conversationClient.removeAllListeners(tokenAboutToExpireEvent);

    conversationClient.removeAllListeners(connectionStateChangedEvent);
    conversationClient.addListener(connectionStateChangedEvent, (connectionStatus: string) => {
        if (connectionStatus === "connected") {
            dispatch(removeNotification(notifications.noConnectionNotification().id));
        } else if (connectionStatus === "connecting") {
            dispatch(addNotification(notifications.noConnectionNotification()));
        }
    });
};
