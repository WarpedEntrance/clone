import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, makeStyles } from '@material-ui/core';
import { auth, firestore } from '../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import currentmessage from '../../redux/message/message.actions'
import setclicked from '../../redux/clicked/clicked.actions'
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyIcon from '@material-ui/icons/Reply';
import replymessage from '../../redux/replyclicked/replyclicked.actions'
import replytoggle from '../../redux/replytoggle/replytoggle.actions'
const useStyles=makeStyles(()=>{
    return{
        chatmenu:{
            display:'flex'
        },
        icon:{
            color:'#dadbdc',
            '&:hover':{
                backgroundColor:'#3a3e44'
            }
        }
    }
})

function ChatMenu({msg}) {
    const classes=useStyles();
    const dispatch = useDispatch();
    const currentid=useSelector((state)=>state.doc.id);
    const currentserverid=useSelector((state)=>state.currentserver.id);
    const handleClick = () => {
        dispatch(currentmessage({id:msg.id, msg:msg.message}))
        dispatch(setclicked());
  };
  const handleDelete=()=>{
    const docRef=firestore.collection('servers').doc(currentserverid).collection('channels').doc(currentid).collection('messages').doc(msg.id);
    docRef.delete();
  }
  const handleReply=()=>{
    console.log(msg.sendername);
    dispatch(replymessage({id:msg.id,sender:msg.sendername,msg:msg.message,photo:msg.senderphoto}));
    // ,base64:msg.base64
    dispatch(replytoggle())
    
  }
    return (
        <div className={classes.chatmenu}>
          {auth.currentUser.email===msg.senderemail ?(<>
            <IconButton className={classes.icon} onClick={handleClick}>
              <EditIcon />
            </IconButton>
            <IconButton className={classes.icon} onClick={handleDelete}>
              <DeleteIcon/>
            </IconButton>
          </>): (<IconButton className={classes.icon} onClick={handleReply}>
              <ReplyIcon />
            </IconButton>)
}
    </div>
    )
    }


export default ChatMenu