import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

import ReactQuill from 'react-quill';
import Header from '../../basic/Header/Header';

// basic
import Container from '../../basic/Container/Container';

// localStorage & Upload Config
import { getLogged } from '../../stores/localStorage';
import config from './config';

// SCSS
import './UploadEdit.scss';

const Font = ReactQuill.Quill.import('formats/font'); // <<<< ReactQuill exports it
Font.whitelist = ['NanumSquare', 'Roboto'] ; // allow ONLY these fonts and the default
ReactQuill.Quill.register(Font, true);

@inject('popUpStore')
@inject('postStore')
@inject('uploadStore')
@observer
class UploadEdit extends Component{
	componentDidMount(){
		const { uploadStore, postStore, match } = this.props;
		uploadStore.inputReset();
		postStore.getPost(match.params.id);
	}
	
	render(){
		const { uploadStore, postStore, popUpStore, jobId, jobName } = this.props;
		const{
			inputTitle,
			editorHtml, 
			unknown,
			
			handleInput,
			handleHtml,
			handleCancel,
			
			upload,
			jobUpload,
			uploadImage,
		} = uploadStore;
		
		const { post } = postStore;
		const { history, edit } = this.props;
		// if(!getLogged()) popUpStore.handleShow(true);
		
		if(post === null) return null;
		
		return(
			<Container
				className = "UploadEdit"
				position = { edit === "job" ? "job" : "board"}
				>
				
				<section
					className = "leftSection">
					
					<p className= "upload-title">
						{`자유게시판`}
					</p>

					<input 
						type = "text"
						className = "uk-input input-title"
						placeholder = "제목을 입력하세요"
						name = "title"
						value = {inputTitle}
						onChange = {handleInput}
						/>

					<div className = "infoWrapper">
						<p className = "label">
							※음란물 차별, 비하, 혐오, 군사보안 위반 게시물은 민·형사상의 책임을 질 수 있습니다.
						</p>
						<div className = "unknownWrapper none">
							<input
								type = "checkbox"
								className = "uk-checkbox"
								name = "unknown"
								onChange = {handleInput}
								value = {unknown}
								/>
							<span className = "unknown-text">
								익명
							</span>
						</div>
					</div>

					<ReactQuill 
						value={editorHtml}
						onChange={handleHtml} 
						modules={config.modules}
						formats={config.formats}
						bounds={'.app'}
						placeholder={`글 내용을 입력하세요...`}
						/>

					<input
						multiple
						type="file" 
						id="file" 
						onChange = {uploadImage}
						ref="fileUploader" 
						style={{display: "none"}}
						/>

					<div className = "buttonWrapper">

						<button 
							className = "uk-button cancel-btn cancel"
							onClick = {()=>handleCancel(history)}
							>
							취소
						</button>

						<button 
							className = "uk-button upload-btn primary"
							onClick = {()=>{alert(`asdf`)}}
							>
							작성 완료
						</button>
					</div>
				</section>
				
				<section
					className = "rightSection">
				
					<div className = "AdContainer">
					
					</div>
				</section>
			
				
			</Container>
		);
	}
}


export default observer(UploadEdit);