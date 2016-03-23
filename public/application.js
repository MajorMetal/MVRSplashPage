function ready () {
			// var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

			if (iOSversion()) {
				alert('is iOS');
				var container = document.querySelector('#iframe-container'),
					iframe = document.createElement('iframe');

				iframe.width = '560';
				iframe.height = '315';
				iframe.src = 'https://www.youtube.com/embed/TuapDf6Un7M';
				iframe.frameborder = '0';
				iframe.allowfullscreen = true;

				container.appendChild(iframe);
			} else {
				alert('is not iOS');
			}
		}
		


function iOSversion() { 
	if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) { 
		// if (!!window.indexedDB) { return 'iOS 8 and up'; } 
		// if (!!window.SpeechSynthesisUtterance) { return 'iOS 7'; } 
		// if (!!window.webkitAudioContext) { return 'iOS 6'; } 
		// if (!!window.matchMedia) { return 'iOS 5'; } 
		// if (!!window.history && 'pushState' in window.history) 
		// 	{ return 'iOS 4'; } 
		// return 'iOS 3 or earlier';
		return true;
	} 
	// return 'Not an iOS device';
	return false;
}

document.addEventListener('DOMContentLoaded', ready);