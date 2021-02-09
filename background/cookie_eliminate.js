// Called when the user clicks on the browser action.
chrome.tabs.onActivated.addListener((info) => {
	console.log(info);
	chrome.tabs.get(info.tabId, (tab) => {
		if (!("url" in tab)) return;
		console.log(tab.url);
		let url = new URL(tab.url);
		let domain = "." + url.hostname;
		chrome.cookies.getAll({ domain }, (coks) => {
			chrome.browserAction.setBadgeText({
				text: coks.length.toString(),
			});
		});
	});
});

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
