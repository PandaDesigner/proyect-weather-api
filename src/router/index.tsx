import { Route, Routes } from "react-router";
import { HomeLayout } from "./HomeLayout.tsx";
import { Navigate } from 'react-router';

export const Index = () => {
    return (
        <Routes>
            <Route index element={<HomeLayout />} />
            <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
    );
};
