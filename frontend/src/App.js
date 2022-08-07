import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
function App() {
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart, userInfo } = state;

	const signoutHandler = () => {
		ctxDispatch({ type: 'USER_SIGNOUT' });
		localStorage.removeItem('userInfo');
		localStorage.removeItem('shippingAddress');
		localStorage.removeItem('paymentMethod');
		localStorage.removeItem('cartItems');
	};

	return (
		<BrowserRouter>
			<div className="flex-column d-flex site-container">
				<ToastContainer position="bottom-center" limit={1} />
				<header>
					<Navbar bg="dark" variant="dark">
						<Container>
							<LinkContainer to="/">
								<Navbar.Brand>amazona</Navbar.Brand>
							</LinkContainer>
							<Nav className="me-auto">
								<Link to="/cart" className="nav-link">
									Cart
									{cart.cartItems.length > 0 && (
										<Badge pill bg="danger">
											{
												cart.cartItems.reduce((a, c) => a + c.quantity, 0)
												//cart.cartItems.length
											}
										</Badge>
									)}
								</Link>
								{userInfo ? (
									<NavDropdown title={userInfo.name} id="basic-nav-dropdown">
										<LinkContainer to="/profile">
											<NavDropdown.Item>User Prodfile</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to="/orderHistory">
											<NavDropdown.Item>Order History</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Divider />
										<Link
											className="dropdown-item"
											to="#signout"
											onClick={signoutHandler}
										>
											Sign Out
										</Link>
									</NavDropdown>
								) : (
									<Link className="nav-link" to="/signin">
										Sign In
									</Link>
								)}
							</Nav>
						</Container>
					</Navbar>
				</header>
				<main>
					<Container className="mt-3">
						<Routes>
							<Route path="/product/:slug" element={<ProductScreen />}></Route>
							<Route path="/cart" element={<CartScreen />}></Route>
							<Route path="/signin" element={<SigninScreen />}></Route>
							<Route path="/signup" element={<SignupScreen />}></Route>
							<Route
								path="/shipping"
								element={<ShippingAddressScreen />}
							></Route>
							<Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
							<Route path="/payment" element={<PaymentMethodScreen />}></Route>
							<Route path="/" element={<HomeScreen />}></Route>
						</Routes>
					</Container>
				</main>
				<footer>
					<div className="text-center">All right reserved</div>
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;