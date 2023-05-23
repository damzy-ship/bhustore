import React, { useState, useEffect} from 'react';
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/categorySlice';
import { getCartTotal } from '../../store/cartSlice';
import styled from 'styled-components';

const SearchForm = styled.form`
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      > span {
        position: absolute; 
        right: 70px;
        cursor: pointer;
      }

      @media only screen and (max-width: 768px) {
        flex: 1;
        display: ${(props)=>props.showSearchBar ? 'flex' :'none'};
      }

      @media only screen and (min-width: 769px) {
        span{
          display: none;
        }
      }
`;

const SearchButton = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;

    @media only screen and (min-width: 769px) {
      display: none;
    }

`;


const Navbar = () => {
  const dispatch = useDispatch();
  const [searchWord, setSearchWord] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const {data: categories} = useSelector((state) => state.category);
  const {totalItems} = useSelector((state => state.cart));

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className = "navbar">
      <div className='navbar-content'>
        <div className = "container">
          <div className = "navbar-top flex flex-between">
              {!showSearchBar && <Link to = "/" className = "navbar-brand">
                <span className = "text-regal-blue">bhu</span><span className='text-gold'>store.</span>
              </Link>
              }
          
              <SearchForm showSearchBar={showSearchBar} className = "navbar-search flex">
                <input onChange={(e)=>{setSearchWord(e.target.value)}} type = "text" placeholder='Search here ...' />
                <span>
                  <i class="fa-solid fa-xmark" onClick={()=>{setShowSearchBar(false)}}></i>
                </span>
                <Link to={searchWord?`/search/${searchWord}`: '/'}>
                  <button className = "navbar-search-btn" >
                    <i className = "fas fa-search"></i>
                  </button>
                </Link>
              </SearchForm>
        
              {
                !showSearchBar &&
                  <SearchButton showSearchBar={showSearchBar} className="navbar-search">
                      <button className = "navbar-search-btn" onClick={()=>setShowSearchBar((true))}>
                        <i className = "fas fa-search"></i>
                      </button>
                  </SearchButton>
              }

              {!showSearchBar && <div className = "navbar-btns">
                <Link to = "/cart" className="add-to-cart-btn flex">
                  <span className = "btn-ico">
                    <i className = "fas fa-shopping-cart"></i>
                  </span>
                  <div className='btn-txt fw-5'>Cart
                    <span className='cart-count-value'>{totalItems}</span>
                  </div>
                </Link>
              </div>
              }
          </div>
        </div>
        <div className='navbar-bottom bg-regal-blue'>
          <div className='container flex flex-between'>
            <a href="https://bhustoreadmin.netlify.app">

              <em> <i className = "fas fa-chevron-right"></i><i className = "fas fa-chevron-right"></i> <i className = "fas fa-chevron-right"></i>sell <span>@bhustore</span></em>
            </a>
            <ul className = {`nav-links flex ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              <button type = "button" className='navbar-hide-btn text-white' onClick={() => setIsSidebarOpen(false)}>
                <i className='fas fa-times'></i>
              </button>
              {
                categories.map(category => (
                  <li key = {category.id}><Link to = {`/category/${category.id}`} className = "nav-link text-white" onClick={() => setIsSidebarOpen(false)}>{category.name}</Link></li>
                ))
              }
            </ul>

            <button type = "button" className='navbar-show-btn text-gold' onClick={() => setIsSidebarOpen(true)}>
              <i className = "fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;