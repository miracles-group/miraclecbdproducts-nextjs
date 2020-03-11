import React from "react";
import Layout from "../layout";
import "../styles/page.scss";
import { getProfile, createCompany, updateProfile } from "../services/auth";
import { required, email } from "../utils/validate";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Noty from "noty";
import Modal from "@material-ui/core/Modal";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/mint.css";

class Setting extends React.Component {
  render() {
    return (
        <Layout>
            <div>
                <h2>Welcome to Miracle Dropship Program Shopify Application</h2>
                <p>It’s time to start your own CBD E-Commerce Store!  Do you want to add CBD products to your website without having to invest in the overhead and inven-tory it would take to launch a new product line? Then the Miracle DropShip program is just what you need!</p>
                <p>This free application is built for Miracle DropShip Clients.  To enroll, please see our settings section.</p>
                <p>Miracle CBD Dropship is a breakthrough technology for the Cannabis (namely CBD)  industry that now connects publishers and e-commerce platforms with direct access to sell hemp-based CBD products to its customer base.   This Shopify application gives you the ability to sell Miracle CBD products through your own website and we will dropship on your behalf.  The Miracle Dropship application allows you to easily search and import the best CBD products for your audience to purchase.</p>
                <p>Miracle Nutritional Products™ is one of the largest and most trusted CBD manufacturers in the world.</p>
                <p>The Cannabis industry is just starting to explode, and it is only going to get bigger over the next few years. In fact, the New York Times predicts that the industry will hit $22.6 Billion by the year 2022!</p>
                <p>Our products are made from the hemp plant and contain no THC. This means you will enjoy all of the benefits of CBD without the high, and it is legal to sell and consume in all 50 states!</p>
                <p>We stand behind our products and its quality. Everything we produce is rigorously tested for its purity and quality. When we deliver our product, our customers are assured that they are receiving the highest quality CBD product they could ask for.</p>
                <p>As an Miracle DropShip Partner, you can expect to deliver high quality and potent products to your customers.  Our Miracle CBD product catalog is continuously growing and currently has over 80 CBD products which vary from oils, pills, edibles, beauty and skincare, pain relief, e-liquids to pet and equestrian products.  You will find that the target audience for our products isvast and is only getting larger as more people are educated on the CBD industry.</p>
                <h3>How it Works:</h3>
                <div className="img-center">
                    <img src={Diagram} alt="diagrams-logo" />
                </div>
                <ul>
                    <li>Enroll in the Miracle DropShip Program (see our settings section).</li>
                    <li>Integrate this Shopify® application with your website and select the products you want to promote and sell through your platform.</li>
                    <li>You will then be required to setup and maintain a deposit account for order fulfillment.  We will send you instructions on how to do this.</li>
                    <li>Being a Miracle Dropship client, you will have special wholesale pricing for each product which is way below the suggested retail price. </li>
                    <li>On any order, the information is sent to us through this plugin so we can fulfill and ship the order directly to your customer.</li>
                    <li>We deduct the cost of the product plus shipping/handling charges from your account and ship your item to your customer.</li>
                    <li>Once your deposit account drops under to a certain level, we will recharge your account via ACH for replenishment.</li>
                </ul>
                <p className="note">Please Note:  You must be enrolled into our program and have an active deposit account with us for any orders to be fulfilled.   Failure to be enrolled or not havingan active deposit account will result in your customers not receiving their products.</p>
                <h3>About Our Products:</h3>
                <p>Miracle Nutritional Products offers over 80 different CBD products available to sell through your platform.  All of our products are Made in the USA using industrial hemp sourced from Kentucky.  Because our products are hempbased, they contain no THC and are legal to consume in all 50 states.  Every one of our products is 3rd party lab tested and approved for quality and accuracy, which means your customers can be rest assured the product they receive is exactly what they ordered.</p>
                <p>Our Product Categories:</p>
                <ul>
                    <li>CBD Tincture Oils</li>
                    <li>CBD Pain Creams</li>
                    <li>CBD Edibles</li>
                    <li>CBD Beauty & Topicals</li>
                    <li>CBD Beverages</li>
                    <li>CBD Pet Products</li>
                    <li>And More!</li>
                </ul>
                <p>Check out all of our products at <a href="https://www.miraclecbdproducts.com/" target="_blank">www.miraclecbdproducts.com</a></p>
                <div className="img-center">
                    <img src="https://www.miraclecbdproducts.com/images/cbd-logo.png" alt="diagrams-logo" style={{height: '150px'}} />
                </div>
                <h3>About Us:</h3>
                <p>At Miracle Nutritional Products, we believe in natural alternative treatment  Cannabidiol (CBD). Our vision is to create quality CBD products that are an effective form of alternative treatment.</p>
                <p>Understanding that most people are looking for a natural path towards healing, we have expanded our product line to a full array over 80 CBD products. Using the purest and richest form of Cannabidiol, our team is focused on being ahead of the curve with our diversity, research & development, quality control, and a highly-trained and experienced staff.  We pride ourselves on being innovators in this explosive industry, by creating new products.</p>
                <p>Our Miracle Nutritional Products are being sold in over 9,000 store locations across the United States and Europe with rapid growth with over 300 private label partners.</p>
                <p>Forbes magazine stated that the CBD industry is currently at $220 Million dollars in 2017. Forbes has projected that by 2021 the CBD industry will surpass 2.6 BILLION dollars. That is a projected growth of over 500%</p>
                <h3>Support</h3>
                <p>In case you have any questions or need technical assistance, please email us at <a href="mailto:dropship@miraclecproducts.com">dropship@miraclecproducts.com</a></p>
                <h3>Follow Us</h3>
                <p>Our Official Website – <a href="https://miraclecbdproducts.com" target="_blank">https://miraclecbdproducts.com</a></p>
                <p>Our Facebook Page – <a href="https://www.facebook.com/mnpcbd/" target="_blank">https://www.facebook.com/mnpcbd/</a></p>
                <p>Our Twitter Account – <a href="https://twitter.com/mnpcbd" target="_blank">https://twitter.com/mnpcbd</a></p>
                <p>LinkedIn: <a href="https://www.linkedin.com/company/miracle-nutritional-products" target="_blank">https://www.linkedin.com/company/miracle-nutritional-products</a></p>
            </div>
        </Layout>

    )
}
}

export default Setting;
