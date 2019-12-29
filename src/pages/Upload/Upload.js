import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// basic
import Container from '../../basic/Container/Container';

// localStorage & Upload Config
import { getLogged } from '../../stores/localStorage';
import config from './config';

// SCSS
import './Upload.scss';

@inject('popUpStore')
@inject('uploadStore')
@observer
class Upload extends Component{
	componentDidMount(){
		const { uploadStore } = this.props;
		uploadStore.inputReset();
	}
	
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
		};
	}

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	};
	
	render(){
		const { uploadStore, popUpStore } = this.props;
		const{
			inputTitle,
			unknown,
			
			handleInput,
			handleHtml,
			handleCancel,
			
			upload,
			jobUpload,
			uploadImage,
		} = uploadStore;
		
		if(!getLogged()) popUpStore.handleShow(true);
		
		const { history, location, match } = this.props;
		
		const JOBID = match.params.jobId ? match.params.jobId : null;
		const JOBNAME = localStorage.getItem('uploadJobName');
		const JOB_UPLOAD = JOBID ? true : false;
		
		const editorHtml = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
		
		return(
			<Container
				className = "Upload"
				header = {{view : true, active : JOB_UPLOAD ? "job" : "board"}}>
				
				<section
					className = "leftSection">
					
					<p className= "upload-title">
						{ JOB_UPLOAD ? `${JOBNAME} TIP` : "자유게시판" }
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
						<div className = "unknownWrapper">
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
					
					<div className = "EditorWrapper">
						<Editor
							editorState={this.state.editorState}
							toolbarClassName="ToolBar"
							wrapperClassName="Wrapper"
							editorClassName="Editor"
							onEditorStateChange={this.onEditorStateChange}
							toolbar={{
								inline: { inDropdown: true },
								list: { inDropdown: true },
								textAlign: { inDropdown: true },
								link: { inDropdown: true },
								history: { inDropdown: true },
								image: { uploadCallback: uploadImage, alt: { present: true, mandatory: true } },
								fontFamily: { 
									options: [
										'Binggrae Melona', 'Binggrae Melona Bold', 'BNHannaPro', 'Gabia Bombaram', 'Gabia NapjackBlock',
										'Gabia Solmee', 'HS FallStory', 'HS FallStory Bold', 'HS Spring Regular', 'HS Spring Bold',
										'IropkeBatang', 'SDMiSaeng', 'SDSwagger', 'TmonMonsori', 'tvn FunStory',
										'tvn FunStory Bold', 'tvn FunStory Light'
									],
								}, 
							}}
							localization={{locale: 'ko'}}
						/>
					</div>
					

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
							onClick = {()=>handleCancel(history, JOBID)}
							>
							취소
						</button>

						<button 
							className = "uk-button upload-btn primary"
							onClick = {()=>{
								if(JOB_UPLOAD) jobUpload(match.params.jobId, editorHtml);
								else upload(editorHtml);
							}}
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

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};


export default observer(Upload);