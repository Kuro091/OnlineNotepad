import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setIsLineModalShow } from '../features/auth/authSlice';

export const LinePickModal = () => {
    const [line, setLine] = useState();
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    return (
        <div className="bg-slate-800 min-h-screen bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div className="bg-white px-16 py-14 rounded-md text-center">
                <h1 className="text-xl mb-4 font-bold text-slate-500">
                    Insert at line .... ?
            </h1>
                <div>
                    <div>
                        <label className="bg-blue-700  p-4 button primary block" htmlFor="single">
                            Upload
                        </label>
                        <input
                            style={{
                                visibility: 'hidden',
                                position: 'absolute',
                            }}
                            type="file"
                            id="single"
                        // accept="image/*"
                        // onChange={uploadAvatar}
                        // disabled={uploading}
                        />
                        <input
                            className="border-4 mt-5 text-black"
                            type="number"
                            placeholder="Line number"
                            value={line}
                            onChange={(e) => setLine(e.target.value)}
                        />
                    </div>

                    <button onClick={() => { dispatch(setIsLineModalShow(false)) }} className="bg-red-500 p-4 mt-5 ml-5 rounded-md text-md text-white">Cancel</button>
                </div>
            </div >
        </div>

    )
}
