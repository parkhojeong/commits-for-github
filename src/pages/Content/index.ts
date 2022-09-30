import select from "select-dom";
import getCommitElements from "@pages/Content/getCommitElements";
import createCommitsCollapse from "@pages/Content/createCommitsCollapse";
import removeAlreadyCreatedDetail from "@pages/Content/removeAlreadyCreatedDetail";

const DETAIL_CLASS_NAME = "commits-for-github-detail";

const findAllToolbar = (): HTMLElement[] => {
  const toolbars = select.all("markdown-toolbar");
  return toolbars.filter(Boolean);
};

const updateCommits = (htmlElement: HTMLElement): void => {
  removeAlreadyCreatedDetail(htmlElement, DETAIL_CLASS_NAME);
  htmlElement.appendChild(
    createCommitsCollapse(getCommitElements(), DETAIL_CLASS_NAME)
  );
};

const observeElement = (element: HTMLElement, callback: () => void) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(callback);
  });

  observer.observe(element, {
    childList: true,
  });
};

const getCommitUpdateArea = (): HTMLElement[] => {
  const discussions = select.all("div.js-discussion");
  return discussions.filter(Boolean);
};

function updateAllToolbar(): void {
  const allToolbar = findAllToolbar();
  allToolbar.forEach(updateCommits);
}

function whenCommitUpdated(callback: () => void): void {
  getCommitUpdateArea().forEach((element) => {
    observeElement(element, callback);
  });
}

function init(): void {
  updateAllToolbar();
  whenCommitUpdated(updateAllToolbar);
}

init();
