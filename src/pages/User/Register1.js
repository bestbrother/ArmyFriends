import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

// header img
import header_1 from '../../assets/register/register-header-1.png';


@inject('userStore')
@observer
class Register1 extends Component{
	
	handlePage = (index) => {
		const { userStore } = this.props;
		const {
			checkbox1,
			checkbox2,
			checkbox3,
			handleErrorLog
		} = userStore;
		
		if(index === "next" && checkbox1 && checkbox2){
			this.props.history.push('/register/2');
		}
		
		if(index === "next" && !(checkbox1 && checkbox2)){
			handleErrorLog(1, "Army Friend 이용약관과 개인정보 수집 및 이용에 대한 안내 모두 동의해주세요. ");
		}
		
		if(index === "home"){
			this.props.history.push('/');
		}
	}
	
	render(){
		const { userStore } = this.props;
		const {
			checkbox1,
			checkbox2,
			checkbox3,
			handleInput,
			errorLog1,
		} = userStore;
		
		return(
			<React.Fragment>
			<div className = "RegisterHeader">
				<img
					className = "header-img"
					src = {header_1} 
					alt = "header"/>
			</div>
			
			<div className = "Register1">
				
				<div className = "register-header">
					<p className = "title">
						회원가입
					</p>
					<div className = "info-wrapper">
						<p className = "info">
							ArmyFriend 회원 이용약관과 개인정보 수집 및 이용에 동의하셔야 회원가입이 가능합니다.
						</p>
					</div>
				</div>
				
				<div className = "check-all">
					<p className = "info">
						이용약관, 개인정보 수집 및 이용, ArmyFriend 이메일 수신(선택)에 모두 동의합니다.
					</p>
				</div>
				
				<div className = "TermList">
					<div className = "TermItem">
						<div className = "term-header">
							<p className = "title">
								서비스 이용약관 (필수)
							</p>
							
							<div className = "checkbox-wrapper">
								<input
									className = "uk-checkbox checkbox"
									type = "checkbox"
									name = "checkbox1"
									onChange = {handleInput}
									/>
								
								<span className = "checkbox-label">
									내용을 확인했으며, 동의합니다.
								</span>
							</div>
						</div>
						<div className = "term-content">
							<div className = "content-wrapper">
								<p className = "term">
									제1조 (목적 및 약관의 효력과 변경)<br/>
									① 본 약관은 회사가 서비스 초기 화면 등에 공지함으로써 효력을 발생합니다. <br/>
									② 본 약관은 베스트부라더(이하 회사)가 제공하는 Army Friend 및 Army Friend 관련 제반 서비스(이하 서비스라 합니다)의 이용과 관련하여, 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.<br/>
									③ 회사는 '약관의 규제에 관한 법률', '정보통신망 이용촉진 및 정보보호 등에 관한 법률' 등 각종
									관계 법령을 위배하지 않는 범위 내에서 본 약관을 개정할 수 있습니다. <br/>
									④ 회사가 약관을 개정할 경우, 적용 일자 및 개정 사유를 명시하여 현행 약관과 함께 제①항의 방
									법에 따라 개정 약관 적용일 10일전부터 적용 일자 전일까지 공지합니다. 다만, 회원에게 불리한
									개정 사항인 경우 개정 약관 적용일 30일전부터 적용 일자 전일까지 공지하며, 공지 외 일정 기간
									서비스 내 휴대폰메세지 전송 등 전자적 수단을 통해 별도로 통지합니다. <br/>
									⑤ 회원은 개정 약관에 대해 거부할 권리를 보유합니다. 회원은 개정된 약관이 전항의 방법에 따라
									공지된 후 15일 이내에 거부 의사를 표명할 수 있으며, 회원이 15일 이내에 거부 의사를 표시하
									지 않고 서비스를 계속 이용하는 경우, 회사는 회원이 개정 약관에 동의하는 것으로 봅니다. <br/>
									
									<br/>제2조 (회원 및 용어의 정의)<br/>
									① 회원이란 회사가 제공하는 서비스에 접속하여 본 약관에 따라 회사의 이용절차에 동의하고 회사
									가 제공하는 서비스를 이용하는 이용자를 말합니다. <br/>
									② 아이디(ID): 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자
									의 조합<br/>
									③ 비밀번호: 회원이 부여받은 아이디(ID)와 일치되는 회원임을 확인할 목적으로, 회원 자신이 정한
									문자 또는 숫자의 조합<br/>
									④ 게시물: 회원이 서비스를 이용하면서 서비스 상에 게시한 글, 사진, 동영상, 음성 및 각종 파일
									및 링크 등(형태와 유형을 제한하지 않음)<br/>
									
									<br/>제3조 (회원 가입)<br/>
									① 회원이 되고자 하는 자는 회사가 정한 회원 가입 신청서에 아이디(ID)를 포함하는, 서비스 제공
									을 위한 최소한의 정보를 입력하고 동의, 확인 등의 버튼을 누르는 방법으로 회원 가입을 신청합니
									다. <br/>
									② 회사는 제①항과 같이 회원으로 가입할 것을 신청한 자가 다음 각 호에 해당하지 않는 한 신청
									한 자를 회원으로 등록합니다. <br/>
									1. 등록 내용에 허위, 기재누락, 오기가 있는 경우<br/>
									2. 제6조 제③항에 해당하는 회원 자격 제한 및 정지, 상실을 한 경험이 있었던 경우<br/>
									3. 기타 회원으로 등록하는 것이 회사의 서비스 운영 및 기술상 현저히 지장이 있다고 판단되는
									경우<br/>
									4. 서비스 이용 희망자의 서비스 이용이 명백하게 관계 법령 및 사회질서 또는 미풍양속에 반할
									우려가 있는 경우<br/>
									③ 회원가입계약의 성립 시기는 회사의 승낙이 가입신청자에게 도달한 시점으로 합니다. <br/>
									④ 회원은 제①항의 회원정보 기재 내용에 변경이 발생한 경우, 즉시 변경사항을 정정하여 기재하
									여야 합니다. <br/>
									
									<br/>제4조 (서비스의 제공 및 변경)<br/>
									① 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. <br/>
									② 회사는 회원에게 아래와 같은 서비스를 제공합니다. <br/>
									1. 커뮤니티 서비스 (자유게시판, Tip게시판 등)<br/>
									2. 개인화 서비스 (나의 Army Friend 등)<br/>
									3. 검색 서비스<br/>
									4. 보직분류 및 보직에 대한 정보제공 서비스<br/>
									4. 기타 회사가 자체 개발하거나 다른 회사와의 협력계약 등을 통해 회원들에게 제공할 일체의 서
									비스<br/>
									③ 회사는 서비스의 내용 및 제공일자를 제7조 제②항에서 정한 방법으로 회원에게 통지하고, 제②
									항에 정한 서비스를 변경하여 제공할 수 있습니다. <br/>
									④ 회사는 상당한 이유가 있는 경우, 운영상 또는 기술상 필요에 따라 제공하는 서비스의 전부 또
									는 일부를 변경할 수 있습니다. <br/>
									⑤ 서비스의 내용, 이용 방법, 이용 시간에 대하여 변경이 있는 경우 변경 사유, 변경될 서비스의
									내용 및 제공 일자 등은 그 변경 전에 제7조 제②항에서 정한 방법으로 회원에게 통지하고 7일 이
									상 해당 서비스의 초기 화면에 공지합니다. <br/>
									⑥ 회사는 무료로 제공되는 서비스의 전부 또는 일부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 관하여 관계 법령에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지않습니다. <br/>

									<br/>제5조 (서비스의 중단)<br/>
									① 제4조 제①항에도 불구하고 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의
									두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있고, 새로운 서비스로
									의 교체, 기타 회사가 적절하다고 판단하는 사유에 기하여 현재 제공되는 서비스를 완전히 중단할
									수 있습니다. <br/>
									② 제1항에 의한 서비스 중단의 경우에 회사는 제7조 제②항에서 정한 방법으로 회원에게 통지합
									니다. 다만, 회사가 사전에 통지할 수 없는 사유로 인한 서비스의 중단(시스템 관리자의 고의, 과실
									이 없는 디스크 장애, 시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 사후에 통지할
									수 있습니다. <br/>
									
									<br/>제6조 (회원 탈퇴 및 자격 상실 등)<br/>
									① 회원은 회사에 언제든지 나의 Army Friend 메뉴 등을 통하여 자신의 회원 등록 말소(회원 탈
									퇴)를 요청할 수 있으며 회사는 위 요청을 받은 즉시 해당 회원의 회원 등록 말소를 위한 절차를
									밟습니다. <br/>
									② 회원 탈퇴가 이루어진 경우 회원의 개인 영역(이름, 비밀번호, 휴대폰번호 등)의 정보는 삭제되
									며, 이를 복구할 수 없습니다. 다만, 커뮤니티 게시판, Tip게시판 등 공용 게시판에 등록된 "게시물
									" 등은 삭제되지 않기 때문에, 사전 삭제 후 계약 해지를 신청하여야 합니다. <br/>
									③ 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원의 회원자격을 적절한 방법으로 제한
									및 정지, 상실시킬 수 있습니다. <br/>
									1. 가입 신청 시에 허위 내용을 등록한 경우<br/>
									2. 다른 사람의 서비스 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우<br/>
									3. 서비스를 이용하여 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우<br/>
									4. 회사의 서비스를 무단으로 도용 및 상업적 목적으로 활용하는 행위<br/>
									5. 커뮤니티 게시판 등에 광고성 목적의 글을 지속적으로 올릴 경우<br/>
									6. 회사에서 불법적인 행위를 하는 경우<br/>
									7. 회사 및 기타 제 3자의 저작권 등 지적 재산권에 대한 침해 행위<br/>
									8. 회사의 서비스에 게시된 정보를 임의 변경하는 행위<br/>
									④ 회사가 회원의 회원자격을 상실시키기로 결정한 경우에는 회원등록을 말소합니다. <br/>
									⑤ 이용자가 본 약관에 의해서 회원 가입 후 서비스를 이용하는 도중, 연속하여 1년 동안 서비스
									를 이용하기 위해 로그인 기록이 없는 경우, 회사는 회원의 회원자격을 상실시킬 수 있습니다. <br/>
									
									<br/>제7조 (회원에 대한 통지)<br/>
									① 회사가 특정 회원에게 서비스에 관한 통지를 하는 경우 회원정보에 등록된 핸드폰 번호를 사용
									할 수 있습니다. <br/>
									② 회사가 불특정다수 회원에 대한 통지를 하는 경우 7일 이상 자유게시판에 공지사항으로 게시함
									으로써 개별 통지에 갈음할 수 있습니다. <br/>
									③ 서비스 초기 화면에 공지할 수 있습니다. <br/>
									
									<br/>제8조 (회원의 개인정보)<br/>
									회사는 서비스를 제공하기 위하여 관련 법령의 규정에 따라 회원으로부터 필요한 개인정보를 수집
									합니다. (개인정보에 대한 개별 항목은 개인정보처리방침에서 고지)<br/>
									
									<br/>제9조 (회사의 의무)<br/>
									① 회사는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않습니다<br/>
									② 회사는 서비스 제공 및 보안에 관련된 설비에 대하여 지속적이고 안정적인 서비스 제공에 적합
									하도록 유지, 점검 또는 복구 등의 조치를 성실하게 이행합니다. <br/>
									③ 회사는 회원이 안전하고 편리하게 서비스를 이용할 수 있도록 시스템을 구축합니다. <br/>
									④ 회사는 회원이 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다. <br/>
									⑤ 회사는 회원이 서비스를 이용함에 있어 회원에게 법률적인 증명이 가능한 고의 또는 중대한 과
									실을 입힐 경우 이로인한 손해를 배상할 책임이 있습니다. <br/>
									⑥ 회사는 서비스 제공과 관련하여 알게 된 회원의 개인정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않고 이를 보호하기 위해 노력합니다. 회원의 개인정보 보호에 관한 기타의 사항은 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 회사가 공지한 개인정보취급방침에 따릅니다. <br/>
									
									<br/>제10조 (회원의 ID 및 비밀번호에 대한 의무)<br/>
									① 회사가 관계법령, 개인정보보호정책에 의해서 그 책임을 지는 경우를 제외하고, 자신의 ID와 비밀번호에 관한 관리책임은 각 회원에게 있습니다. <br/>
									② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다. <br/>
									③ 회원은 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로
									회사에 통보하고 회사의 안내가 있는 경우에는 그에 따라야 합니다. <br/>
									④ 회사"는 회원의 아이디(ID)에 개인정보의 유출 우려가 있거나 사회질서 및 미풍양속에 반할 우
									려가 있는 경우, 또는 회사 또는 회사의 운영자로 오인할 우려가 있는 경우 해당 아이디(ID)의 사
									용을 제한할 수 있습니다.<br/>
									⑤ 제②항의 경우 해당 회원이 회사에 그 사실을 통지하지 않거나, 통지한 경우에도 회사의 안내에
									따르지 않아 발생한 손해 또는 불이익에 대하여 회사는 책임을 지지 않습니다. <br/>
									
									<br/>제11조 (회원의 의무)<br/>
									① 회원은 다음 각 호의 행위를 하여서는 안됩니다. <br/>
									1. 회원가입신청 또는 변경 시 허위내용을 등록하는 행위<br/>
									2. 회사 및 제3자의 지적재산권을 침해하거나 회사의 권리와 업무 또는 제3자의 권리와 활동를 방
									해하는 행위<br/>
									3. 다른 회원의 정보를 도용하는 행위<br/>
									4. 관련 법령에 의하여 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 등)의 게시 또는 전송하
									는 행위<br/>
									5. 회사의 직원 또는 서비스의 관리자를 가장하거나 타인의 명의를 도용하여 정보를 게시, 전송, 변경하는 행위<br/>
									6. 컴퓨터 소프트웨어, 하드웨어, 전기통신 장비의 정상적인 가동을 방해, 파괴할 목적으로 고안된 소프트웨어 바이러스, 기타 다른 컴퓨터 코드, 파일, 프로그램을 포함하고 있는 자료를 게시하거나 전송하는 행위<br/>
									7. 스토킹(stalking) 등 다른 회원을 괴롭히는 행위<br/>
									8. 다른 회원에 대한 개인정보를 그 동의 없이 수집, 저장, 공개하는 행위<br/>
									9. 불특정 다수의 자를 대상으로 하여 광고 또는 선전을 게시하거나 음란물을 게시하는 행위<br/>
									10. 회사가 제공하는 보직분류, 커뮤니티 게시판 및 관련 서비스에 게시된 공지사항 규정을 위반하
									는 행위<br/>
									11. 회사의 사전 동의 없이 서비스 또는 서비스를 이용하여 취득한 정보를 영리적인 목적으로 사
									용하는 행위<br/>
									12. 기타 불법적이거나 부당한 행위<br/>
									② 제1항에 해당하는 행위를 한 회원이 있을 경우 회사는 본 약관 제6조 제②, ③항에서 정한 바
									에 따라 회원의 회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다. <br/>
									③ 회원은 그 귀책사유로 인하여 회사나 다른 회원이 입은 손해를 배상할 책임이 있습니다. <br/>
									
									<br/>제12조 (공개게시물의 삭제 또는 이용제한)<br/>
									① 회원의 공개게시물의 내용이 다음 각 호에 해당하는 경우 회사는 해당 공개게시물에 대한 게시
									중단 및 삭제 등을 요청할 수 있으며, 7일 이내에 각 호의 동일 사례가 2회 이상 반복되는 경우
									해당 게시물을 삭제 또는 해당 회원의 회원 자격을 제한, 정지 또는 상실시킬 수 있습니다. 이때, 권리자는 회원의 자격을 보유하지 않을 수 있습니다. <br/>
									1. 다른 회원 또는 제3자를 비방하거나 중상모략으로 명예를 손상시키는 내용<br/>
									2. 음란물, 욕설 등 공서양속에 위반되는 내용의 정보, 문장, 도형 등을 유포하는 내용<br/>
									3. 범죄행위와 관련이 있다고 판단되는 내용<br/>
									4. 다른 회원 또는 제3자의 저작권 등 기타 권리를 침해하는 내용<br/>
									5. 종교적, 정치적 분쟁을 야기하는 내용으로서, 이러한 분쟁으로 인하여 회사의 업무가 방해되거
									나 방해되리라고 판단되는 경우<br/>
									6. 타인의 개인정보, 사생활을 침해하거나 명예를 손상시키는 경우<br/>
									7. 동일한 내용을 중복하여 다수 게시하는 등 게시의 목적에 어긋나는 경우<br/>
									8. 불필요하거나 승인되지 않은 광고, 판촉물을 게재하는 경우<br/>
									9. 회원의 게시물이 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 저작권법 등 관계 법령
									에 위반되는 내요응ㄹ 포함하는 경우<br/>
									② 회원의 공개게시물로 인한 법률상 이익 침해를 근거로, 다른 회원 또는 제3자가 회원 또는 회
									사를 대상으로 하여 민형사상의 법적 조치(예:고소, 가처분신청, 손해배상청구소송)를 취하는 동시
									에 법적 조치와 관련된 게시물의 삭제를 요청해오는 경우, 회사는 동 법적 조치의 결과(예: 검찰의
									기소, 법원의 가처분결정, 손해배상판결)가 있을 때까지 관련 게시물에 대한 접근을 잠정적으로 제
									한할 수 있습니다. <br/>
									
									<br/>제13조 (저작권의 귀속 및 게시물의 이용)<br/>
									① 회사가 작성한 저작물에 대한 저작권, 기타 지적재산권은 회사에 귀속합니다. <br/>
									② 회원은 회사가 제공하는 서비스를 이용함으로써 얻은 정보를 회사의 사전승낙 없이 복제, 전송, 출판, 배포, 방송, 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다. <br/>
									③ 회원이 서비스 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. <br/>
									④ 회원이 서비스 내에 게시한 게시물은 검색 결과 내지 서비스 및 관련 프로모션에 노출될 수 있
									으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집될 수 있습니다. 이 경우, 회
									사는 저작권법 규정을 준수하며, 회원은 언제든지 고객센터 또는 각 서비스 내 관리 기능을 통해
									해당 게시물 등에 대해 삭제, 검색 결과 제외, 비공개 등의 조치를 취하거나 회사에 요청할 수 있
									습니다. <br/>
									⑤ 회사는 제④항 이외의 방법으로 회원의 게시물 등을 이용하고자 하는 경우 전화, 모사전송(팩
									스), 전자우편(이메일) 등을 통해 사전에 동의를 받습니다. <br/>
									
									<br/>제14조 (책임의 제한 및 면책)<br/>
									① 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서
									비스 제공에 관한 책임이 면제됩니다. <br/>
									② 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다. <br/>
									③ 회사는 협력 업체가 제공하거나 회사가 직접 작성하지 않은 정보, 자료, 사실과 회원이 서비스와 관련하여 게재한 정보, 자료, 사실의 신뢰도, 정확성 등에 대하여 관하여는 보증을 하지 않으며, 이로 인해 발생한 회원의 손해에 대하여는 책임을 부담하지 않습니다. <br/>
									④ 회사는 회원 상호간 또는 회원과 제3자 상호간에 서비스를 매개로 하여 거래 등을 한 경우 혹
									은 분쟁이 발생한 경우 등에는 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다. <br/>
									⑤ 회사는 무료로 제공되는 서비스 이용과 관련하여 관계 법령에 특별한 규정이 없는 한, 책임을
									지지 않습니다. <br/>
									
									<br/>제15조 (광고의 게재)<br/>
									① 회사가 회원에게 서비스를 제공할 수 있는 서비스 투자기반의 일부는 광고게재를 통한 수익으로
									부터 나옵니다. 회원은 회원이 등록한 게시물의 내용을 활용한 광고게재 및 기타 서비스상에 노출
									되는 광고게재에 대해 동의합니다. <br/>
									② 회사는 서비스의 운영과 관련하여 서비스 화면, 홈페이지 등에 광고를 게재할 수 있습니다. <br/>
									② 회사는 서비스상에 게재되어 있거나 서비스를 통한 광고주의 판촉활동에 회원이 참여하거나 교
									신 또는 거래를 함으로써 발생하는 손실과 손해에 대해 책임을 지지 않습니다<br/>
									
									<br/>제16조 (분쟁의 해결 및 재판관할)<br/>
									① 회사와 회원간 분쟁이 발생한 경우 회사 또는 회원은 콘텐츠산업진흥법 제29조에서 정하고 있
									는 콘텐츠분쟁조정위원회에 분쟁조정을 신청할 수 있습니다. <br/>
									② 회사와 회원간 발생한 분쟁에 관한 소송은 대한민국 법을 준거법으로 합니다. <br/>
									③ 회사와 회원간 발생한 분쟁에 관한 소송은 제소 당시의 회원의 주소에 의하고, 주소가 없는 경
									우 거소를 관할하는 지방법원의 전속관할로 합니다. 단, 제소 당시 회원의 주소 또는 거소가 분명
									하지 않거나 외국 거주자에는 민사소송법상의 관할 법원에 제기합니다.<br/>
								</p>
							</div>
						</div>
					</div>
					<div className = "TermItem">
						<div className = "term-header">
							<p className = "title">
								개인정보 수집 및 이용약관 (필수)
							</p>
							
							<div className = "checkbox-wrapper">
								<input
									className = "uk-checkbox checkbox"
									type = "checkbox"
									name = "checkbox2"
									onChange = {handleInput}
									/>
								
								<span className = "checkbox-label">
									내용을 확인했으며, 동의합니다.
								</span>
							</div>
						</div>
						<div className = "term-content">
							<div className = "content-wrapper">
								<p className = "term">
									개인정보의 보유 및 이용기간<br/>
									이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성된 후 지체없이 파기합
									니다. 단 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.<br/>
									1. "회사" 내부 규정에 의한 정보 보유 사유<br/>
									- 보존 항목 : 이름, 아이디(ID), 비밀번호, 전화번호<br/>
									+ 보존 근거 : 서비스 사용상 혼선 방지, 불량 사용에 대한 관련 기관 수사협조<br/>
									+ 보존 기간 : 1년<br/>
									2. 관련 법령에 의한 정보 보유 사유<br/>
									- 서비스 이용기록, 접속 로그, 접속 IP 정보<br/>
									+ 보존 근거 : 통신비밀보호법<br/>
									+ 보존 기간 : 3개월<br/>
									- 계약 또는 청약철회 등에 관한 기록<br/>
									+ 보존 근거 : 전자상거래등에서의 소비자보호에 관한 법률<br/>
									+ 보존 기간 : 5년<br/>
									- 대금결제 및 재화 등의 공급에 관한 기록<br/>
									+ 보존 근거 : 전자상거래등에서의 소비자보호에 관한 법률<br/>
									+ 보존 기간 : 5년<br/>
									- 소비자의 불만 또는 분쟁처리에 관한 기록<br/>
									+ 보존 근거 : 전자상거래등에서의 소비자보호에 관한 법률<br/>
									+ 보존 기간 : 3년<br/>
									- 본인확인에 관한 기록<br/>
									+ 보존 근거 : 정보통신망 이용촉진 및 정보보호 등에 관한 법률<br/>
									+ 보존 기간 : 6개월<br/>
									개인정보 수집 및 이용 목적<br/>
									- 아이디, 비밀번호, 성명, 이메일, 아이핀값 : 중복가입 확인, 연령제한 서비스의 제공에 사용<br/>
									- 이메일주소, 일반전화, 휴대전화 : 경품 등 물품 배송, 고지사항 전달, 서비스 이용 관련 사
									항 전달 등 의사소통, 인구통계학적 분석에 사용<br/>
									- 닉네임, 성별, 생년월일, 결혼여부, 주요 활동 갤러리 : 서비스 기본 이용과 이벤트, 개인맞
									춤서비스, 연령별 서비스, 성별에 따른 서비스 제공, 인구통계학적 분석에 사용<br/>
									- 접속 IP 주소, 접속 로그, 서비스 이용기록 : 불량회원의 부정 이용 방지, 통계학적 분석에
									사용<br/>
									개인정보 보유 및 이용기간<br/>
									회사는 회원가입일로부터 회원탈퇴와 같은 개인정보 수집, 이용, 제공에 대한 동의 철회 시까
									지 회원님의 개인정보를 보유 및 이용하게 됩니다. 동의철회는 회사 서비스의 로그인 후 '정
									보수정' 메뉴 내의 '탈퇴'를 클릭하신 다음 정해진 순서에 따라 동의철회를 하시면 즉시 회원
									탈퇴가 완료되며 회원님의 개인정보를 파기하는 등 필요한 조치를 취합니다. 단, 다음의 정보
									에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다. - 보존 항목: 아이디, 닉네임, 성명, 개인식별용 키값(또는 아이핀값) - 보존 근거: 불법적 사용자에 대한 관련 기관 수사협조<br/>
									- 보존 기간: 3개월<br/>
									그리고 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서
									정한 일정한 기간 동안 회원정보를 보관합니다.<br/>
									- 보존 항목: 서비스 이용기록(저작물 작성 시 IP), 이용자 접속 정보(회원 가입 시 IP, 최종
									접속 시간) - 보존 근거: 통신비밀보호법<br/>
									- 보존 기간: 3개월<br/>
									- 표시/광고에 관한 기록: 6개월 (전자상거래등에서의 소비자보호에 관한 법률) 
									- 계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래등에서의 소비자보호에 관한 법률) - 대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래등에서의 소비자보호에 관한 법률)<br/>
									- 소비자의 불만 또는 분쟁처리에 관한 기록: 3년(전자상거래등에서의 소비자보호에 관한 법률)<br/>
								</p>
							</div>
						</div>
					</div>
					
					<div className = "TermItem">
						<input
							type = "checkbox"
							className = "uk-checkbox checkbox"
							name = "checkbox3"
							onChange = {handleInput}
							/>
						
						<span className = "checkbox-label">
							이벤트 등 프로모션 알림 메일 수신 (선택)
						</span>
					</div>
				</div>
				
				<p className = "errorLog1">{errorLog1}</p>
				
				<div className = "buttonWrapper">
					<button
						className = "uk-button return-button"
						onClick = {()=>this.handlePage("home")}
						>
						홈으로
					</button>
					<button
						className = "uk-button next-button"
						onClick = {()=>this.handlePage("next")}
						>
						다음단계
					</button>
				</div>
			</div>
			</React.Fragment>
		)
	}
}

export default observer(Register1);