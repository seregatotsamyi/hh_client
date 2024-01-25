import React from 'react';
import {ROLE_APL} from "../../utils/consts";
import ProfileApl from "./ProfileApl";
import ProfileEmp from "./ProfileEmp";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const ProfileSettings:React.FC = () => {

    const role = useSelector((state: RootState) => state.auth.role)


    return (
        <>
            {
                role === ROLE_APL ? (
                    <ProfileApl/>
                ) : (
                    <ProfileEmp/>
                )
            }
        </>
    );
};

export default ProfileSettings;