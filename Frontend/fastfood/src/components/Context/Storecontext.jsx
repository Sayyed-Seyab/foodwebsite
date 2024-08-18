import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { KJUR } from 'jsrsasign';
import jwtDecode from 'jwt-decode';
import { rejects } from "assert";
import { useNavigate } from "react-router-dom";

// const Decode = (async () => {
//     const jwtDecode = (await import('jwt-decode')).jwtDecode;
//     console.log(jwtDecode)
//     // Now you can use jwtDecode in your code
//   })();


export const StoreContext = createContext(null)



const StoreContextProvider = (props) => {
    const SignUpObj = {
        Name: '',
        Email: '',
        role: 'user',
        Password: '',
    }
    const SignInObj = {
        Email: '',
        Password: '',
    }
    const [opensingUpModal, setopensinUpModal] = React.useState(false);
    const [openModal, setopnModal] = React.useState(false);
    const [cartItems, setcartItems] = useState();
    const [id, setid] = useState()
    const [Message, setMessage] = useState()
    const [error, setError] = useState(null);
    const [signupdata, setsignupdata] = React.useState(SignUpObj)
    const [signindata, setsignindata] = useState(SignInObj)
    const [user, setUser] = useState(null);
    const [UserImage, setImage] = useState(null);
    const [role, setRole] = useState(null);
    const [UserId, setId] = useState();
    const [UserOrders, setOrders] = useState([]);
    const [loading, setLoading] = React.useState(true)
    const [food, setfood] = useState([])
    const [Orderloading, setOrderloading] = useState(true)
    const navigate = useNavigate();
    const url = 'http://localhost:4000'


    const getfood = () => {
        axios.get(`${url}/api/food/list`)
            .then((res) => {
                setfood(res.data.Food)
                setLoading(false);
                console.log(food);
            })
    }

    const GetOrders = async () => {
        const response = await axios.post(`${url}/api/order/orderlist`);
        if (response.data.success) {
            console.log(response.data.Orderlist);
            setOrderloading(false)
            setOrders(response.data.Orderlist);
        }
    };

    // useEffect(()=>{
    //     (async () => {
    //         const jwtDecode = (await import('jwt-decode')).default;
    //         // Now you can use jwtDecode in your code
    //       })();


    // },[])

    // Validate form
    const validateSignUpForm = () => {
        const { Name, Email, Password } = signupdata;
        if (!Name) {
            setError("Name field are required.");
            return false;
        }

        if (!Email) {
            setError("Email field are required.");
            return false;
        }
        if (!Password) {
            setError("Password field are required.");
            return false;
        }
        setError(null);
        return true;
    };


    const validateSignInForm = () => {
        const { Email, Password } = signindata;


        if (!Email) {
            setError("Email field are required.");
            return false;
        }
        if (!Password) {
            setError("Password field are required.");
            return false;
        }
        setError(null);
        return true;
    };

    const Signup = (e) => {
        if (!validateSignUpForm()) {
            return;
        }
        axios.post(`${url}/api/user/register`, signupdata)
            .then((res) => {
                if (res.data.Message) {
                    setError(res.data.Message);
                }
                if (res.data.token) {
                    setsignupdata(SignUpObj)
                    setopensinUpModal(false)
                    console.log(res.data.token)
                }
            }).catch(error => {
                console.log(error)
            })


    }
    // const decodeToken = (token) => {
    //     try {
    //       const decoded = KJUR.jws.JWS.parse(token);
    //       return decoded.payloadObj;
    //     } catch (error) {
    //       console.error('Failed to decode token:', error);
    //       return null;
    //     }
    //   };

    const SignIn = (e) => {
        if (!validateSignInForm()) {
            return;
        }
        axios.post(`${url}/api/user/login`, signindata)
            .then((res) => {
                if (res.data.Message) {
                    setError(res.data.Message);
                }
                if (res.data.token) {
                    console.log(res.data.token)
                    setsignindata(SignInObj)
                    // const {token} = res.data.token
                    localStorage.setItem('token', res.data.token);
                    // const decodedToken = decodeToken(token)
                    const token = localStorage.getItem('token')
                    const decodedtoken = jwtDecode(token)
                    setUser(decodedtoken.user);
                    setRole(decodedtoken.role);
                    setImage(decodedtoken.Image);
                    setopnModal(false)
                    if (role === 'admin')
                        toast.success(decodedtoken.Name + " " + "login successfully")
                    return navigate('/Dashboard/stats');

                }
                setopnModal(false)
                toast.success(decodedtoken.Name + " " + "login successfully")
            }).catch(error => {
                console.log(error)
            })


    }


    const CART_KEY = 'cart';
    // const getCartItems = ()=>{
    //     const Cart = localStorage.getItem(CART_KEY);
    //     setcartItems(Cart)

    // }
    const getCart = () => {
        const Cart = localStorage.getItem(CART_KEY);
        return Cart ? JSON.parse(Cart) : [];
    }
    const addToCart = (product, id) => {
        if (!user) {
            return toast.warn('Please Login');
        }
        if (role === "admin") {
            return toast.warn('Admin cannot place order');
        }
        const Cart = getCart()

        const existingProduct = Cart.find((item) => item._id === product._id);
        if (existingProduct) {
            setid(product._id)
            setMessage('Item already added');
            toast.info('Item already added')
            return [...Cart]

        } else {
            const add = [...Cart, { ...product, quantity: 1 }];
            toast.success('Item added successfully')
            return localStorage.setItem(CART_KEY, JSON.stringify(add))

        }

    }
    const removeCartItem = (itemId) => {
        const Cart = getCart()
        // setcartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        const Update = Cart.filter(product => product._id !== itemId);
        localStorage.setItem(CART_KEY, JSON.stringify(Update))
        toast.success('Cart item removed successfully')
    }

    const incQuantity = (product) => {
        const Cart = getCart()
        // setcartItems((prev)=>{

        const update = Cart.map((item) =>
            item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        localStorage.setItem(CART_KEY, JSON.stringify(update))

        // })

    }

    const decQuantity = (product) => {
        const Cart = getCart()
        if (product.quantity > 1) {
            // setcartItems((prev)=>{
            const update = Cart.map((item) =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            localStorage.setItem(CART_KEY, JSON.stringify(update));
            // })
        }

    }

    const removecarItem = (product) => {
        const Cart = getCart()
        const update = Cart.filter((item) => item._id !== product._id);
        localStorage.setItem(CART_KEY, JSON.stringify(update))
        setid(null)
        //  setcartItems(cartItems.filter((item)=> item.id !== product.id))
    }

    const getToken = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedtoken = jwtDecode(token)
            setUser(decodedtoken.Name);
            setRole(decodedtoken.role);
            setId(decodedtoken.id);
            setImage(decodedtoken.Image);
            console.log(UserId, user, role, UserImage)
            // console.log(decodedtoken)
        }


    }

    useEffect(() => {
        getToken();
    }, [user, role, UserImage])


    useEffect(() => {
        getCart()
        setcartItems(getCart());

    }, [cartItems]);
    const ContextValue = {
        addToCart,
        removeCartItem,
        Message,
        id,
        cartItems,
        incQuantity,
        decQuantity,
        removecarItem,
        signupdata,
        setsignupdata,
        Signup,
        SignIn,
        error,
        opensingUpModal,
        setopensinUpModal,
        signindata,
        setsignindata,
        SignUpObj,
        SignInObj,
        user,
        UserId,
        role,
        setUser,
        setRole,
        openModal,
        setopnModal,
        getToken,
        GetOrders,
        UserOrders,
        loading,
        Orderloading,
        setLoading,
        getfood,
        food,
        setfood,
        UserImage,
        setImage,
        setOrders,
        url,


    }
    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider