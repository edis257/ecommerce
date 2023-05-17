import Product from "../components/Product";
import {Row, Col} from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from "react";


const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        const { data } = await axios.get('/api/products/');
        setProducts(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return ( 
        <div>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))} 
            </Row>
        </div>
     );
}
 
export default HomeScreen;