function openSettingBox() {
    chuanhuPopup.classList.add('showBox');
    popupWrapper.classList.add('showBox');
    settingBox.classList.remove('hideBox');
    trainingBox.classList.add('hideBox');
    showMask();

}

function openTrainingBox() {
    chuanhuPopup.classList.add('showBox');
    popupWrapper.classList.add('showBox');
    trainingBox.classList.remove('hideBox');
    settingBox.classList.add('hideBox');
    showMask();
}

function showMask() {
    const mask = document.createElement('div');
    mask.classList.add('chuanhu-mask');
    popupWrapper.appendChild(mask);
    document.body.classList.add('popup-open');
    mask.addEventListener('click', () => {
        closeBox();
    });
}


function showSideMask() {
    const oldSideMask = gradioApp().querySelector('.chuanhu-side-mask');
    if (oldSideMask) {
        showOrHideSideMask(oldSideMask);
        return;
    }
    
    function showOrHideSideMask(sideMask) {
        const windowWidth = window.innerWidth;
        if (document.querySelector('.showSide')) {

            if (windowWidth < 1024) {
                if (gradioApp().querySelector('#menu-area').classList.contains('showSide') && gradioApp().querySelector('#toolbox-area').classList.contains('showSide')) {
                    gradioApp().querySelector('#toolbox-area').classList.remove('showSide');
                    // if both menu and toolbox are open, close toolbox...
                }
            }
            // console.log("test in showSide")
            if (windowWidth <= 768) {
                document.body.classList.add('popup-open');
                // sideMask.style.opacity = '0';
                if (document.querySelector('.chuanhu-side-mask')) {
                    sideMask.style.display = 'block';
                    setTimeout(() => {sideMask.style.opacity = '0.5'; }, 200);
                } else {
                    sideMask.style.opacity = '0.5';
                }
                // sideMask.style.display = 'block';
                // // sideMask.style.opacity = '0.5';
                // setTimeout(() => {sideMask.style.opacity = '0.5'; }, 100);

                // sideMask.style.display = 'block';
            } else {
                // sideMask.style.display = 'none';
                document.body.classList.remove('popup-open');
                sideMask.style.opacity = '0';
                // sideMask.style.display = 'none';
                // note: 动画卡，气死我了
                setTimeout(() => {sideMask.style.display = 'none'; }, 100);
            }
        }
    }

    const sideMask = document.createElement('div');
    sideMask.classList.add('chuanhu-side-mask');
    window.addEventListener('resize', () => {
        showOrHideSideMask(sideMask);
    });

    gradioApp().appendChild(sideMask);
    showOrHideSideMask(sideMask);
    

    sideMask.addEventListener('click', () => {
        closeSide();
    });
}

function closeBox() {
    chuanhuPopup.classList.remove('showBox');
    popupWrapper.classList.remove('showBox');
    trainingBox.classList.add('hideBox');
    settingBox.classList.add('hideBox');
    document.querySelector('.chuanhu-mask')?.remove();
    document.body.classList.remove('popup-open');
}

function closeSide() {
    
    document.querySelector('.chuanhu-side-mask').style.opacity = '0';
    setTimeout(() => {document.querySelector('.chuanhu-side-mask').remove();}, 300);
    document.body.classList.remove('popup-open');

    gradioApp().querySelector('#menu-area').classList.remove('showSide');
    gradioApp().querySelector('#toolbox-area').classList.remove('showSide');

}

function menuClick() {
    var menu = gradioApp().querySelector('#menu-area');
    // var menuBtn = gradioApp().querySelector('.menu-btn');
    if (menu.classList.contains('showSide')) {
        menu.classList.remove('showSide');
        closeSide();
    } else {
        menu.classList.add('showSide');
        showSideMask();
    }
}

function toolboxClick() {
    var toolbox = gradioApp().querySelector('#toolbox-area');
    if (toolbox.classList.contains('showSide')) {
        toolbox.classList.remove('showSide');
        closeSide();
    } else {
        toolbox.classList.add('showSide');
        showSideMask();
    }
}

function setHistroyPanel() {
    const historySelectorInput = gradioApp().querySelector('#history-select-dropdown input');
    const historyPanel = document.createElement('div');
    historyPanel.classList.add('chuanhu-history-panel');
    historySelector.parentNode.insertBefore(historyPanel, historySelector);
    var historyList=null;

    historySelectorInput.addEventListener('click', (e) => {
        e.stopPropagation();
        historyList = gradioApp().querySelector('#history-select-dropdown ul.options');

        if (historyList) {
            // gradioApp().querySelector('.chuanhu-history-panel')?.remove();
            historyPanel.innerHTML = '';
            let historyListClone = historyList.cloneNode(true);
            historyListClone.removeAttribute('style');
            // historyList.classList.add('hidden');
            historyList.classList.add('hideK');
            historyPanel.appendChild(historyListClone);
            addHistoryPanelListener(historyPanel);
            // historySelector.parentNode.insertBefore(historyPanel, historySelector);
        }
    });
}

// function addHistoryPanelListener(historyPanel){
//     historyPanel.querySelectorAll('ul.options > li').forEach((historyItem) => {
//         historyItem.addEventListener('click', (e) => {
//             const historySelectorInput = gradioApp().querySelector('#history-select-dropdown input');
//             const historySelectBtn = gradioApp().querySelector('#history-select-btn');
//             historySelectorInput.value = historyItem.innerText;
//             historySelectBtn.click();
//         });
//     });
// }

// function bgSelectHistory(a,b,c){
//     const historySelectorInput = gradioApp().querySelector('#history-select-dropdown input');
//     let file = historySelectorInput.value;
//     return [a,file,c]
// }