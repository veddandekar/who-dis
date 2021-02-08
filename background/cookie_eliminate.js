// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
	let url = new URL(tab.url);
	let domain = "." + url.hostname;
	chrome.cookies.getAll({ domain }, (coks) => {
		coks.map((cok) => {
			chrome.cookies.remove({
				name: cok.name,
				url: "https://" + cok.domain + cok.path,
			});
		});
		chrome.tabs.reload();
	});
});
