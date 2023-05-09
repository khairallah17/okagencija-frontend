import React, { useState } from 'react'
import FormInputs from './FormInputs'
import useFormContext from '../../Hooks/useFormContext'
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import toast ,{ Toaster } from 'react-hot-toast'

const notifySuccess = () => toast.success('Added Successfully')

const Form = () => {

    const {
        page,
        setPage,
        data,
        title,
        canSubmit
    } = useFormContext()

    const handlePrevious = () => {
        setPage(prev => prev - 1)
    }

    const handleNext = () => setPage(prev => prev + 1)
    
    const handleClickNext = () => {

        console.log(data.sponsorFullName)
        console.log(data.sponsorUsername)
        
        if (page == 1 && data.password != data.confPassword)
            toast.error("password does not Match")

        else if (page == 0 && ( data.sponsorUsername == "" || data.sponsorFullName == "" ))
            toast.error("empty fields required")

        else if(page == 1 && ( data.password == "" || data.username == "" || data.email == "email" || data.phoneNumber == "" ))
            toast.error("empty fields required")


        else 
            handleNext()
    }


  return (
    <div className="form-container w-full h-full flex-col flex items-center justify-center gap-5">

        <div className="steps-container flex items-center">
            <div className="form-number w-10 h-10 flex items-center justify-center bg-blue-400 text-white rounded-full">
                1
            </div>
            <div className={`form-line w-24 h-1 duration-300 ${page == 1 ? "bg-blue-400" : "bg-gray-300"}`}>

            </div>
            <div className={`form-number w-10 h-10 flex items-center justify-center duration-300 text-white rounded-full ${page == 1 ? "bg-blue-400" : "bg-gray-400" }`}>
                2
            </div>
        </div>

        <form className='bg-white w-fit p-12 rounded-xl flex flex-col gap-12' method='post'>
        
            <header className='text-cehandleNextnter w-full'>
                <h2 className='text-center font-nunito font-light uppercase tracking-wider'>{title[page]}</h2>
            </header>

            <FormInputs />

            <div className={`buttons-container flex ${page == 0 ? "justify-end" : "justify-between"}`}>
                <button className={`btn bg-indigo-800 hover:bg-indigo-700 duration-200 text-white p-3 px-5 gap-2 ${page == 0 ? "hidden" : "flex"}`} type="button" onClick={handlePrevious} >
                    <ChevronRightIcon className="h-6 w-6 text-white rotate-180" />
                    Previous
                </button>

                <button type="button" className={`btn bg-indigo-800 hover:bg-indigo-700 duration-200 text-white p-3 px-5 gap-2 ${page == 0 ? "hidden" : "flex"}`} onClick={notifySuccess} >Submit</button>
                <Toaster  
                    position="bottom-right"
                    reverseOrder={false}
                />

                <button className={`btn bg-indigo-800 hover:bg-indigo-700 duration-200 text-white p-3 px-5 flex gap-2 ${page == 1 ? "hidden" : "flex"}`} type="button" onClick={handleClickNext} >
                    Next
                    <ChevronRightIcon className="h-6 w-6 text-white" />
                </button>

            </div>

        </form>

    </div>
  )
}

export default Form