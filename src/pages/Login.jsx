import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getMe } from '../redux/slices/authSlices';

import LoginComponent from "../components/LoginComponent";

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError } = useSelector((state => state.auth));

    useEffect(() => {
        if (user) dispatch(getMe());
    }, [dispatch, user]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
    }, [isError, navigate,])
    return (
        <LoginComponent />
    );
}