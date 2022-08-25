(() => {
    function bind(nodes, event, handler) {
        Array.from(nodes).forEach(node => {
            node.addEventListener(event, handler);
        });
    }
    function selectTab(node, select, newId) {
        const newTab = node.querySelector(`.section__tab[data-id=${newId}]`);
        const newPanel = node.querySelector(`.section__panel[data-id=${newId}]`);
        const oldTab = node.querySelector('.section__tab_active');
        const oldPanel = node.querySelector('.section__panel:not(.section__panel_hidden)');

        oldTab.classList.remove('section__tab_active');
        oldTab.setAttribute('aria-selected', 'false');
        oldTab.removeAttribute('tabindex');
        newTab.classList.add('section__tab_active');
        newTab.setAttribute('aria-selected', 'true');
        newTab.setAttribute('tabindex', '0');
        newTab.focus({
            preventScroll: true
        });

        oldPanel.classList.add('section__panel_hidden');
        oldPanel.setAttribute('aria-hidden', 'true');
        newPanel.classList.remove('section__panel_hidden');
        newPanel.setAttribute('aria-hidden', 'false');

        select.value = newId
    }

    function makeTabs(node) {
        let selected = node.querySelector('.section__tab_active').dataset.id;
        const tabs = node.querySelectorAll('.section__tab');
        const list = Array.from(tabs).map(node => node.dataset.id);


        const select = node.querySelector('.section__select');

        select.addEventListener('input', () => {
            const newId = select.value
            selectTab(node, select, newId)
        });


        bind(tabs, 'click', event => {
            const newId = event.target.dataset.id;
            selectTab(node, select, newId)
        });

        bind(tabs, 'keydown', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
                return;
            }

            let index = list.indexOf(selected);
            if (event.which === 37) {
                // left
                --index;
            } else if (event.which === 39) {
                // right
                ++index;
            } else if (event.which === 36) {
                // home
                index = 0;
            } else if (event.which === 35) {
                // end
                index = list.length - 1;
            } else {
                return;
            }

            if (index >= list.length) {
                index = 0;
            } else if (index < 0) {
                index = list.length - 1;
            }

            selectTab(node, select, list[index]);
            event.preventDefault();
        });
    }

    function makeMenu(node) {
        let expanded = false;
        const links = document.querySelector('.header__links');

        node.addEventListener('click', () => {
            expanded = !expanded;
            node.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            node.querySelector('.header__menu-text').innerHTML = expanded ? 'Закрыть меню' : 'Открыть меню';
            links.classList.toggle('header__links_opened', expanded);
            links.classList.add('header__links-toggled');
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        makeTabs(document.querySelector('.main__devices'))
        makeMenu(document.querySelector('.header__menu'))
    });
})();
