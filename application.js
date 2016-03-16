function ready () {
			var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

			if (isSafari) {
				var container = document.querySelector('#iframe-container'),
					iframe = document.createElement('iframe');

				iframe.width = '560';
				iframe.height = '315';
				iframe.src = 'https://youtu.be/TuapDf6Un7M';
				iframe.frameborder = '0';
				iframe.allowfullscreen = true;

				container.appendChild(iframe);
			}
		}
		document.addEventListener('DOMContentLoaded', ready);