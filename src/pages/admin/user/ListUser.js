import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../redux/apiRequest';

const ListUserPage = () => {
	const admin = useSelector((state) => state.auth.login?.currentUser);
	const dispatch = useDispatch();
	const listUser = useSelector((state) => state.user.users?.allUsers);
	useEffect(() => {
		getAllUsers(admin?.data?.admin_token, dispatch);
	}, []);
	localStorage.setItem('token', admin?.data?.admin_token);
	return (
		<>
			<div>
				{listUser &&
					listUser.map((item) => (
						<div key={item._id}>
							{item.name}
							<br></br>
							{item.email}
						</div>
					))}
			</div>
		</>
	);
};

export default ListUserPage;
