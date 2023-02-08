function fixNode(node) {
    // そもそもテキストではない場合は処理しない
    if (node.nodeType !== Node.TEXT_NODE) {
        return;
    }
    // 空のテキストは処理しない
    if (!node.textContent.trim()) {
        return;
    }
    // すでにドット化されていたら処理しない
    if (/^[\.\n\r]+$/g.test(node.textContent)) {
        return;
    }
    node.textContent = node.textContent.replace(/./g, '.');
}

function clean() {
    const items = document.querySelectorAll('html *:not(head *, style, script)');
    for (const item of items) {
        for (const node of item.childNodes) {
            fixNode(node);
        }
    }
}

clean();

const observer = new MutationObserver((records, observer) => clean());
observer.observe(document.querySelector('html'), {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
});
