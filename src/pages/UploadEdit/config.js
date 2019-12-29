const config = {
	modules : {
		toolbar: {
			container : [
				[{ 'header': '1'}, {'header': '2'}, { 'font': ['NanumSquare', 'Roboto'] }],
				[{size: []}],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{'list': 'ordered'}, {'list': 'bullet'}, 
				{'indent': '-1'}, {'indent': '+1'}],
				['link', 'image',],
				['clean']
			],
			handlers: {
				 'image': ()=>{
					 this.refs.fileUploader.click();
				 }
			},
		}
	},

	formats : [
		'header', 'font', 'size',
		'bold', 'italic', 'underline', 'strike', 'blockquote',
		'list', 'bullet', 'indent',
		'link', 'image', 'video'
	],
};

export default config;