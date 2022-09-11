import select from "select-dom";
import getCommitElements from "@pages/Content/getCommitElements";
import createCommitsCollapse from "@pages/Content/createCommitsCollapse";
import removeAlreadyCreatedDetail from "@pages/Content/removeAlreadyCreatedDetail";
import { DETAIL_CLASS_NAME } from "@pages/Content/constansts";

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
  const commitUpdateArea = getCommitUpdateArea();
  commitUpdateArea.forEach((element) => {
    observeElement(element, callback);
  });
}

function init(): void {
  updateAllToolbar();
  whenCommitUpdated(updateAllToolbar);
}

init();
