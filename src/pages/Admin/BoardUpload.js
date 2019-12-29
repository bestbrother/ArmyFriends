import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// Wysiwyg Editor
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// localStorage & Upload Config
import { getLogged } from '../../stores/localStorage';
import config from '../../stores/config';


@inject('adminBoardStore')
@observer
class BoardUpload extends Component{
	
	componentDidMount(){
		const { adminBoardStore } = this.props;
		adminBoardStore.inputReset();
	}
	
	render(){
		const { adminBoardStore } = this.props;
		const { 
			title, 
			content,
			handleInput,
			handleContentInput,
			
			uploadNotice,
			uploadImage,
		} = adminBoardStore;
		
		return(
			<div className = "AdminBoardUpload">
				
				<div className = "EditorWrapper">
					<input 
						type = "text"
						className = "uk-input input-title"
						placeholder = "제목을 입력하세요"
						name = "title"
						value = {title}
						onChange = {handleInput}
						/>
					
					<Editor
						editorState={content}
						toolbarClassName="ToolBar"
						wrapperClassName="Wrapper"
						editorClassName="Editor"
						onEditorStateChange={handleContentInput}
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
				
				<div className = "buttonWrapper">
					<button
						className = "uk-button uk-button-primary button-upload"
						onClick = {uploadNotice}
						>
						등록
					</button>
				</div>
			</div>
		);
	}
}

export default observer(BoardUpload);