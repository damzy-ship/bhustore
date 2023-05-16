import React, {useState} from 'react';
import "./SingleProduct.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible } from '../../store/modalSlice';
import { addToCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import styled from 'styled-components';

const ImageContainer = styled.div`
    overflow: hidden;
    height: 75vw;
    display: flex;
    position: relative;
    
    img {
      object-fit: cover;
      min-width: 100%;
      max-width: 100%;
      height: 100%;
      transition: all .2s;
      transform: ${(props)=>`translateX(${-1*props.offSet}%)`};

     
    }

    > div {
        position: absolute;
        z-index: 100;
        top: 50%;
        font-size: 30px;
        font-weight: 400;
        color: #606060;
        padding: 20px;
        background-color:  #ffffff96;
        border-radius: 50%;
        height: 30px;
        width: 30px;
        display: flex;
        justify-content:center;
        align-items:center;    
        cursor: pointer;   
        transform: translateY(-50%);

    }

    > .right-arrow{
      right: 0px;
    }

    > .left-arrow{
      left: 0px;
    }
    
`;

const TextContainer = styled.div`
      display: flex;
    flex-direction: column;
    gap: 10px;
`


const ActionContainer = styled.div`
 display: flex;
 column-gap: 10px;
 flex-wrap: wrap;
 width: 100%;

 button{
  min-width: 170px;
  flex: 1;
 }


 @media only screen and (max-width: 600px) {
    
 }
 
`
const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const { data: product } = useSelector(state => state.modal);
  const [imgOffSet, setImgOffSet] = useState(0);
  const [showContact, setShowContact] = useState(false);

  const handleImgChange = (direction) => {
    const imgLength = product.images && product.images.length - 1;
    
    if(direction==="right"){
      if(imgOffSet >= imgLength*100){
        setImgOffSet(0);
        return;
      }
        setImgOffSet((prev)=>prev+100);
    }

   
    else{
      if(imgOffSet <= 0){
        setImgOffSet(imgLength*100);
        return;
      }
        setImgOffSet((prev)=>prev-100);
    }
    console.log({imagesLength: imgLength})
    
  }
  
  console.log({imgOffset: imgOffSet})
  const increaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty + 1;
      return newQty;
    })
  }

  const decreaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty - 1;
      if(newQty < 1){
        newQty = 1;
      }
      return newQty;
    })
  }

  const addToCartHandler = (product) => {
    let totalPrice = qty * product.productPrice;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice
    }
    dispatch(addToCart(tempProduct));
    dispatch(setIsModalVisible(false));
    navigate('/cart');
  };

  const modalOverlayHandler = (e) => {
    if(e.target.classList.contains('overlay-bg')){
      dispatch(setIsModalVisible(false));
    }
  }

  return (
    <div className='overlay-bg' onClick = {modalOverlayHandler}>
      <div className = "product-details-modal bg-white">
        <button type = "button" className='modal-close-btn flex flex-center fs-14' onClick={() => dispatch(setIsModalVisible(false))}>
          <i className = "fas fa-times"></i>
        </button>
        <div className = "details-content grid">
          {/* details left */}
          <div className = "details-left">
            <ImageContainer offSet={imgOffSet} className = "details-img">
              {
                product.images.map((img)=><img src={img} alt='product'/>)
              }
              { product.images.length !== 1 &&
                <div onClick={()=>handleImgChange('left')} className='left-arrow'>
                  <span >{'<'}</span>
                </div>
              }
              { product.images.length !== 1 &&
              <div onClick={()=>handleImgChange('right')} className='right-arrow'>
                <span>{'>'}</span>
              </div>
              }
            </ImageContainer>
          </div>
          {/* detials right */}
          <div className='details-right'>
            <div className = "details-info">
              <h3 className = "title text-regal-blue fs-22 fw-5">{product.productName}</h3>
              <TextContainer className='description text-pine-green'>
              {product.description && product.description.split('\n').map((d)=><p className=''>{d}</p>)}
              </TextContainer>
              
              <div className='price fw-7 fs-24'>Price: {formatPrice(product.productPrice)}</div>
              <div className = "qty flex">
                <span className = "text-light-blue qty-text">Qty: </span>
                <div className = "qty-change flex">
                  <button type = "button" className='qty-dec fs-14' onClick={() => decreaseQty()}>
                    <i className = "fas fa-minus text-light-blue"></i>
                  </button>
                  <span className = "qty-value flex flex-center">{qty}</span>
                  <button type = "button" className='qty-inc fs-14 text-light-blue' onClick={() => increaseQty()}>
                    <i className = "fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <ActionContainer>

              <button type = "button" className='btn-primary add-to-cart-btn' onClick={() => addToCartHandler(product)}>
                  <span className = "btn-icon">
                    <i className='fas fa-cart-shopping'></i>
                  </span>
                  <span className = 'btn-text'>Add To Cart</span>
              </button>
              <button type = "button" className='btn-primary-outline add-to-cart-btn' onClick={()=>setShowContact(true)}>
                  <span className = "btn-icon">
                  <i class="fa-solid fa-phone"></i>
                  </span>
                  <span className = 'btn-text'>{showContact? product.seller.number:'Show Contact'}</span>
              </button>
              </ActionContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct