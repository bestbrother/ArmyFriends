import React from 'react';

const UserList = ({users, handleUserView}) => {
	
	return users.map((user, index)=>(
		<tr key = {user.id}>
			<td>선택</td>
			<td>{index}</td>
			<td onClick = {()=>handleUserView(user.id, true)}>{`가입일`}</td>
			<td onClick = {()=>handleUserView(user.id, true)}>{user.id}</td>
			<td onClick = {()=>handleUserView(user.id, true)}>{user.nickname}</td>
			<td onClick = {()=>handleUserView(user.id, true)}>{`방문수`}</td>
			<td onClick = {()=>handleUserView(user.id, true)}>{user.mailAccept ? "O" : "X"}</td>
		</tr>
	));
}

export default UserList;