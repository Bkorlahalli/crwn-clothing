import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem})=>{
    const {name,imageUrl,price,quantity} = cartItem;
    const {clearItemFromCart,addItemToCart,removeItemFromCart}= useContext(CartContext);
    const ClearCartHandler = ()=> clearItemFromCart(cartItem);
    const AddItemHandler = ()=>addItemToCart(cartItem);
    const RemoveItemHandler= ()=> removeItemFromCart(cartItem); 
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
                </div> 
                    <span className='name'>{name} </span>
                    <span className='quantity'>
                      <div className='arrow' onClick={RemoveItemHandler}>
                        &#10094;
                      </div>
                    <span className='value'>{quantity}  </span>
                    <div className='arrow' onClick={AddItemHandler}>
                        &#10095;
                    </div>
                    </span>
                    <span className='price'>{price}</span>
                    <div className='remove-button' onClick={ClearCartHandler}>&#10005;</div>
                    
                </div>
         );
    };

export default CheckoutItem;