import React, { useState } from 'react'
import { loginDiv } from './Login.module.scss'
import style from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/user';

function ChoosingUsername({ setChooseUsername, setLogin }) {
    const { t } = useTranslation();
    const [ username, setUsername ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const dispatch = useDispatch();

    const handleGoBack = () => {
        setChooseUsername(false);
    }

    const isValidUsername = (username) => {
        if(/^[a-zA-Z0-9]+$/.test(username) && username.length > 3 && username.length < 32)
            return true;
        return false;
    };

    const handleChoose = () => {
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:8080/social/register", {
            username: username
        }).then(response => {
            dispatch(loginSuccess({
                username: username
            }));
            setLogin(false);
        }).catch(err => {
            if(!isValidUsername(username))
                setErrorMessage(t('authPopup.register.invalidUsername'));
            else
                setErrorMessage(t('authPopup.chooseUsername.alreadyUsed'));
        });
    };

    return (
        <div style={{height: "100%"}} className={loginDiv}>
            <div style={{width: "60%"}} className={style.formDiv}>
                <h3>{t('authPopup.chooseUsername.title')}</h3>
                <p style={{color:"red", margin: 0}}>{errorMessage}</p>
                <form>
                    <input value={username} onChange={e => setUsername(e.target.value)} name="username" placeholder={t('username')} type="text" />
                    <input style={{cursor: "pointer"}} onClick={(e) => {e.preventDefault(); handleChoose();}} type="submit" value={t('authPopup.chooseUsername.button')} className={style.submitBtn} />
                </form>
                <button style={{position: "absolute", bottom: "5vh"}} onClick={handleGoBack}>{t('goBack')}</button>
            </div>
        </div>
    )
}

export default ChoosingUsername
