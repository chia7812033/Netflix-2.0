import "../assets/Plans.css";

import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { selectUser, setSubscriptionStatus } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { db } from "../db/firebase";
import { loadStripe } from "@stripe/stripe-js";

function Plans() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchSub() {
      const docRef = await getDocs(
        collection(db, `customers/${user.uid}/subscriptions`)
      );
      docRef.docs.forEach(async (doc) => {
        dispatch(
          setSubscriptionStatus({
            role: doc.data().role,
            current_period_end: doc.data().current_period_end.seconds,
            current_period_start: doc.data().current_period_start.seconds,
          })
        );
        setSubscription({
          role: doc.data().role,
          current_period_end: doc.data().current_period_end.seconds,
          current_period_start: doc.data().current_period_start.seconds,
        });
      });
    }
    fetchSub();
  }, [user.uid, dispatch]);

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
    const docRef = await addDoc(
      collection(db, `customers/${user.uid}/checkout_sessions`),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // We have a Stripe Checkout URL, let's redirect.
        // window.location.assign(sessionId);
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className='plans'>
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div className='plan__plan' key={productId}>
            <div className='plan__info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>

            <button
              className={isCurrentPackage ? "plan__grayButton" : ""}
              onClick={() =>
                !isCurrentPackage && loadCheckOut(productData?.prices?.priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Plans;
