import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import Advertised from '../Advertised/Advertised';
import Banner from '../Banner/Banner';
import Feedback from '../Feedback/Feedback';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    useTitle('Guitar Square Home');
    const { user } = useContext(AuthContext);
    return (
        <div>
            <Banner></Banner>
            <ProductCategories></ProductCategories>

            {/* conditionally rendering advertise section, if user not logged in, it wont render */}
            {
                user && <Advertised></Advertised>
            }
            <Feedback></Feedback>
        </div>
    );
};

export default Home;