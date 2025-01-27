import {FormikValues, useFormik} from "formik";
import {FunctionComponent, useEffect, useState,useContext} from "react";
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import { getAllUsers } from "../sevices/userService";
import { Users } from "../interfaces/Interfaces";
import { errorMsg, successMsg } from "../sevices/toastify";
import "../styleSheet/login.css";
import { UserContext } from "./context/userContext";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<Users[]>([]);
	const {user,setUser,isLoggedIn,setIsLoggedIn} = useContext(UserContext) || {}



	useEffect(() => {
		getAllUsers("")
			.then((res) => {
				setUsers(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const formik: FormikValues = useFormik<FormikValues>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup
				.string()
				.required("Email is required")
				.min(2)
				.email("Invalid email format"),
			password: yup
				.string()
				.required("Password is required")
				.min(6, "Password must be at least 6 characters"),
		}),
		onSubmit: (values) => {
			const user = users.find(
				(user) =>
					values.email.trim().toLowerCase() === user.email.trim().toLowerCase() &&
					values.password === user.password,
			);
		
			if (user && setUser && setIsLoggedIn) {
				setUser(user);
				setIsLoggedIn(true);
				successMsg(`Welcome ${user.name}, good to have you back 🥳`);
				navigate("/home");
			} else {
				// setIsLoggedIn(false);
				errorMsg("Invalid email or password 🫣");
				console.log("Invalid email or password");
			}
		},
	});

	return (
		<>
			<div className='text-center fluid-container pt-5 login mt-5' style={{maxWidth:"30rem"}} >
				<form onSubmit={formik.handleSubmit} className='d-flex flex-column p-5'>
					<h1 className="carter-one-regular">LOGIN</h1>
					<input
						id='email'
						type='email'
						className='form-control mb-3 p-3'
						placeholder='Email'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email && (
						<p className='text-danger'>{formik.errors.email}</p>
					)}

					<input
						id='password'
						type='password'
						className='form-control mb-3 p-3'
						placeholder='Password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
					/>
					{formik.touched.password && formik.errors.password && (
						<p className='text-danger'>{formik.errors.password}</p>
					)}

					<button type='submit' className='btn btn-success'>
						logIn
					</button>
				</form>
				<h5 className='my-3' style={{fontFamily: "calibri"}}>
					new here?
					<Link to={"/registry"}>
						<span className=' text-primary p-3'>Register</span>
					</Link>
				</h5>
			</div>
		</>
	);
};

export default Login;