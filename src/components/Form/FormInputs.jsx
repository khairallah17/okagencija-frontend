import React, { useContext } from 'react'
import useFormContext from '../../Hooks/useFormContext'
import SponsorInfo from './SponsorInfo'
import UserInfo from './UserInfo'

const FormInputs = () => {

    const { page } = useFormContext()

    const display = {
        0: <SponsorInfo/>,
        1: <UserInfo/>
    }

    return (
        <div className=''>
            {display[page]}
        </div>
    )
}

export default FormInputs