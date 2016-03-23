function ready () {

	if (iOSversion()) {
		var iframe = document.querySelector('#video');

		iframe.width 	= '560';
		iframe.height 	= '315';
		iframe.src 		= 'https://www.youtube.com/embed/_F6JwJ_i-Ls';
	}
}
		


function iOSversion() { 
	return (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
}

document.addEventListener('DOMContentLoaded', ready);
