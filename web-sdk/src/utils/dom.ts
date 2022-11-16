export function createNode(type: string, klass?: string, parent?: HTMLElement): HTMLElement {
	const node = document.createElement(type);
	if (klass) {
		node.setAttribute('class', klass);
	}
	if (parent) {
		parent.appendChild(node);
	}
	return node;
}
