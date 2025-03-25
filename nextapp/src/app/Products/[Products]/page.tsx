import { title } from "process";
import GotoCartButton from "../../Components/GotoCartButton";
import { productServices } from "../../Services/services";
import styles from "../[Products]/prod.module.css";
import Image from "next/image";
import { Metadata } from "next";


export  async function generateMetadata(props:any){
  console.log(props,'metadata')
  
  const { Products } =await props.params;
  let ProductDetails = null;

  if (Products) {
    ProductDetails = await productServices.getProductsByid(Number(Products));
  }
  return{
   title: ProductDetails.title
  }
}

type ProductDetailsProps = {
  params: { Products: string };
};


export default async function ProductDetails(props:any) {
  console.log(props, "from product details");

  const { Products } =await props.params;
  let ProductDetails = null;

  if (Products) {
    ProductDetails = await productServices.getProductsByid(Number(Products));
  }

  return (
    <div className={styles.productDetail}>
      <h1 className={styles.main}>Product Details</h1>
      {ProductDetails ? (
        <div className={styles.productCard}>
          {/* Product Image */}
        <img  src={ProductDetails.image}
            alt={ProductDetails.title}
            width={350}
            height={350}
            className={styles.productImage}></img>

          {/* Product Info */}
          <div className={styles.productInfo}>
            <h2 className={styles.productTitle}>{ProductDetails.title}</h2>
            <p className={styles.productDescription}>{ProductDetails.description}</p>
            <p className={styles.productPrice}>${ProductDetails.price}</p>

            {/* Add to Cart Button */}
            <GotoCartButton product={ProductDetails} /> 
          </div>
        </div>
      ) : (
        <p>No product found.</p>
      )}
    </div>
  );
}
