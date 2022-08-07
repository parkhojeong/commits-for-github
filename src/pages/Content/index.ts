import select from "select-dom";
import getCommitElements from "@pages/Content/getCommitElements";
import createCommitsCollapse from "@pages/Content/createCommitsCollapse";
import { DETAIL_CLASS_NAME } from "@pages/Content/constansts";

const detect = (targetElement: HTMLElement) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
      console.log(mutation);

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

function addToolbarButton(appendElement: HTMLElement) {
  for (const toolbar of select.all("markdown-toolbar")) {
    toolbar.append(appendElement);
  }
}

addToolbarButton(createCommitsCollapse(getCommitElements()));
