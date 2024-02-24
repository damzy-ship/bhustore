import React from 'react';
import { STATUS } from "../../utils/status";
import "./Category.scss";
import {Link} from "react-router-dom";
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import styled from 'styled-components';

const ImageContainer = styled.div`
    border-radius: 10px;
    overflow: hidden;
    @media (max-width: 400px) {
        height: 100px;
  }
    height: 200px;
    background-image: ${(props)=>`url(${props.img})`};
    background-position: center;
    background-size: cover;
`

const CatName = styled.h6`
@media (max-width: 400px) {
        font-size: 1.7rem;
  }
`

const Category = ({categories, status}) => {
    if(status === STATUS.ERROR) return (<Error />);
    if(status === STATUS.LOADING) return (<Loader />);

    return (
    <section className = "categories py-5 bg-ghost-white" id = "categories">
        <div className = "container">
            <div className = "categories-content">
                <div className='section-title'>
                    <h3 className = "text-uppercase fw-7 text-regal-blue ls-1">Categories</h3>
                </div>
                <div className = "category-items grid">
                    {
                        categories.slice(0, 5).map(category => (
                            <Link to = {`category/${category.id}`} key = {category.id}>
                                <div className = "category-item" >
                                    <ImageContainer img={category.images[0]} />
                                    <div className = "category-item-name text-center">
                                        <CatName className='fs-20'>{category.name}</CatName>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default Category