import React, { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import showToast from '../../Utils/showToast';

import Cookies from 'js-cookie';

const GoogleAuthCallBack = () => {

    const navigate = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);

    const status = urlParams.get('status');

    const authToken = Cookies.get('authToken');


    useEffect(() => {
        if (status === "success" && authToken) {
            localStorage.setItem('unique', authToken);
            localStorage.setItem("token", authToken);
            navigate('/');

            showToast({
                msg: 'Login Successful',
                type: 'success',
                duration: 3000
            })
        }

        else if(status==="logout"){
            localStorage.removeItem('token');
            Cookies.remove('authToken');

            navigate('/signin');

            showToast({
                msg: 'Logout Successful',
                type: 'success',
                duration: 3000
            })
        }

        else if(status==="nonSocialUser"){
            navigate('/signin');
            showToast({
                msg: 'User already registered with different signin method.',
                type: 'error',
                duration: 3000
            });
        }

        else {

            var msg = "";

            navigate('/signin');

            if(status === "antiuser"){
                msg = "User exists with different role."
            }

            showToast({
                msg: msg,
                type: 'error',
                duration: 3000
            });
        }
    },[])

    return null;


}

export default GoogleAuthCallBack