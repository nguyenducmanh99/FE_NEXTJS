"use client";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { selectMessage } from "@/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { BootstrapInput } from "./SignUpDialog";
import { useMessageSlice } from "@/store";
import Iconify from "../utils/iconify";
import { io } from "socket.io-client";
import { APP_SOCKET_URL, AUTH_INFO } from "@/constant";
import { useEffect } from "react";
import { useLocalStorage } from "@/hook";
import { RequestStatus } from "@/constant";
import useUpdateEffect from "@/hook/useUpdateEffect";



export default function PopupMessage() {
  const { open, conversationData, conversationStatus } =
    useSelector(selectMessage);
  const [authInfo, setAuthInfo] = useLocalStorage(AUTH_INFO, "");
  const dispatch = useDispatch();
  const {
    changeStatePopup,
    connectSocketRequest,
    disconnectSocketRequest,
    getConversationRequest,
    resetConversationStatus,
  } = useMessageSlice().actions;
  const [show, setShow] = React.useState<boolean>(true);
  const [message, setMessage] = React.useState<string>();

  useEffect(() => {
    if(open) {
      const onConnect = () => console.log("connected");
      const onDisconnect = () => console.log("disconnected");
      const socket = io(APP_SOCKET_URL);
      (async () => {
        await dispatch(connectSocketRequest());
        socket.on("onMessage", (dataMess) => {
          console.log("dataMess", dataMess);
        });
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
  
        await dispatch(getConversationRequest());
      })();
  
      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useUpdateEffect(() => {
    if (conversationStatus == RequestStatus.SUCCESS) {
      dispatch(resetConversationStatus());
    }
  }, [conversationStatus, dispatch, resetConversationStatus]);

  const handleZoomOut = React.useCallback(() => {
    setShow(false);
  }, []);

  const handleClose = React.useCallback(async () => {
    await dispatch(changeStatePopup());
  }, [changeStatePopup, dispatch]);

  const handleChangeMessage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    [],
  );

  const handleSendMessage = React.useCallback(() => {
    if (message) {
      const content = {
        authorId: authInfo.id,
        message: message,
      };
      const socket = io(APP_SOCKET_URL);
      socket.emit("newMessage", content);
    }
  }, [authInfo.id, message]);

  return (
    <>
      {open &&
        (show ? (
          <>
            <section className="msger">
              <header
                className="msger-header"
                style={{ backgroundColor: "yellowgreen" }}
              >
                <div
                  className="msger-header-title"
                  style={{ alignSelf: "center", color: "ivory" }}
                >
                  Messenger
                </div>
                <div>
                  <IconButton
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={handleZoomOut}
                  >
                    <HorizontalRuleIcon />
                  </IconButton>

                  <IconButton size="small" onClick={handleClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </header>

              <main className="msger-chat">
                {conversationData &&
                  conversationData.map((el) => {
                    const position: string =
                      el.authorId === authInfo.id ? "right" : "left";
                    const avtUrl = el.users.avatarUrl || "";
                    const name = el.users?.name;
                    const nameDisplay = name?.charAt(0);

                    return (
                      <>
                        <div className={`msg ${position}-msg`}>
                          <Avatar
                            sx={{ alignSelf: "center", marginTop: "25px" }}
                            src={avtUrl}
                          >
                            {!avtUrl && nameDisplay}
                          </Avatar>

                          <div className="msg-bubble">
                            <div className="msg-info">
                              <div className="msg-info-name">{name}</div>
                              <div className="msg-info-time">
                                {dayjs(el.createAt).format("hh:mm a")}
                              </div>
                            </div>

                            <div
                              className={`msg-text ${position}-text`}
                              style={{ padding: "10px" }}
                            >
                              {el.message}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </main>

              <form className="msger-inputarea">
                {/* <input type="text" className="msger-input" placeholder="Enter your message..." /> */}
                <BootstrapInput
                  placeholder="Enter your message..."
                  fullWidth={true}
                  sx={{ padding: "0px !important" }}
                  value={message}
                  onChange={handleChangeMessage}
                />
                <button
                  type="button"
                  className="msger-send-btn"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </form>
            </section>
          </>
        ) : (
          <>
            <IconButton
              color="success"
              className="mess-icon-large"
              onClick={() => setShow(true)}
              size="large"
            >
              <Iconify
                icon="fe:messanger"
                style={{ width: "70px", height: "70px" }}
              />
            </IconButton>
          </>
        ))}
    </>
  );
}
