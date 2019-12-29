
// 로그인 되었는지 안되었는지 체크하는 함수
const handleLogged = (logged) => {
	localStorage.setItem('logged', logged);
}
const saveLogged = () => {
	localStorage.setItem('logged', "1");
}
const getLogged = () => {
	return localStorage.getItem('logged') === "1" ? true : false;
};

// 자신의 행동이 맞는지 비교하는 함수
const isMatchUserId = (id) => {
	const userId = localStorage.getItem('userId');
	return userId === id;
};

// 토큰 저장 & 얻기
const getAccessToken = () => {
	const accessToken = localStorage.getItem('accessToken');
	return accessToken;
};

const saveAccessToken = (token) => {
	localStorage.setItem('accessToken', token);
};

// 토큰 포함한 헤더 얻기
const getHeader = () => {
	const accessToken = getAccessToken();
	let config = {
		headers: {'Authorization': "Bearer " + accessToken}
	};
	
	return config;
};

// 로그아웃 하기
const logout = (history, forceUpdate) => {
	alert(`로그아웃 완료!`);
	localStorage.setItem('logged', "0");
	localStorage.removeItem('userId');
	localStorage.removeItem('userInfo');
	localStorage.removeItem('accessToken');
	localStorage.clear();
	
	if(history){
		history.replace('/');	
	}
	if(forceUpdate){
		forceUpdate();	
	}
	
};

/*
	### USER INFO ###
*/

// 아이디 저장 & 얻기
const saveUserId = (userId) => {
	localStorage.setItem('userId', userId);
};

const getUserId = () => {
	return localStorage.getItem('userId');
};

const saveUser = (user) => {
	localStorage.setItem('userInfo', JSON.stringify(user));
}

const getUser = () => {
	const user = JSON.parse(localStorage.getItem('userInfo'));
	return user;
}

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

const saveJobs = (jobs) => {
	localStorage.setItem('jobs', JSON.stringify(jobs));
};

const getJobs = () => {
	let jobs = JSON.parse(localStorage.getItem('jobs'));
	return jobs;
};

const clearJobs = () => {
	localStorage.removeItem('jobs');
};

export {
	getAccessToken,
	saveAccessToken,
	getHeader,
	
	saveUserId,
	getUserId,
	saveUser,
	getUser,
	isMatchUserId,
	
	handleLogged,
	saveLogged,
	getLogged,
	logout,

	saveJobs,
	getJobs,
	clearJobs,
	
	saveMyJob,
	getMyJobs,
};