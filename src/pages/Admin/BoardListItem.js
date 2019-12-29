import React from 'react';

const BoardListItem = ({posts, handleChecked, handlePostView}) => {
	return(
		<tbody>
			{
				posts.map((post, index)=>(
					<tr key = {post.id}>
						<td>
							<input 
								className="uk-checkbox checkbox" 
								type="checkbox"
								onChange = {handleChecked}
								name = {post.id}
								/>
						</td>
						<td>{post.id}</td>
						<td onClick = {()=>handlePostView(post.id, true)}>
							<p className = "post-title">{post.title}</p>
							<p className = "post-content">{post && post.content ? post.content.replace(/(<([^>]+)>)/gi, "") : ""}</p>
							
						</td>
						<td>{post.createdAt}</td>
					</tr>
				))
			}
		</tbody>
	);
};


export default BoardListItem;