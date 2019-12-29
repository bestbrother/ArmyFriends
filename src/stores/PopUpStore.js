import { observable, action } from 'mobx';

export default class PopUpStore{
	
	@observable show = false;
	@observable click = false;

	@observable show2 = false;
	@observable click2 = false;

	@observable title = '로그인 페이지 이동하기';
	@observable content = '작성을 위해서 로그인이 필요합니다.';
	@observable content2 = '로그인 하시겠습니까?';

	@observable title2 = '자유 게시판 이용안내';
	@observable content3 = '※음란물 차별, 비하, 혐오, 군사보안 위반 게시물은 민·형사상의 책임을 질 수 있습니다.';

	@action.bound
	handleShow = (show) => {
		this.show = show;
	}
	
	@action.bound
	handleClick = (click) => {
		this.click = click;
	}
	
	@action.bound
	handleShow2 = (show) => {
		this.show2 = show;
	}
	
	@action.bound
	handleClick2 = (click) => {
		this.click2 = click;
	}
	
	@action.bound
	getClick = () => {
		if(this.click){
			return true;
			this.click = false;
		}
		return false;
	}
	
	
}