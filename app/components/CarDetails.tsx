'use client'
import './CarDetails.css'; // Import the CSS file
import React, {useEffect, useState} from 'react';
import TableNormal from './TableNormal';
import TableInfo from './TableInfo';
import TableList from './TableList';
import {CarDetailsProps} from '../types/interfaces';
import Loading from './LoadingSpinner';

export default function CarDetails({carData}: CarDetailsProps) {
    const [activeComponent, setActiveComponent] = useState<'normal' | 'info' | 'list' | null>(null);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 756) {
                setActiveComponent('list');
            } else if (width >= 756 && width < 1200) {
                setActiveComponent('info');
            } else {
                setActiveComponent('normal');
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'normal':
                return carData ? <TableNormal carData={carData}/> :
                    <div className='flex justify-center'><Loading/></div>;
            case 'info':
                return carData ? <TableInfo carData={carData}/> : <div className='flex justify-center'><Loading/></div>;
            case 'list':
                return carData ? <TableList carData={carData}/> : <div className='flex justify-center'><Loading/></div>;
            default:
                return null;
        }
    };

    return (
        <div className="carDetailContainor">
            {renderComponent()}
        </div>
    );
}


