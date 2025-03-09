import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt={`${product.name} - 1`} />
                    <img src={product.image} alt={`${product.name} - 2`} />
                    <img src={product.image} alt={`${product.name} - 3`} />
                    <img src={product.image} alt={`${product.name} - 4`} />
                </div>

                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt={product.name} />
                </div>
            </div>

            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_icon} alt="star" />
                    <img src={star_dull_icon} alt="dull star" />
                    <p>(135)</p>
                </div>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        <s>${product.old_price}</s>
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>
                </div>

                <div className="productdisplay-right-description">
                    A lightweight, pullover shirt
                </div>

                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>

                <button onClick={() => { addToCart(product.id) }}>Add to Cart</button>

                <p className="productdisplay-right-category"><span>Category:</span> Women, T-Shirt, Crop Top</p>
                <p className="productdisplay-right-category"><span>Tags:</span> Modern, Latest</p>
            </div>
        </div>
    );
}

export default ProductDisplay;
