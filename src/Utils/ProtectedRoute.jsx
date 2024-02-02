import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import showToast from './showToast';
import { getUserData } from '../APIs/User_API';
import { decryptFromJson } from './functions';
import { getUserSuccess } from '../Redux/user/userSlice';






const ProtectedRoute = (props) => {


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const userState = useSelector((state) => state.user);



    useEffect(() => {

        const checkTokenAndNavigate = async () => {
            const token = localStorage.getItem('token');

            if (token === null) {
                const allowedRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password'];
                const currentPath = window.location.pathname;

                if (!allowedRoutes.includes(currentPath)) {
                    showToast({
                        msg: 'Login Required',
                        type: 'error',
                        duration: 3000,
                    });


                    navigate('/signin');
                }
            } else {
                const userData = await getUserData(token);

                if (userData.success === false) {
                    
                    showToast({
                        msg: userData.msg,
                        type: 'error',
                        duration: 3000,
                    });

                    navigate('/signin');
                } else {
                    if (userData.success === false) {
                        showToast({
                            msg: userData.msg,
                            type: 'error',
                            duration: 2000,
                        });
                        return;
                    }

                    const decryptedData = decryptFromJson(userData.data);

                    dispatch(getUserSuccess(decryptedData));
                }
            }
        };

        checkTokenAndNavigate();

    }, [userState.loading])



    return (props.ele);

}

export default ProtectedRoute