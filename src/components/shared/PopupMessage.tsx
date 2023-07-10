import * as React from "react";
// import dayjs, { Dayjs } from "dayjs";
import { selectMessage } from "@/store/selectors";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { BootstrapInput } from "./SignUpDialog";
import { useMessageSlice } from "@/store";
import Iconify from "../utils/iconify";

export default function PopupMessage() {
  const { open } = useSelector(selectMessage);
  const dispatch = useDispatch();
  const { changeStatePopup } = useMessageSlice().actions;
  const [show, setShow] = React.useState<boolean>(true)
  const handleClose = React.useCallback(() => {
    dispatch(changeStatePopup())       
  }, [changeStatePopup, dispatch])

  const handleZoomOut = React.useCallback(() => {
    setShow(false)
  }, [])

  return (
    <>
    {open && ( show ?
    <>
      <section className="msger">
     <header className="msger-header" style={{ backgroundColor: "yellowgreen"}}>
       <div className="msger-header-title" style={{alignSelf: "center", color: "ivory"}}>
        SimpleChat
       </div>
       <div>
       <IconButton size="small" sx={{mr: 1}} onClick={handleZoomOut}>
        <HorizontalRuleIcon />
       </IconButton>

       <IconButton size="small" onClick={handleClose}>
        <CloseIcon />
       </IconButton>
       </div>


     </header>
   
     <main className="msger-chat">
       <div className="msg left-msg">
        <Avatar sx={{ marginBottom: "12px" }}>N</Avatar>
   
         <div className="msg-bubble">
           <div className="msg-info">
             <div className="msg-info-name">BOT</div>
             <div className="msg-info-time">12:45</div>
           </div>
   
           <div className="msg-text left-text">
             Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
           </div>
         </div>
       </div>
   
       <div className="msg right-msg">
       <Avatar sx={{ marginBottom: "12px" }}>M</Avatar>
   
         <div className="msg-bubble" style={{color: '#333'}}>
           <div className="msg-info" >
             <div className="msg-info-name">Sajad</div>
             <div className="msg-info-time">12:46</div>
           </div>
   
           <div className="msg-text right-text">
             You can change your name in JS section!
           </div>
         </div>
       </div>
     </main>
   
     <form className="msger-inputarea">
       {/* <input type="text" className="msger-input" placeholder="Enter your message..." /> */}
       <BootstrapInput
          placeholder="Enter your message..." 
          fullWidth={true}
          sx={{padding: "0px !important"}}
        />
       <button type="submit" className="msger-send-btn">Send</button>
     </form>
   </section>
   </> : <>      
    <IconButton
        color="success"
        className="mess-icon-large"
        onClick={() => setShow(true)}
        size="large"
      >  
        <Iconify icon="fe:messanger" style={{ width: "70px", height: "70px"}}/>
      </IconButton>
      </>
   )}
   </>
  );
}
