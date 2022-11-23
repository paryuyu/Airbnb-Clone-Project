import * as React from 'react';
//export const EmailLogin: React.FC<SignupProps> = ({ isShown, onModal, onMove, onEmail, onLogin }) => {
import { Box, Button, TextField, Divider, IconButton } from '@mui/material';
import { EmailLogin } from '../signin/email-form';
import { PasswordLogin } from '../signin/password-form';
import { SignUp } from './signup-form';
import { AgreeForm } from '../agree/agree-form';
import { FinalAgreeForm } from '../agree/final-agree-form';
import { WelcomeForm } from './welcom-form';
import { DeleteNotice } from './delete-notice-form';
import { useSession } from 'next-auth/react';
type ModalProps = {
    isShown: (modal: boolean) => void
}
//인증 후에 메뉴 아이템 바꾸기

//오늘 할 것 : 회원가입 연동, 인증구현(Email기반), 회원가입 끝나고-> 동의 및 거부창 -> 동의는 로그인 -> 동의거부 -> 돌아가기/가입취소하기


export const ModalForm: React.FC<ModalProps> = ({ isShown }) => {

    const [moveType, setMoveType] = React.useState<string>("email");
    const [email, setEmail] = React.useState<string>("");
    const [modal, setModal] = React.useState<boolean>(false);

    // //이건 수정
    // React.useEffect(()=>{
    //     setMoveType("email")
    // },[])

    //이메일 받아오기
    //이메일에서는 모달 닫기
    //방향 정하기 

    const {data, status} = useSession();

    const moveHandle = (move: string) => {
        setMoveType(move)
        console.log(move)
    }

    
 
    React.useEffect(() => {
        console.log(modal, "modal");
        if (!modal) {
            setModal(true)
            isShown(true)
        }

      
    }, [moveType])

    return (<Box>

        {moveType == "email" ? <EmailLogin
            onMove={moveHandle}
            onModal={(modal) => { isShown(modal); console.log(modal); }}
            onEmail={(email) => { setEmail(email); console.log(email); }} /> : <></>
        }


        {moveType == "password" ? <PasswordLogin
            onMove={moveHandle}
            onModal={(modal) => { isShown(modal); console.log(modal); }}
            email={email}
        /> : <></>
        }

        {moveType == "register" ?
            <SignUp
                onMove={moveHandle}
                email={email} /> : <></>
        }

        {moveType == "firstAgree" ?
            <AgreeForm
                onMove={moveHandle}
                email={email} /> : <></>
        }


        {moveType == "finalAgree" ?
            <FinalAgreeForm
                onMove={moveHandle}
                email={email} /> : <></>
        }

        {moveType == "deleteNotice" ?
            <DeleteNotice
                onModal={(modal) => { isShown(modal); console.log(modal); }}
                onMove={moveHandle}

            /> : <></>
        }

{moveType == "welcomeForm" ?
            <WelcomeForm
                onModal={(modal) => { isShown(modal); console.log(modal); }}
                onMove={moveHandle}
            /> : <></>
        }
    </Box>




    )
}