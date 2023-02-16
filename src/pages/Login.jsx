import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMe } from '../redux/slices/authSlices';

import LoginComponent from "../components/LoginComponent";

export default function SignIn() {
    const dispatch = useDispatch();
    const { user } = useSelector((state => state.auth));

    useEffect(() => {
        dispatch(getMe());
        console.log(user);
    }, [dispatch, user]);


    return (
        <LoginComponent />
    );
}