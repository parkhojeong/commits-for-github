import select from "select-dom";
import getCommitElements from "@pages/Content/getCommitElements";
import createCommitsCollapse from "@pages/Content/createCommitsCollapse";

const detect = (targetElement: HTMLElement) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(() => {
      const finded = select("markdown-toolbar", targetElement);

      const CLASS = "appended-commits";

      if (!targetElement?.classList.contains(CLASS)) {
        targetElement?.classList.add(CLASS);
        finded?.appendChild(createCommitsCollapse(getCommitElements()));
      }
    });
  });

  if (!targetElement) {
    return;
  }

  observer.observe(targetElement, {
    attributes: true,
    subtree: true,
    attributeFilter: ["hidden"],
  });
};

const detectTargets = select.all("details.review-thread-component");
detectTargets.map((target) => {
  detect(target);
});
