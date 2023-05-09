import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
import toast, { Toaster } from 'react-hot-toast'
import { BanknotesIcon, CheckIcon, WalletIcon } from "@heroicons/react/24/outline";
import crypto from "../../public/crypto.jpg"
import bankTransfer from "../../public/bankTransfer.jpg"

const depostis = [
                  { text: "Conservative", price: "", border: "border-[#ABBAE3]" },
                  { text: "Moderate", price: "", border: "border-[#607269]" },
                  { text: "Aggressive", price: "", border: "border-[#C3C573]" },]

const cryptos = [
                    {coin:"USDT", price: 1 },
                    {coin: "BTC" , price: 28746.40},
                    {coin: "ETH" , price: 1957.23}]


const Deposit = () => {
    
    const [addDeposit, setAddDeposit] = useState([])
    const [open, setOpen] = useState(false)
    const [activeCrypto, setACtiveCrypto] = useState("USDT")
    const [price, setPrice] = useState(1)
    const [value, setValue] = useState(0)
    const [wallet, setWallet] = useState("")
    const [terms, setTerms] = useState(false)

    const [payment, setPayment] = useState("crypto")
    
    const submitClick = () => {
        if (wallet.length > 5)
            toast.success('Email was Sent!!')
        else if (!terms)
            toast.error("please check terms and conditions !")
        else
            toast.error("Wallet invalid !!")
    }

    const handleDepositClick = (e) => {
        setValue(e.target.parentNode.children[0].children[1].childNodes[1].innerHTML)
        setAddDeposit(
            [
                { 
                    text: e.target.parentNode.children[0].children[1].childNodes[0].innerHTML, 
                    price: e.target.parentNode.children[0].children[1].childNodes[1].innerHTML,
                    date: new Intl.DateTimeFormat('en-US').format(new Date())
                }, ...addDeposit
            ]
        )

        setOpen(true)
    }

    const setActiveCoinAndPrice = (e) => {
        setACtiveCrypto(e.target.value)
        setPrice(e.target.options[e.target.selectedIndex].attributes[0].value)
    }

    const handleBankTransfer = () => {
        setPayment("bank transfer")
        setACtiveCrypto("$")
    }


  return (
    <Layout>
        <h4 className="font-bold uppercase mb-5 text-white">deposit</h4>
        <div className="deposits bg-white p-10 rounded-2xl mb-8 shadow-xl">
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <div className="deposit-cards-container flex flex-wrap gap-5 mb-14">
                {
                    depostis.map(element => (
                        <div className="deposit-card w-60 flex flex-col justify-between bg-[#ECEFEE] rounded-2xl">
                            <div className="flex items-center flex-col gap-3 justify-between h-full p-5">
                                <img src="/logo-dark.png" alt="deposit image" className={`${element.border} border-[13px] rounded-full h-40 w-40`} />
                                <div className="deposit-card-content flex w-full justify-between">
                                    <span className='deposit-card-text capitalize'>{ element.text }</span>
                                    <span className="deposit-card-price">{ element.price }</span>
                                </div>
                            </div>
                            <Link className='font-bold uppercase bg-slate-600 w-full text-center text-white py-3 rounded-b-2xl' onClick={(e) => handleDepositClick(e)} >deposit</Link>
                            <Modal open={open} onClose={() => setOpen(false)}>
                                
                                <div className=" crypto-inputs flex flex-col gap-3">

                                    <div className="image-crypto flex items-center justify-center my-5">
                                        <img src={payment == "crypto" ? crypto : bankTransfer} alt="" className=' w-52'/>
                                    </div>

                                    <div className="select-payment flex items-center justify-around">

                                        <div className="crypto flex items-center gap-1">
                                            <input onClick={() => setPayment("crypto")} type="button" className='p-2 px-4 bg-violet-700 rounded-lg text-white cursor-pointer' name="crypto" id="" value="crypto" />
                                        </div>

                                        <div className="bank-transfer flex items-center gap-1">
                                            <input onClick={handleBankTransfer} type="button" className='p-2 px-4 bg-violet-700 rounded-lg text-white cursor-pointer' name="Bank transfer" id="" value="bank transfer" />
                                        </div>

                                    </div>

                                    <div className="select-crypto flex w-96 border border-gray-300 items-center rounded-lg">
                                        <div className="money-icon bg-[#665BAF] duration-200 hover:bg-[#584bad] p-1 px-2 rounded-l-md">
                                            <BanknotesIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <select name="crypto" className='flex-grow bg-transparent px-5' onChange={(e) => setActiveCoinAndPrice(e)}>
                                            {
                                                payment == "bank transfer" ? <option value="SEPA Transfer">SEPA Transfer</option> : cryptos.map(crypto => (
                                                    <option key={crypto.coin} price={crypto.price} value={crypto.coin}>{crypto.coin}</option>
                                                ))
                                            }
                                        </select>
                                        <div className="check-icon bg-[#665BAF] duration-200 hover:bg-[#584bad] p-1 px-2 cursor-pointer rounded-r-md">
                                            <CheckIcon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    
                                    <div className="amount-crypto flex w-96 border border-gray-300 items-center rounded-lg">
                                        <div className="money-icon bg-[#665BAF] duration-200 hover:bg-[#584bad] p-1 px-2 rounded-l-md">
                                            <BanknotesIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="crypto-price flex-grow flex items-center justify-center">
                                            <input type="text" value={`${parseInt(value) / price} ${activeCrypto}`} disabled={true} className="text-center text-gray-400" />
                                        </div>
                                        <div className="check-icon bg-[#665BAF] duration-200 hover:bg-[#584bad] p-1 px-2 cursor-pointer rounded-r-md">
                                            <CheckIcon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>

                                    <div className="select-crypto flex w-96 border border-gray-300 items-center rounded-lg">
                                        <div className="money-icon bg-[#665BAF] duration-200 hover:bg-[#584bad] p-1 px-2 rounded-l-md">
                                            <WalletIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="wallet-info flex-grow">
                                            <input type="text" name="wallet" onChange={(e) => setWallet(e.target.value)} className='w-full outline-none px-5 overflow-hidden' placeholder={payment == "crypto" ? "Wallet" : "Account Number"} />
                                        </div>
                                        <div className="check-icon bg-[#665BAF] duration-200 hover:bg-[#584bad] p-1 px-2 cursor-pointer rounded-r-md">
                                            <CheckIcon className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <div className="terms-conditions flex items-center justify-start gap-2">
                                        <input type="checkbox" name="Terms and Conditions" id="terms" placeholder='Terms and Conditions' onClick={() => setTerms(!terms)} />
                                        <label htmlFor="Terms and Conditions">Terms and Conditions <span className='text-blue-400 cursor-pointer underline'> Read the Terms</span></label>
                                    </div>

                                    <div className="submit-form flex-grow flex items-center justify-center">
                                        <button type='button' className='bg-[#665BAF] duration-200 hover:bg-[#584bad] text-white px-4 py-2 rounded-lg' onClick={submitClick}> Submit </button>
                                    </div>


                                </div>

                            </Modal>
                        </div>
                    ))
                }
            </div>

            <p>The values of packages are just informative. Use this packages if you start portfolio or add a value to your initial starting deposit</p>

        </div>

        <div className="deposits-table bg-white p-10 rounded-2xl mb-8">
            <table>
                <thead>
                    <tr>
                        <th> Details</th>
                        <th> VALUE </th>
                        <th> DATE </th>
                    </tr>
                </thead>
                <tbody>
                        {
                            addDeposit.map(({ text, price, date, key }) => {
                                return (
                                    <tr key={ key }>
                                        <td>{ text }</td>
                                        <td>{ price }</td>
                                        <td>{ date }</td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
        </div>
    </Layout>
  )
}

export default Deposit