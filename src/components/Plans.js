import "../assets/Plans.css";

import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../db/firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function Plans() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    async function fetchProducts() {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("active", "==", true));
      const querySnapshot = await getDocs(q);
      const products = {};
      querySnapshot.docs.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceRef = collection(db, productDoc.ref.path + "/prices");
        const qPrice = query(priceRef);
        const priceSnap = await getDocs(qPrice);
        priceSnap.docs.forEach((doc) => {
          products[productDoc.id].prices = {
            priceId: doc.id,
            priceData: doc.data(),
          };
        });
      });
      setProducts(products);
    }
    fetchProducts();
  }, []);

  const loadCheckOut = async (priceId) => {
    const docRef = collection(db, "customers", user.uid, "checkout_sessions");
    const customerSnap = await addDoc(docRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    const subSnap = await getDoc(customerSnap);
    const{ sessionId} = subSnap.data();
    console.log(sessionId)
    console.log(subSnap.data());
  };

  return (
    <div className='plans'>
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div className='plan__plan' key={productId}>
            <div className='plan__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button onClick={() => loadCheckOut(productData?.prices?.priceId)}>
              Subscribe
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
