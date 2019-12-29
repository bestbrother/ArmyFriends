import React from 'react';

// SCSS
import './Footer.scss';

// img
import logo from '../../assets/logo.png';

// PDF 
import PDF1 from '../../assets/pdf/pdf1.pdf';
import PDF2 from '../../assets/pdf/pdf2.pdf';
import PDF3 from '../../assets/pdf/pdf3.pdf';

const Footer = () => (
	<div className = "Footer">
		<div className = "topWrapper">
			<p className = "info-item">
				<a href = "https://bbbestbrother.wixsite.com/armyfriend">
					회사소개
				</a>	
			</p>
			<p className = "info-item">
				<a href = {PDF1} target = "_blank">
					이용약관
				</a>
			</p>
			<p className = "info-item">
				<a href = {PDF2} target = "_blank">
					개인정보처리방침
				</a>
			</p>
			<p className = "info-item">
				<a href = {PDF3} target = "_blank">
					청소년보호정책
				</a>
			</p>
		</div>
		<div className = "middleWrapper">
			<p className = "label-title">문의사항</p>
			<p className = "label-email">Email: Best.Brother.Army@gmail.com</p>
		</div>
		<div className = "bottomWrapper">
			<div className = "imageWrapper"><img className = "image" src = {logo} alt = "logo" /></div>
			<p className = "copyright">Copyright 2019 <span className = "strong">베스트 부라더(Best Brother)</span> Corp. All Rights Reserved.</p>
		</div>
	</div>
);

export default Footer;