import React from 'react';
import Category from '../../components/Category/Category';
// import ProductList from '../../components/ProductList/ProductList';
// import SingleCategory from '../../components/SingleCategory/SingleCategory';
import { useSelector } from 'react-redux';
// import { fetchProducts } from '../../store/productSlice';
// import { fetchCategories, fetchProductsByCategory } from '../../store/categorySlice';
import "./HomePage.scss";
import ImgSlider from '../../components/Slider/Slider';

const HomePage = () => {
  // const dispatch = useDispatch();
  const {data: categories, status: categoryStatus} = useSelector((state) => state.category);
  // const {data: products, status: productStatus} = useSelector((state) => state.product);
  // const {catProductAll: productsByCategory, catProductAllStatus} = useSelector((state) => state.category);
  // const catToFetch = ['bags', 'shoes', 'beauty and makeup','accessories'];
  // useEffect(() => {
  //   dispatch(fetchProducts());
  //   dispatch(fetchCategories());
  //   catToFetch.map((cat,i)=>dispatch(fetchProductsByCategory(catToFetch[i], 'all')))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  return (
    <div className = "home-page">
      <ImgSlider />
      <Category categories = {categories} status = {categoryStatus} />
      {/* <ProductList products = {products} status = {productStatus} />
      {
        catToFetch.map((catId, i)=>
          <section key={catId}>
            { productsByCategory[i] && <SingleCategory products = {productsByCategory[i]} status = {catProductAllStatus} catName={catToFetch[i]} /> }
          </section>
        )
      } */}
    </div>
  )
}

export default HomePage;