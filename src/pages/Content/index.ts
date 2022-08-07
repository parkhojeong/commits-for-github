import select from "select-dom";
import getCommitElements from "@pages/Content/getCommitElements";
import createCommitsCollapse from "@pages/Content/createCommitsCollapse";
import removeAlreadyCreatedDetail from "@pages/Content/removeAlreadyCreatedDetail";

const updateCommits = (target: HTMLElement) => {
  const toolbar = select("markdown-toolbar", target);
  removeAlreadyCreatedDetail(toolbar);
  toolbar?.appendChild(createCommitsCollapse(getCommitElements()));
};

const detect = (targetElement: HTMLElement) => {
  if (!targetElement) {
    return;
  }
  updateCommits(targetElement);

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(() => updateCommits(targetElement));
  });

  observer.observe(targetElement, {
    childList: true,
  });
};

function init() {
  const detectTargets = select.all("div.js-discussion");
  detectTargets.map((target) => {
    detect(target);
  });
}

init();
