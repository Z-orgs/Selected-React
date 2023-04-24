import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdmins } from '../../../redux/apiRequest';
import axios from 'axios';
import Modal from '../../../components/modal/Modal';

const ListAdminPage = () => {
	const admin = useSelector((state) => state.auth.login?.currentUser);
	const dispatch = useDispatch();
	const list = useSelector((state) => state.admin.admins?.allAdmins);
	const [showModal, setShowModal] = useState(false);
	const [ad, setAd] = useState({});
	const [firstName, setFirstName] = useState('');
	const [lastName, setLasttName] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const handleCreateAdmin = async (e) => {
		const admin = {
			username,
			password,
			firstName,
			lastName,
		};
		try {
			// setTypeModal("form");
			await axios
				.post(`http://localhost:3000/admin/`, admin, {
					headers: {
						Authorization: `Bearer ${admin?.data?.admin_token}`,
					},
				})
				.then((res) => {
					console.log(res);
				});
			console.log(admin);
		} catch (e) {
			alert(e);
		}
	};
	const handleResetPassword = async (id) => {
		const res = await axios.put(
			`http://localhost:3000/admin/${id}`,
			{ id: id },
			{
				headers: {
					Authorization: `Bearer ${admin?.data?.admin_token}`,
				},
			},
		);
		console.log(res);
	};
	useEffect(() => {
		getAllAdmins(admin?.data?.admin_token, dispatch);
	}, []);
	localStorage.setItem('token', admin?.data?.admin_token);
	return (
		<>
			{list && list.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>Username</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{list.map((ad) => (
							<tr key={ad._id}>
								<td>{ad.username}</td>
								<td>{ad.firstName}</td>
								<td>{ad.lastName}</td>
								<td>
									<button
										onClick={() =>
											handleResetPassword(ad._id)
										}
									>
										Reset password
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Nothing</p>
			)}
			<button
				onClick={() => {
					setShowModal(true);
				}}
			>
				Create Admin
			</button>
			<Modal
				show={showModal}
				heading="Create admin"
			>
				<form onSubmit={handleCreateAdmin}>
					<label>Username</label>
					<br></br>
					<input
						type="text"
						name="username"
						onChange={(e) => setUsername(e.target.value)}
					/>
					<br />
					<label>Password</label>
					<br></br>
					<input
						type="text"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<label>First name</label>
					<br />
					<input
						type="text"
						name="firstName"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<br />
					<label>Last name</label>
					<br />
					<input
						type="text"
						name="lastName"
						onChange={(e) => setLasttName(e.target.value)}
					/>
					<br />
					<button>Submit</button>
				</form>
			</Modal>
		</>
	);
};

export default ListAdminPage;
