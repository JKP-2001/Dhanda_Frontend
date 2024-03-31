import React, { useEffect, useState } from 'react';

import { CheckBox } from '@mui/icons-material';
import showToast from '../../Utils/showToast';

const AuthSelection = (props) => {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(true);

    const { user, setUser, type } = props;

    const variants = {
        hidden: { x: -30 },
        visible: { x: 0 },
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                if (isChecked1) {
                    setUser('instructor');

                    showToast({
                        msg: `Welcome to instructor ${type} Page`,
                        type: "success",
                        duration: 3000
                    });

                } else if (isChecked2) {
                    setUser('student');

                    showToast({
                        msg: `Welcome to student ${type} Page`,
                        type: "success",
                        duration: 3000
                    });
                }
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };

    }, []);

    const handleCheckboxChange = (checkboxNumber) => {
        if (checkboxNumber === 1) {
            setIsChecked1(true);
            setIsChecked2(false);
        } else if (checkboxNumber === 2) {
            setIsChecked1(false);
            setIsChecked2(true);
        }
    };

    const onClickHandler = () => {
        if (isChecked1) {
            setUser('instructor');

            showToast({
                msg: `Welcome to instructor ${type} Page`,
                type: "success",
                duration: 3000
            });

        } else if (isChecked2) {
            setUser('student');

            showToast({
                msg: `Welcome to student ${type} Page`,
                type: "success",
                duration: 3000
            });
        }
    };

    return (
        <div className='md:ml-52'>
            <section className="dark:bg-gray-900 justify-center items-center mt-48">
                <div className="flex flex-col items-center justify-center px-6 py-8 mt-16 mx-auto md:mt-14 lg:py-0">
                    <div className="w-full md:w-10/12 bg-white rounded-lg border-[1.5px] border-gray-200 shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

                        <div className="p-6 space-y-3 md:space-y-2 sm:p-8">
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-inter">
                                Welcome to {type} Page
                            </h1>
                            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-inter">
                                Select A Role
                            </h1>
                        </div>

                        <div className='mb-4 mx-10 md:mx-28'>

                            <div className="flex items-center mb-4 hover:scale-[102%] hover:cursor-pointer">
                                <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    checked={isChecked1}
                                    onChange={() => handleCheckboxChange(1)}
                                    className=" checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="default-checkbox"
                                    className="ms-2 text-sm font-inter font-bold text-gray-900 dark:text-gray-300"
                                >
                                    Instructor
                                </label>
                            </div>

                            <div className="flex items-center hover:scale-[102%] hover:cursor-pointer">
                                <input
                                    id="checked-checkbox"
                                    type="checkbox"
                                    checked={isChecked2}
                                    onChange={() => handleCheckboxChange(2)}
                                    className="checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="checked-checkbox"
                                    className="hover:scale-[102%] ms-2 text-sm font-inter font-bold text-gray-900 dark:text-gray-300"
                                >
                                    Student
                                </label>
                            </div>

                        </div>

                        <div className="flex flex-wrap justify-between">

                            <div></div>

                            <div className="w-auto px-4 mb-4 md:mb-2 mx-3 md:mx-10">
                                <button
                                    type="button"
                                    className="hover:scale-[102%] w-auto px-4 py-1 text-base font-medium text-center text-white transition duration-200 ease-in bg-[#db2777] rounded-md " onClick={onClickHandler}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AuthSelection;
