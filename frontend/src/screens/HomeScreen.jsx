import { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../features/allProductsSlice';

import Product from "../components/Product";
import {Row, Col, Container} from 'react-bootstrap';
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.productsList);
    const { products, loading, error } = productsList;

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    if (loading === 'loading') return <Loader />
    if (error) return <Message variant='danger'>{error}</Message>

    return ( 
        <Container>
        <div>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))} 
            </Row>
        </div>
        </Container>
     );
}
 
export default HomeScreen;
