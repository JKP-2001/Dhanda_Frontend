import React from 'react';
import { Carousel } from '@material-tailwind/react';

const Carousel_Comp = () => {
    return (
        <Carousel className="w-full h-[300px] sm:h-[500px] overflow-hidden ">
            <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 1"
                className="h-full w-full object-cover object-center"
            />
            <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                alt="image 2"
                className="h-full w-full object-cover object-center"
            />
            <img
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="image 3"
                className="h-full w-full object-cover object-center"
            />
            <img
                src="https://media.licdn.com/dms/image/D5622AQGP36O5EBalNw/feedshare-shrink_800/0/1705431118326?e=1708560000&v=beta&t=UWQh2WVeVuqs0jHIdKR6RCbMdiN_pFNFwPKO8r9pyXc"
                alt="image 4"
                className="h-full w-full object-cover object-center"
            />
             <img
                src="https://plus.unsplash.com/premium_photo-1668136403317-1230640e4b9f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="image 4"
                className="h-full w-full object-cover object-center"
            />
        </Carousel>
    );
};

export default Carousel_Comp;
