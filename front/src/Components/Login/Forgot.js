import React from 'react'
import { loginDiv } from './Login.module.scss'
import style from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'

function Forgot({ setIsForgot }) {
    const { t } = useTranslation();
    const handleGoBack = () => {
        setIsForgot(false);
    }

    return (
        <div style={{height: "100%"}} className={loginDiv}>
            <div style={{width: "60%"}} className={style.formDiv}>
                <h3>{t('authPopup.forgotPassword')}</h3>
                <p>{t('authPopup.forgot.text')}</p>
                <form>
                    <input name="email" placeholder={t('email')} type="text" />
                    <input style={{cursor: "pointer"}} onClick={(e) => {e.preventDefault();}} type="submit" value={t('authPopup.forgot.resetPassword')} className={style.submitBtn} />
                </form>
                <button style={{position: "absolute", bottom: "5vh"}} onClick={handleGoBack}>{t('goBack')}</button>
            </div>
        </div>
    )
}

export default Forgot
