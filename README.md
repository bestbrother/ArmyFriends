# Request Code 

## Main

- /src/pages/Job/Job.js : 크게 세가지로 분류되어 있습니다.

```js
export default class Job extends Component{
	render(){
		return(
			<Container 
				className = "Job"
				header = {{view : true, active : 'job'}}>
				
				<FeatureContainer />
				<JobContainer />
				<Footer/>
				
			</Container>
		);
	}
}
```

1. FeatureContainer : /src/pages/Job/FeatureContainer.js
2. JobContainer : /src/pages/Job/JobContainer.js
3. Footer : /src/pages/Footer/Footer.js

### 1.FeatureContainer

보직분류를 체크박스를 통해 분류합니다. 체크박스를 입력하면 `JobStore.js`에 있는 코드를 통해서 보직이 보여주는 뷰를 변경시킵니다.

아래 코드는 체크박스와 View를 담당합니다. 서버를 토대로 받아와 View를 구성합니다.
```js
const featureList = features && features.length !== 0 ?
	features.map((feature, index)=>{

		const featureHidePlus = feature.options.length >= 15 ? hide[feature.id] === true ? "" : "none" : "none";
		const featureHideMinus = feature.options.length >= 15 ? hide[feature.id]===false ? "" : "none" : "none";

		return(
			<div className = "FeatureItem" key = {feature.id}>
				<div className = "FeatureItemText">
					<span>
						{feature.name ? feature.name : ""}
					</span>
					<span className = {`hide ${featureHidePlus}`} onClick = {()=>handleHide(feature.id)} key = {`1`}>
						+
					</span>
					<span className = {`hide ${featureHideMinus}`} onClick = {()=>handleHide(feature.id)} key = {`2`}>
						-
					</span>
				</div>

				<div className = "OptionList">
					{
						feature.options && feature.options.map((option, index)=>{
							const featureId = feature.id;
							const optionId = option.id;

							return(
								<div 
									key = {option.id} 
									className = {`OptionItem ${index > 15  && hide[feature.id] === true ? " none" : ""}`}

									>
									<input 
										className = "uk-checkbox OptionCheckbox"
										type = "checkbox"
										name = {option.id}
										onChange = {(e)=>handleChecked(e, {feature : featureId, option : optionId})}
										/>
									<span className = "OptionItemText">
										{option.name ? option.name : ""}
									</span>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	})
: null;
```


JobStore 위치 : /src/pages/stores/JobStore.js

선택을 했을 때 작동하는 함수입니다. 선택을 하게 되면 서버에서 받아온 직업 정보들을 토대로, 대항목과 소항목을 기준으로 분류합니다.

```js
@action.bound
handleChecked = (e, obj) => {
	this.activePage = 1;

	// 체크 되었을 때
	if(e.target.checked){
		this.checked.push(e.target.name);
	}else{
		let index = this.checked.indexOf(e.target.name);
		this.checked.splice(index, 1);
	}

	// 체크 되었을 때, feature & option
	if(e.target.checked){
		let copyedObject = this.checkedObject;
		if(this.checkedObject[obj.feature]){
			copyedObject[obj.feature].push(obj.option);
		}else{
			copyedObject[obj.feature] = [obj.option];
		}
		this.checkedObject = copyedObject;

	}else{
		let copyedObject = this.checkedObject;
		if(copyedObject[obj.feature]){
			let idx = copyedObject[obj.feature].indexOf(obj.option);

			if(idx > -1) copyedObject[obj.feature].splice(idx, 1); // 찾으면 지우기
			if(copyedObject[obj.feature].length === 0) delete copyedObject[obj.feature]; // object[feature] 배열길이가 0일경우 삭제

			this.checkedObject = copyedObject;
		}
	}

	// 선택된 직업 골라내기 => 일단 모두 합집합으로 해결.
	Object.keys(this.checkedObject).map((feature, idx)=>{
		let temp = [];
		this.checkedObject[feature].map((option, index)=>{
			this.jobs.map(job=>{
				if(job.options.some(jobOption=>jobOption.id === option)) temp.push(JSON.stringify(job));
			})
		});

		if(idx === 0){
			this.jobSelected = temp;
		}else{
			this.jobSelected = this.intersect(this.jobSelected, temp);
		}

		this.jobSelected = this.intersect(this.jobSelected, temp);
	});

	this.jobSelected = this.jobSelected.map(job=>JSON.parse(job));
	this.jobSelected = this.removeDuplicates(this.jobSelected);

	console.log(toJS(this.jobSelected));
};
```


### 2.JobContainer

JobContainer는 직업의 리스트들을 보여주는 컴포넌트입니다.
위에 FeatureContainer를 클릭했을때는 해당하는 직업들만 보여주며, 그 이외에 가나다순 정렬, 낮은 경쟁률 순, 조회순으로 정렬할 수 있습니다.

정렬하는 함수는 이와 같습니다. 체크박스를 선택할때 불러오는 파일 - JobStore.js에서 똑같이 불러옵니다.

SORT 변수에 따라 어떤 정렬을 할지 결정하고, compareMethod 함수에 따라 정렬하게 됩니다.
```js
@action.bound
handleSort = sort => {
	this.SORT = sort;
};
	
@action.bound
compareMethod = (A, B) => {
	let nameA = A.name;
	let nameB = B.name;

	let viewA = parseInt(A.views);
	let viewB = parseInt(B.views);

	let rateA = parseFloat(A.rate);
	let rateB = parseFloat(B.rate);

	if(isNaN(rateA)) rateA = 0.0;
	if(isNaN(rateB)) rateB = 0.0;

	switch(this.SORT){
		case 1:
			return A.name < B.name ? -1 : A.name > B.name ? 1 : 0;
		case 2:
			return viewB - viewA;
		case 3:
			return rateA - rateB;
	}
}
```

### 3.Footer 
Footer는 /src/basic/Footer/Footer.js
뷰만 담당하므로 설명은 패스하도록 하겠습니다.

## 나의 ArmyFriend

### 1.열어본 보직

`config.js` : /src/stores/config.js

자바스크립트 기본기능인 localStorage 기능을 이용합니다. 이 기능은 서버와 소통없이 컴퓨터의 로컬데이터에 저장하도록 구현되어 있습니다.

```js
// 열람한 보직 저장 & 얻기
const saveMyJob = (job) => {
	let jobs = JSON.parse(localStorage.getItem('myJobs'));
	
	if(jobs === null){
		jobs = [];
		jobs.push(job);
	}else{
		let EXIST = false;
		for(let i=0;i<jobs.length;i++){
			if(jobs[i].id === job.id){
				EXIST = true;
				
				jobs.splice(i, 1);
				jobs.push(job);
				break;
			}
		}
		
		if(!EXIST){
			jobs.push(job);
		}
	}
	
	localStorage.setItem('myJobs', JSON.stringify(jobs));
}

const getMyJobs = () => {
	return JSON.parse(localStorage.getItem('myJobs'));
}
```

### 2.첫 화면

`My.js` : /src/pages/My.js

```js
renderPage = () => {
	const { myStore, popUpStore, match } = this.props;
	const page = match.params.page;
	const {
		posts,
		user,

		handleInput,
		login,

		getLogged,

		activePage,
		handleActivePage,
	} = myStore;

	if(!getLogged()) this.props.history.push('/login');
	const PAGE = match.params.page;

	switch(PAGE){
		case "1":
			return <History
					   activePage = {activePage}
					   handleActivePage = {handleActivePage}
					   />;
		case "2":	
			return <MyPosts/>;
		case "3":
			return <MyComments/>;
		case "4":
			return <EditUser/>;
		case "5":
			return <DeleteUser/>;
	}
}
```

드로어를 구성하고, 각각의 page를 렌더링 합니다.

### 3.내가 쓴 글

`MyPosts.js` : /src/pages/My/MyPosts.js

서버에 자신의 아이디를 보내 자신이 글 쓴 글 목록들을 요청합니다. 그에 따라 데이터를 받아오고 View를 구성합니다.

### 3.내가 단 글

`MyComments.js` : /src/pages/My/MyComments.js

서버에 자신의 아이디를 보내 자신이 댓글 단 글 목록들을 요청합니다. 그에 따라 데이터를 받아오고 View를 구성합니다.

### 5.닉네임 변경 

`CheckPassword.js` : /src/pages/My/CheckPassword.js

자신의 정보를 변경할 때 한번 더 비밀번호를 확인합니다. 로그인과 같은 원리로 작동합니다.

`EditUser.js` : /src/pages/My/EditUser.js

자신의 정보를 변경할 수 있는 View입니다. 패스워드와 닉네임을 변경할 수 있습니다. 서버에  요청해 자신의 정보를 변경합니다.

## 추천 받은 보직

`JobContainer.js` : /src/pages/Job/JobContainer.js
JobContainer render 함수 중에서
```js
// 대항목, 소항목을 통해 체크항목으로 분류된 보직들을 저장
saveJobs(jobSorted); // localStorage.js 의 saveJobs
```
보여지는 보직항목들을 변경될 때마다 기존에 있는 것이 있으면 지우고, 기존의 보직 리스트가 없으면 바로 보직 목록들을 저장합니다. 체크박스에 선택에 분류되고 정렬된 보직 정렬인 상태로 보직에 들어가게 되면 분류된 보직 리스트들을 저장합니다.

`localStorage.js` : /src/stores/localStorage.js

```js
const saveJobs = (jobs) => {
	localStorage.setItem('jobs', JSON.stringify(jobs));
};

const getJobs = () => {
	let jobs = JSON.parse(localStorage.getItem('jobs'));
	return jobs;
};
```

`RecommendJobList.js` : /src/pages/Job/RecommendJobList.js

```js
const jobs = localStorage.getJobs();
```

보직들을 localStorage.js를 통해 받아오고, View 를 구성합니다.

## 커뮤니티 글쓰기 라이브러리 익명 기능

`Upload.js` : /src/pages/Upload/Upload.js

Upload.js render함수 안 View 구성 코드중
```js
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
```

`UploadStore.js` : /src/stores/UploadStore.js

사용자가 체크를 입력하면 handleInput 함수를 통해 익명인지 아닌지 구분합니다.
`upload` 함수 :  `isAnonymous : this.unknown` 를 통해 서버에게 익명의 상태를 전송합니다.

```js
@action.bound
handleInput = e => {
	const name = e.target.name;
	const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

	switch(name){
		case "title":
			if(this.getTextLength(this.inputTitle) >= 20 * 2) break;
			this.inputTitle = value;
			break;
		case "unknown":
			this.unknown = value;
			break;
	}
}

@action.bound
upload = async(editorHtml) => {
	if(this.inputTitle === '' || editorHtml === ''){
		alert(`제목과 내용 모두 입력해주세요.`);
		return;
	}

	const requestStore = new RequestStore();
	const { requestPOST } = requestStore;

	const url = `${config.API_URL}/posts`;
	const params = {
		title : this.inputTitle,
		content : editorHtml,
		isAnonymous : this.unknown,
		isNotice : false
	};
	const headers = local.getHeader();

	const response = await requestPOST(url, params, headers, "upload Error");

	if(response[0] === 201){
		this.inputTitle = '';
		alert(`작성 완료!`);

		window.history.back();
	}
}

```

`PostList.js`, `PostDetail.js` : /src/pages/Board/ 안에 존재.

```js
if(post.isAnonymous) user = "익명";
```

서버에서 익명일 경우 user의 nickname 대신 "익명"을 대입해 사용자가 볼 수 없게 됩니다.