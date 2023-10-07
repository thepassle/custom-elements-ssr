
async function process_dsd(root) {
	// console.log("DSR polyfill processing...");
	await root.querySelectorAll("template[shadowrootmode]").forEach(template => {
		const mode = template.getAttribute("shadowrootmode");
		const shadowRoot = template.parentNode.attachShadow({ mode });
		shadowRoot.appendChild(template.content);
		template.remove();
		process_dsd(shadowRoot);
	});
}

async function install_polyfill_handler() {
	// console.log("install DSR polyfill handler...")
	if (document.readyState === "loading") {
		window.addEventListener('DOMContentLoaded', () => process_dsd(document.body), {
			once: true,
		});
	} else {
		// `DOMContentLoaded` has already fired
		await process_dsd(document.body);
	}
}


	if (!HTMLTemplateElement.prototype.hasOwnProperty('shadowRootMode')) {
		install_polyfill_handler();
	}
