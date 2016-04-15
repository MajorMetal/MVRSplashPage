function ready () {

	if (iOSversion()) {
		 var iframe = document.querySelector('#video');
		
		 iframe.width 	= '560';
		 iframe.height 	= '315';
		 iframe.src 		= 'https://www.youtube.com/embed/kbAuLJH7AjE';
	}
}
		


function iOSversion() { 
	return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
}

document.addEventListener('DOMContentLoaded', ready);
