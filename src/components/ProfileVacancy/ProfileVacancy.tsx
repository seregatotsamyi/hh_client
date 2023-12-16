import React from 'react';
import VacancyList from "../Vacancy/VacancyList";

const ProfileVacancy: React.FC = () => {


    return (
        <div className="profile-vacancy">

            <div className="profile-vacancy__title _h3">
                Список ваших вакансий
            </div>

            <VacancyList isProfile={true}/>

        </div>
    );
};

export default ProfileVacancy;