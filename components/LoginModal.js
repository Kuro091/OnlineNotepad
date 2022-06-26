import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal, logIn } from '../features/auth/authSlice';
import { supabase } from '../utils/supabaseClient';

export const LoginModal = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [email, setEmail] = useState('');


    return (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div className="bg-white px-16 py-14 rounded-md text-center">
                <h1 className="text-xl mb-4 font-bold text-slate-500">
                    Login
                </h1>
                <p className="description">Sign in via magic link with your email below</p>
                <div>
                    <input
                        className="border-4 mt-5"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(logIn(email))
                        }}
                        className={`mt-5 mb-2 ${auth.pending ? 'bg-slate-600' : 'bg-blue-900'} p-4 rounded-xl`}
                        disabled={auth.pending}
                    >
                        <span className='text-white'>{auth.pending ? 'Loading' : 'Send magic link'}</span>
                    </button>
                    <button onClick={() => { dispatch(hideModal()) }} className="bg-red-500 p-4 ml-5 rounded-md text-md text-white">Cancel</button>
                </div>
            </div>
        </div >
    )
}