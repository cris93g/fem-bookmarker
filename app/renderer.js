const newLinkUrl = document.querySelector("#new-link-url");
const newLinkSubmit = document.querySelector(".new-link-form--submit");
const newLinkForm = document.querySelector(".new-link-form");
const linkTemplate = document.querySelector("#link-template");
const linksSection = document.querySelector(".links");

newLinkUrl.addEventListener("keyup", () => {
	newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});

const parser = new DOMParser();
const parseResponse = text => parser.parseFromString(text, "text/html");
const findTitle = nodes => nodes.querySelector("title").textContent;

const addToPage = ({ title, url }) => {
	const newLink = linkTemplate.content.cloneNode(true);
	const titleElement = newLink.querySelector(".link--title");
	const urlElement = newLink.querySelector(".link--url");

	titleElement.textContent = title;
	urlElement.href = url;
	urlElement.textContent = url;

	linksSection.appendChild(newLink);
	return { title, url };
};

newLinkForm.addEventListener("submit", () => {
	event.preventDefault();

	const url = newLinkUrl.value;

	fetch(url)
	.then(response => response.text())
	.then(parseResponse)
	.then(findTitle)
	.then(title => { title, url })
	.then(addToPage)
	.then(clearForm)
	.catch(error => {
	  console.error(error);
	  errorMessage.textContent = `There was an error fetching "${url}."`
	});
