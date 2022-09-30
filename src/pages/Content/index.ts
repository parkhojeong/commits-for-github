import select from "select-dom";
import getCommitElements from "@pages/Content/getCommitElements";
import createCommitsCollapse from "@pages/Content/createCommitsCollapse";
import removeAlreadyCreatedDetail from "@pages/Content/removeAlreadyCreatedDetail";

const DETAIL_CLASS_NAME = "commits-for-github-detail";
const DISCUSSION_AREA_SELECTOR = "div.js-discussion";
const COMMENT_TOOLBAR_SELECTOR = "markdown-toolbar";

const findAllToolbar = (): HTMLElement[] => {
  return select.all(COMMENT_TOOLBAR_SELECTOR).filter(Boolean);
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
  return select.all(DISCUSSION_AREA_SELECTOR).filter(Boolean);
};

function updateAllToolbar(): void {
  findAllToolbar().forEach(updateCommits);
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
