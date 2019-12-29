import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';

// CSS
import './css/modify.css';

@inject('adminJobStore')
@observer
class JobModifyView extends Component{
	
	componentDidMount(){
		document.addEventListener("keydown", this.escFunction, false);
		
		const { adminJobStore, id } = this.props;
		adminJobStore.getAll(id);
	}
	
	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction, false);
	}
	
	escFunction =(event) => {
    	if(event.keyCode === 27) {
    		//Do whatever when esc is pressed
			this.props.handleView(0, false);
		}
	};
	
	render(){
		
		const { adminJobStore, id } = this.props;
		const { state, job, handleModify, patchModify, uploadImage } = adminJobStore;
		const { 
			features, 
			job_options,
			handleOptionChecked, 
			web_links, 
			video_links, 
			addLink, 
			handleLink,
			deleteLinks,
		} = adminJobStore;
		
		
		if(state !== "done" || job === null){
			return <h1>Loading!</h1>;
		}
		
		
		
		return(
			<div className = "job-modify">
				<div className = "modify-content">
					<div className = "editor-item">
						<h1 className = "job-title">보직 분류 항목</h1>
						<p>인터넷 자료, 동영상 자료를 삭제하려면 이름 또는 링크를 공백으로 비워둔 상태에서 수정하면 삭제가 됩니다.</p>
						{
							features.map((feature, index)=>(
								<div className = "job-item" key = {feature.id}>
									<h4 className = "job-item-title">{feature.name}</h4>
									<div className = "option-item">
										{
											feature.options.map((option, index)=>{
												// 만약 해당될경우
												if(job_options.map(option=>option.id).indexOf(option.id) > -1){
													
												}
												
												return(
													<span className = "option" key = {option.id}>
														<span>
															<input 
																type = "checkbox" 
																className = "uk-checkbox"
																name = {option.id}
																defaultChecked = {job_options.map(option=>option.id).indexOf(option.id) > -1 ? true : false}
																onChange = {handleOptionChecked}
																/>
															<span>{job_options.indexOf(option.id) > 0}</span>
														</span>
														<span className = "option-title">
															{option.name}
														</span>
													</span>
												);
												
											})
										}
									</div>
								</div>
							))
						}
					</div>
					<div className = "editor-item">
						<span className = "editor-title1">
							보직 이름
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-input"
								value = {job.name}
								name = "name"
								onChange = {handleModify}
								/>
						</span>
					</div>
					<div className = "editor-item">
						<span className = "editor-title1">
							보직 이미지
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-input" 
								disabled = {true} 
								value = {job.image!==null ? job.image : ""}
								/>
							<input 
								type="file" 
								name = "image"
								onChange={uploadImage} />
						</span>
					</div>
					<div className = "editor-item">
						<span className = "editor-title1">
							보직 썸네일 이미지
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-input"
								disabled = {true} 
								value = {job.thumbnail ? job.thumbnail : ""}
								/>
							<input 
								type="file" 
								name = "thumbnail"
								onChange={uploadImage} />
						</span>
					</div>
					
					<div className = "editor-item">
						<span className = "editor-title1">
							경쟁률
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-input"
								value = {job.rate ? job.rate : ""}
								name = "rate"
								onChange = {handleModify}
								/>
						</span>
					</div>
					<div className = "editor-item">
						<span className = "editor-title2">
							직무 개요 및 업무 
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-textarea"
								value = {job.description !== null ? job.description : ""}
								name = "description"
								onChange = {handleModify}
								/>
						</span>
					</div>
					<div className = "editor-item">
						<span className = "editor-title2">
							관련 분야 (직접)
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-textarea"
								value = {job.directField !== null ? job.directField : ""}
								name = "directField"
								onChange = {handleModify}
								/>
						</span>
					</div>
					<div className = "editor-item">
						<span className = "editor-title2">
							관련 분야 (간접)
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-textarea"
								value = {job.indirectField!==null ? job.indirectField : ""}
								name = "indirectField"
								onChange = {handleModify}
								/>
						</span>
					</div>
					<div className = "editor-item">
						<span className = "editor-title2">
							신체 사항
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-textarea"
								value = {job.physical!==null ? job.physical : ""}
								name = "physical"
								onChange = {handleModify}
								/>
						</span>
					</div>
					<div className = "editor-item">
						<span className = "editor-title2">
							지원 자격 
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-textarea"
								value = {job.requirement !==null ? job.requirement : ""}
								name = "requirement"
								onChange = {handleModify}
								/>
						</span>
					</div>
					
					<div className = "editor-item">
						<span className = "editor-title2">
							지원부터 배치까지
						</span>
						<span className = "editor-content">
							<textarea 
								className = "uk-textarea editor-textarea"
								value = {job.process !==null ? job.process : ""}
								name = "process"
								onChange = {handleModify}
								/>
						</span>
					</div>
					
					<div className = "editor-item">
						<p className = "link-info">
							수정과 삭제는 따로 작동합니다.
							<br/>
							공백으로 추가한 상태에서 [ 수정하기 ] 버튼을 눌러도 공백으로 저장됩니다.
							<br/>
							삭제를 원하실 시 제목 또는 링크를 공백으로 비워두신 후, [ 링크 삭제하기 ] 버튼을 누르시면 자동으로 삭제가 됩니다.
						</p>
						<div className = "editor-title">
							인터넷 자료
						</div>
						
						<div className = "editor-content">
							{
								web_links.map((link, index)=>(
									<div className = "link-c" key = {index}>
										<input
											className = "uk-input uk-form-width-medium uk-form-small"
											name = {index}
											value = {link.name}
											onChange = {(e)=>handleLink(e, "web", "name")}
											placeholder = "인터넷 자료 - 제목"
											type = "text"/>
										<input
											className = "uk-input uk-form-width-large uk-form-small"
											name = {index}
											value = {link.url}
											onChange = {(e)=>handleLink(e, "web", "url")}
											placeholder = "인터넷 자료 - 링크"
											type = "text"/>
									</div>
									
								))
							}
							
							<button
								className = "uk-button uk-button-primary link-button"
								onClick = {()=>addLink("web")}
								>
								추가
							</button>
						</div>
					</div>
					
					<div className = "editor-item">
						<div className = "editor-title">
							동영상 자료
						</div>
						
						<div className = "editor-content">
							{
								video_links.map((link, index)=>(
									<div className = "link-c" key = {index}>
										<input
											className = "uk-input uk-form-width-medium uk-form-small"
											name = {index}
											value = {link.name}
											onChange = {(e)=>handleLink(e, "video", "name")}
											placeholder = "동영상 자료 - 제목"
											type = "text"/>
										<input
											className = "uk-input uk-form-width-large uk-form-small"
											name = {index}
											value = {link.url}
											onChange = {(e)=>handleLink(e, "video", "url")}
											placeholder = "동영상 자료 - 링크"
											type = "text"/>
									</div>
								))
							}
							
							<button
								className = "uk-button uk-button-primary link-button"
								onClick = {()=>addLink("video")}
								>
								추가
							</button>
							
						</div>
					</div>
					
					<form onSubmit = {e=>e.preventDefault()}>
						<button
							className = "uk-button uk-button-primary"
							onClick = {()=>patchModify(id)}>
							수정하기
						</button>
						<button 
							className = "uk-button uk-button-danger"
							onClick = {()=>deleteLinks(id)}>
							링크 삭제하기
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default observer(JobModifyView);